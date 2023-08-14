import { User } from "../../auth/models/user"

export interface Bsnl{
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
    teleCaller: User
    date: Date
    time: Date
}
