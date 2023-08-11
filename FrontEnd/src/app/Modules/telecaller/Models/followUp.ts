import { Project } from "../../admin/models/project"
import { Asianet } from "./asianet_base"
import { Bajaj } from "./bajaj_base"
import { Bsnl } from "./bsnl_base"
import { Vi } from "./vi_base"

export interface FolloeUp{
    id: number
    projectId : number
    date: Date
    time: Date
    baseId: number
    project: Project
    bsnl_base: Bsnl
    asianet_base: Asianet
    bajaj_base: Bajaj
    vi_base: Vi
}
