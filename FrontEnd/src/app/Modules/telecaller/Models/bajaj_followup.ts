import { User } from "../../auth/models/user"

export interface BajajFollowup{
  id: number;
  subCode : string
  name : string
  balance : number
  mobile : string
  emi : string
  product : string
  status : string
  remarks : string
  freeText : string
  action : string
  teleCallerId : number
  teleCaller: User
}
