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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './Services/data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PhoneComponent } from './Phone/Phone.component';
import { MemberComponent } from './Member/Member.component';
import { RetailerComponent } from './Retailer/Retailer.component';
import { RecyclerComponent } from './Recycler/Recycler.component';
import { NetworkProviderComponent } from './NetworkProvider/NetworkProvider.component';
import { LawEnfrocmentComponent } from './LawEnfrocment/LawEnfrocment.component';
import { ChangeOwnerComponent } from './ChangeOwner/ChangeOwner.component';
import { markAsStolenComponent } from './markAsStolen/markAsStolen.component';
import { UserComponent } from './User/User.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhoneComponent,
    MemberComponent,
    RetailerComponent,
    RecyclerComponent,
    NetworkProviderComponent,
    LawEnfrocmentComponent,
    ChangeOwnerComponent,
    markAsStolenComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
