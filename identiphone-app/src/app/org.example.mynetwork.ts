import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export class PhoneOwner extends Participant {
      onwnerId: string;
   }
   export class Member extends Participant {
      email: string;
      firstName: string;
      lastName: string;
      phones: PhoneOwner[];
   }
   export class Retailer extends Participant {
      retailerId: string;
      retailerName: string;
      phones: PhoneOwner[];
   }
   export class Recycler extends Participant {
      recyclerId: string;
      recyclerName: string;
      phones: PhoneOwner[];
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
      status: string;
   }
   export class ChangeOwner extends Transaction {
      phone: Phone;
      newOwner: string;
   }
   export class markAsStolen extends Transaction {
      phone: Phone;
      status: string;
   }
   export class PhoneExhange extends Event {
      phone: Phone;
      oldOwner: string;
      newOwner: string;
   }
   export class stolen extends Event {
      phone: Phone;
      oldStatus: string;
      newStatus: string;
   }
// }
