import { User } from "../../auth/models/user"

export interface AsianetSalesBase{
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

  status : string
  remarks : string
  freeText : string
  action : string
  teleCallerId : number
  teleCaller: User
  date: Date
  time: Date
}
