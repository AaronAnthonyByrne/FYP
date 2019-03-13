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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { PhoneComponent } from './Phone/Phone.component';

import { MemberComponent } from './Member/Member.component';
import { RetailerComponent } from './Retailer/Retailer.component';
import { RecyclerComponent } from './Recycler/Recycler.component';
import { NetworkProviderComponent } from './NetworkProvider/NetworkProvider.component';
import { LawEnfrocmentComponent } from './LawEnfrocment/LawEnfrocment.component';
import { ChangeOwnerComponent } from './ChangeOwner/ChangeOwner.component';
import { markAsStolenComponent } from './markAsStolen/markAsStolen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Phone', component: PhoneComponent },
  { path: 'Member', component: MemberComponent },
  { path: 'Retailer', component: RetailerComponent },
  { path: 'Recycler', component: RecyclerComponent },
  { path: 'NetworkProvider', component: NetworkProviderComponent },
  { path: 'LawEnfrocment', component: LawEnfrocmentComponent },
  { path: 'ChangeOwner', component: ChangeOwnerComponent },
  { path: 'markAsStolen', component: markAsStolenComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
