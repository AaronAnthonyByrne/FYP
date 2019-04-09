import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export abstract class Owner extends Participant {
      ownerId: string;
      email: string;
   }
   export enum PhoneStatus {
      InShop,
      Bought,
      Stolen,
   }
   export class Member extends Owner {
      firstName: string;
      lastName: string;
   }
   export class Retailer extends Owner {
      retailerName: string;
   }
   export class Recycler extends Owner {
      recyclerName: string;
   }
   export class NetworkProvider extends Participant {
      networkId: string;
      companyName: string;
   }
   export class LawEnfrocment extends Participant {
      branchId: string;
      branchName: string;
      branchAddress: string;
   }
   export class Phone extends Asset {
      IMEI: string;
      phoneStatus: PhoneStatus;
      owner: Owner;
   }
   export class ChangeOwner extends Transaction {
      phone: Phone;
      newOwner: Owner;
   }
   export class markAsStolen extends Transaction {
      phone: Phone;
   }
   export class PhoneExhange extends Event {
      phone: Phone;
      oldPhoneOwner: Owner;
      newPhoneOwner: Owner;
   }
   export class stolen extends Event {
      phone: Phone;
      oldStatus: PhoneStatus;
      newStatus: PhoneStatus;
   }
// }
