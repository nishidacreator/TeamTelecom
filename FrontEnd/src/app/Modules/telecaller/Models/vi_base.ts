import { User } from "../../auth/models/user"

export interface Vi{
  id: number;
  mobileNumber : string
  custName : string
  campionName : string
  currentPlan : string
  noOfConnections : number
  pinCode : string
  suggestedPlan : string
  status : string
  remarks : string
  freeText : string
  action : string
  teleCallerId : number
  teleCaller: User
  date: Date
  time: Date
}
