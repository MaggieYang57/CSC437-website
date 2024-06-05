"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var groups_exports = {};
__export(groups_exports, {
  default: () => groups_default
});
module.exports = __toCommonJS(groups_exports);
var import_express = __toESM(require("express"));
var import_group_service = __toESM(require("../services/group-service"));
const router = import_express.default.Router();
router.post("/", (req, res) => {
  const newGroup = req.body;
  import_group_service.default.create(newGroup).then((g) => res.status(201).send(g)).catch((err) => res.status(500).send(err));
});
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  if (!userId) {
    return res.status(400).send("User ID is required");
  }
  import_group_service.default.index().then((list) => list.filter((group) => group.people.some((person) => person === userId))).then((filtered) => res.json(filtered)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_group_service.default.get(id).then((group) => {
    if (!group)
      throw "Not found";
    else
      res.json(group);
  }).catch((err) => res.status(404).end());
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newGroup = req.body;
  import_group_service.default.update(id, newGroup).then((group) => res.json(group)).catch((err) => res.status(404).end());
});
var groups_default = router;
