export interface Profile {
    id: string;
    name: string;
    email: string;
    address: string;
    groups: Array<String>;
    rendezvous: Array<String>;
    festivals: Array<String>;
    avatar: string | undefined;
}