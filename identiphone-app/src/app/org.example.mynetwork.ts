import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export abstract class PhoneOwner extends Participant {
      onwnerId: string;
   }
   export class Member extends PhoneOwner {
      email: string;
      firstName: string;
      lastName: string;
   }
   export class Retailer extends PhoneOwner {
      retailerId: string;
      retailerName: string;
   }
   export class Recycler extends PhoneOwner {
      recyclerId: string;
      recyclerName: string;
   }
   export class NetworkProvider extends Participant {
      networkId: string;
      compnayName: string;
   }
   export class LawEnfrocment extends Participant {
      branchId: string;
      branchName: string;
      branchAddress: string;
   }
   export class Phone extends Asset {
      IMEI: string;
      owner: PhoneOwner;
      status: boolean;
   }
   export class ChangeOwner extends Transaction {
      phone: Phone;
      newOwner: string;
   }
   export class markAsStolen extends Transaction {
      phone: Phone;
      status: boolean;
   }
   export class PhoneExhange extends Event {
      phone: Phone;
      oldOwner: string;
      newOwner: string;
   }
   export class stolen extends Event {
      phone: Phone;
      oldStatus: boolean;
      newStatus: boolean;
   }
// }
