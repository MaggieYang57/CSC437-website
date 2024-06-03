import { Profile } from "server/models";

export type Msg =
  | ["profile/save", {
      id: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }]
  | ["profile/select", { id: string }]
  | ["group/select", {id: string}];