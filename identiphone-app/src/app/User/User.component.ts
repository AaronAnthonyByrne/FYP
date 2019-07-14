/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PhoneService } from '../Services/Phone.service';
import 'rxjs/add/operator/toPromise';
import { MemberService } from '../Services/Member.service';
import { Participant } from 'app/org.hyperledger.composer.system';
import { AppComponent } from 'app/app.component';
import { ChangeOwnerService } from 'app/Services/ChangeOwner.service';
//const uuidv1 = require('uuid/v1');
import {v1 as uuid } from 'uuid';
import { Immediate } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-user',
  templateUrl: './User.component.html',
  styleUrls: ['../app.component.css'],
  providers: [PhoneService, MemberService, ChangeOwnerService]
})
export class UserComponent implements OnInit {

  phoneForm: FormGroup;
  memberForm: FormGroup;
  coForm: FormGroup;
  searchForm:FormGroup;

  public allAssets;
  private participant;
  public allParticipants;
  private asset;
  private Transaction;
  public allTransactions;
  private currentId;
  public errorMessage;
  public user;
  public userType;
  public assetIMEI;
  public counter = Math.floor((Math.random() * 100) + 1);
  public timestamp = new Date();
  public phone_status;
  public phone_IMEI;
  public member_firstN;
  public member_lastN;
  public member_email;
  public member_no;

  

  IMEI = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  newOwner = new FormControl('', Validators.required);
  search =  new FormControl('',Validators.required);

  // // to determine who has signed in
  admin: boolean = false;
  member: boolean = false;
  recycler: boolean = true;
  retailer: boolean = false;
  law: boolean = false;
  network: boolean = false;
  userKnown: boolean = false; 
  loggedIn: boolean = true;

  constructor(public serviceMember: MemberService, public servicePhone: PhoneService, public serviceChangeOwner: ChangeOwnerService, fb: FormBuilder) {
    this.phoneForm=fb.group({
      IMEI: this.IMEI,
    });
    this.memberForm = fb.group({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    });
    this.coForm=fb.group({
      phone: this.phone,
      newOwner: this.newOwner
    })
    this.searchForm=fb.group({
      search:this.search
    })
  };

  ngOnInit(): void {
    console.log("TIMESTAMP:"+this.timestamp.toISOString());
    this.checkUser()
    .then(() =>{
     // console.log(this.member);
      if (this.member || this.recycler || this.retailer) {
        //console.log("IM HERE");
        this.loadAllPhones();
      }
      if(this.admin){
      this.loadAllMembers()
      }
    });
  }

  checkUser(): Promise<any> {
    return this.servicePhone.getCurrentUser()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        this.user = result;
        this.userKnown = true;
        let temp = this.user.participant.split('.')[3];
        this.userType = temp.split('#')[0];
        //console.log("USER TYPE: "+this.userType)
        if (this.userType == 'Retailer') {
          this.retailer = true;
          //console.log("RE")
        }
        if (this.userType == 'admin') {
          this.admin = true;
          //console.log("A") 
        }
        if (this.userType == 'LawEnforcement') {
          this.law = true;
          //console.log("L")
        }
        if (this.userType == 'Recycler') {
          this.recycler = true;
          //console.log("REC")
        }
        if (this.userType == 'Member') {
          this.member = true;
         // console.log("ME")
        }
        if (this.userType == 'system') {
          this.admin = true;
         // console.log("N")
        }
        this.loggedIn=true;
      });
  }

  loadAllPhones(): Promise<any> {
    let phoneList = [];
    let j =0;
    let tempList=[];
    return this.servicePhone.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          phoneList.push(asset);
        });
        for(let i = 0; i < phoneList.length; i++){
          //console.log("IS this"+phoneList[i].owner.split('#')[1]+" = "+this.user.participant.split('#')[1]);
          if(phoneList[i].owner.split('#')[1] == (this.user.participant.split('#')[1])){
            //console.log("PO"+phoneList[i]);
            
            tempList[j] = phoneList[i];
            //console.log(tempList.length);
            j++;
          }
        }
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  loadAllMembers(): Promise<any> {
    const tempList = [];
    return this.serviceMember.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(participant => {
          tempList.push(participant);
        });
        this.allParticipants = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          this.errorMessage = error;
        }
      });
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Phone',
      'IMEI': this.IMEI.value,
      'phoneStatus': 'InShop',
      'owner': 'org.example.mynetwork.Owner#'+this.user.participant.split('#')[1]
    };
    return this.servicePhone.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.phoneForm.setValue({
        'IMEI': null
      });
      this.loadAllPhones();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }

  getAsset(form: any): Promise<any>{
    
    console.log("INSIDE the getASSET:"+form.get('search').value);
    return this.servicePhone.getAsset(form.get('search').value)
    .toPromise()
    .then((res)=>{
      this.phone_IMEI = res.IMEI;
      this.phone_status = res.phoneStatus;
      this.member_no= res.owner;
      console.log(this.phone_IMEI);
      this.member_no = this.member_no.split('#')[1];
      console.log(this.member_no);
      return this.serviceMember.getparticipant(this.member_no)
      .toPromise()
      .then((values)=>{
        this.member_email = values.email;
        this.member_firstN = values.firstName;
        this.member_lastN = values.lastName
        this.searchForm.setValue({
          'search': null
        });
        console.log(this.member_email+" "+this.member_firstN+" "+this.member_lastN);
      })
      .catch((error) => {
        if (error === 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
            this.errorMessage = error;
        }
      });

    })
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.mynetwork.Member',
      'email': this.email.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'ownerId': this.counter
    };

    alert(this.participant.firstName+" "+this.participant.lastName+" has been added to the blockchain");
    return this.serviceMember.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null; 
     
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  addTransaction(form: any): Promise<any> {
    console.log("PHONE VALUE"+this.phone.value);
    this.Transaction = {
      $class: 'org.example.mynetwork.ChangeOwner',
      'phone': 'org.example.mynetwork.Phone#' + this.phone.value,
      'newOwner': 'org.example.mynetwork.Member#' + this.newOwner.value,
      'timestamp': this.timestamp.toISOString()
    };

    return this.serviceChangeOwner.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.asset = {
          $class: 'org.example.mynetwork.Phone',
          'phoneStatus': 'Bought',
          'owner': 'org.example.mynetwork.Member#' + this.newOwner.value
        };
        return this.servicePhone.updateAsset(this.phone.value, this.asset)
          .toPromise()
          .then(() => {
            this.errorMessage = null;
            this.loadAllPhones();
          })
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }


 	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the assjet field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used public allAssets; for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  getData(val) {
    this.assetIMEI = val;
  }
  //resting all forms
  resetPhoneForm(): void {
    this.phoneForm.setValue({
      'IMEI': null
      });
  }
  resetMemberForm(): void {
    this.memberForm.setValue({
      'email': null,
      'firstName': null,
      'lastName': null,
    });
  }
  resetForm(): void {
    this.coForm.setValue({
      //'phone': null,
      'newOwner': null
    });
  }
  restDetails():void{
    this.phone_status =null;
    this.phone_IMEI=null;
    this.member_firstN=null;
    this.member_lastN=null;
    this.member_email=null;
    this.member_no=null;
  }
}
