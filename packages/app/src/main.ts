import {
  Auth,
  History,
  Store,
  Switch,
  define,
} from "@calpoly/mustang";import { Msg } from "./messages";
import { html } from "lit";
import { Model, init } from "./model";
import update from "./update";
import { NavHeaderElement } from "./components/nav-header";
import { ProfileViewElement } from "./views/profile-view";
import { GroupViewerElement } from "./views/group-view";

const routes = [
  // {
  //   path: "/app/group/:id",
  //   view: (params: Switch.Params) => html`
  //     <tour-view tour-id=${params.id}></tour-view>
  //   `
  // },
  {
    path: "/app/profile/:id/edit",
    view: (params: Switch.Params) => html`
      <profile-view edit user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/profile/anonymous",
    redirect: "/login.html"
  },
  {
    path: "/app/profile/login.html",
    redirect: "/login.html"
  },
  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  },
];

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
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "festivous:history", "festivous:auth");
    }
  },
  "nav-header": NavHeaderElement,
  "profile-view": ProfileViewElement,
  "group-view": GroupViewerElement
});