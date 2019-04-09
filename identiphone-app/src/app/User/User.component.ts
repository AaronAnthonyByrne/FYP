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
import { Member } from 'app/org.example.mynetwork';
// import * as mongoose from "mongoose";

@Component({
  selector: 'app-user',
  templateUrl: './User.component.html',
  styleUrls: ['../app.component.css'],
  providers: [PhoneService, MemberService]
})
export class UserComponent implements OnInit {

  myForm: FormGroup;

  public allAssets;
  public allParticipants;
  private asset;
  private currentId;
  public errorMessage;
  public user;

  // to determine who has signed in
  admin: boolean = false;
  member: boolean = true;
  recycler: boolean = false;
  retailer: boolean = false;
  law: boolean = false;
  network: boolean = false;


  IMEI = new FormControl('', Validators.required);
  phoneStatus = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceMember: MemberService, public servicePhone: PhoneService, fb: FormBuilder) {

  };

  ngOnInit(): void {
    this.checkUser();
    if (this.member || this.recycler || this.retailer) {
      this.loadAllPhones();
    }
    if(this.admin){
    this.loadAllMembers();
    }
  }

  checkUser(): Promise<any> {
    return this.servicePhone.getCurrentUser()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        this.user = result;
      });
  }

  loadAllPhones(): Promise<any> {
    const phoneList = [];
    return this.servicePhone.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          phoneList.push(asset);
        });
        this.allAssets = phoneList;
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


}
