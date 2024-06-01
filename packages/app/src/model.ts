import { Profile, Group } from "server/models";

export interface Model {
  group?: Group;
  profile?: Profile;
}

export const init: Model = {};