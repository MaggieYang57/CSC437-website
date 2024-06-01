import { Profile } from "./profile";

export interface Group {
    id: string,
    name: string;
    people: Profile[];
}