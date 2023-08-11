import { User } from "../../auth/models/user"

export interface AsianetFollowup{
  id: number;
  region : string
  subCode : string
  name : string,
  balance : number
  mobile : number

  status : string
  remarks : string
  freeText : string
  action : string
  teleCallerId : number
  teleCaller: User
}
