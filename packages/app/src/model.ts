import { Profile, Group, Festival } from "server/models";

export interface Model {
  group?: Group;
  profile?: Profile;
  festival?: Festival
}

export const init: Model = {};