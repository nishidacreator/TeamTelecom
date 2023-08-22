import { Project } from "../../admin/models/project"
import { User } from "../../auth/models/user"
import { Asianet } from "./asianet_base"
import { Bajaj } from "./bajaj_base"
import { Bsnl } from "./bsnl_base"
import { Vi } from "./vi_base"

export interface FolloeUp{
  id: number;
  firstName : string,
  lastName : string,
  gender : string,
  country : number,
  mobile : string,
  age : number,
  employeeNo : string,

  status : string,
  remarks : string,
  freeText : string,
  action : string,
  teleCallerId : number
  caller: User
  projectId: number
  project: Project
  date: Date
  time: Date
}
