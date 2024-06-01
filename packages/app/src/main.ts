import { Auth, Store, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { NavHeaderElement } from "./components/nav-header";
import { ProfileViewElement } from "./views/profile-view";

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "festivous:auth");
    }
  },
  "nav-header": NavHeaderElement,
  "profile-view": ProfileViewElement
});