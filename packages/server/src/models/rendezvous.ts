import { Festival } from "./festival";
import { Group } from "./group";

export interface Rendezvous {
    festival: Festival;
    group: Group | undefined;
    timetable: Array<Schedule>;
}

export interface Schedule {
    time: string;
    location: string;
}