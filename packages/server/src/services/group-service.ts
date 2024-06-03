import { Schema, Model, Document, model } from "mongoose";
import { Group } from "../models/group";
import { Profile } from "../models/profile";

const GroupSchema = new Schema<Group>(
    {
      id: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
      people: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    },
    { collection: "group_collection" }
  );

const GroupModel = model<Group>("Group", GroupSchema);

function index(): Promise<Group[]> {
  return GroupModel.find();
}

function get(id: String): Promise<Group> {
    return GroupModel
    .findById(id)
    .populate("people")
    .then((doc: unknown) => doc as Group)
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(group: Group): Promise<Group> {
  const p = new GroupModel(group);
  return p.save();
}

function update(id: String, group: Group): Promise<Group> {
  return GroupModel.findOne({ 'id': id })
    .then((found) => {
      if (!found) throw `${id} Not Found`;
      else
        return GroupModel.findByIdAndUpdate(
          found._id,
          group,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${id} not updated`;
      else return updated as Group;
    });
}

export default { index, get, create, update };