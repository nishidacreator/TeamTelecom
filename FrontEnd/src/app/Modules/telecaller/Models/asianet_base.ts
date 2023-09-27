import { Status } from "../../admin/models/status";
import { User } from "../../auth/models/user"

export interface Asianet{
  id: number;
  Region : string
  Subcode : string
  Name : string
  Address : string
  Address1 : string
  Address2 : string
  Package : string
  Scheme : string
  Phone : string
  Balance : number
  Mobile : string

  status : number
  callStatus : Status
  remarks : string
  freeText : string
  action : string
  teleCallerId : number
  teleCaller: User
  date: Date
  time: Date
  callTime: Date
}
