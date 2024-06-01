import { Group } from "./group";

export interface Festival {
    name: string;
    startDate: Date;
    endDate: Date;
    location: string;
    map: string | undefined;
}