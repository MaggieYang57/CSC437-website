"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profile_service_exports = {};
__export(profile_service_exports, {
  default: () => profile_service_default
});
module.exports = __toCommonJS(profile_service_exports);
var import_mongoose = require("mongoose");
const ProfileSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    groups: [String],
    rendezvous: [String],
    festivals: [String],
    avatar: { type: String, required: true, trim: true }
  },
  { collection: "user_profiles" }
);
const ProfileModel = (0, import_mongoose.model)("Profile", ProfileSchema);
function index() {
  return ProfileModel.find();
}
function get(userid) {
  return ProfileModel.find({ "id": userid }).then((list) => {
    if (list.length === 0) {
      throw new Error(`${userid} Not Found`);
    }
    return list[0];
  }).catch((err) => {
    throw new Error(`Error fetching profile for ${userid}: ${err.message}`);
  });
}
function create(profile) {
  const p = new ProfileModel(profile);
  return p.save();
}
function update(userid, profile) {
  return ProfileModel.findOne({ "id": userid }).then((found) => {
    if (!found)
      throw `${userid} Not Found`;
    else
      return ProfileModel.findByIdAndUpdate(
        found._id,
        profile,
        {
          new: true
        }
      );
  }).then((updated) => {
    if (!updated)
      throw `${userid} not updated`;
    else
      return updated;
  });
}
var profile_service_default = { index, get, create, update };
