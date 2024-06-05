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
var group_service_exports = {};
__export(group_service_exports, {
  default: () => group_service_default
});
module.exports = __toCommonJS(group_service_exports);
var import_mongoose = require("mongoose");
const GroupSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    people: [String]
  },
  { collection: "group_collection" }
);
const GroupModel = (0, import_mongoose.model)("Group", GroupSchema);
function index() {
  return GroupModel.find();
}
function get(id) {
  return GroupModel.findById(id).populate("people").then((doc) => doc).catch((err) => {
    throw `${id} Not Found`;
  });
}
function create(group) {
  const p = new GroupModel(group);
  return p.save();
}
function update(id, group) {
  return GroupModel.findOne({ "id": id }).then((found) => {
    if (!found)
      throw `${id} Not Found`;
    else
      return GroupModel.findByIdAndUpdate(
        found._id,
        group,
        {
          new: true
        }
      );
  }).then((updated) => {
    if (!updated)
      throw `${id} not updated`;
    else
      return updated;
  });
}
var group_service_default = { index, get, create, update };
