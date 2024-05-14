import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
    {
      id: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
      email: { type: String, trim: true },
      address: { type: String, trim: true },
      groups: [String],
      rendezvous: [String],
      festivals: [String],
      avatar: { type: String, required: true, trim: true}
    },
    { collection: "user_profiles" }
  );

const ProfileModel = model<Profile>("Profile", ProfileSchema);

// let profiles: Array<Profile> = [
//   {
//     id: "bonnie",
//     name: "Bonnie Brown",
//     email: "bonnie@calpoly.edu",
//     address: "Oakland, CA",
//     groups: ['Best Group Ever', 'MS Squad'],
//     rendezvous: ['Coachella temp'],
//     festivals: ['Coachella_2024, EDCLV_2024'],
//     avatar: "/data/avatars/Blaze Pasquale.png"
//   }
// ];

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
  return ProfileModel.find({ 'id': userid })
    .then((list) => {
      if (list.length === 0) {
        throw new Error(`${userid} Not Found`);
      }
      return list[0];
    })
    .catch((err) => {
      throw new Error(`Error fetching profile for ${userid}: ${err.message}`);
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function update(userid: String, profile: Profile): Promise<Profile> {
  return ProfileModel.findOne({ 'id': userid })
    .then((found) => {
      if (!found) throw `${userid} Not Found`;
      else
        return ProfileModel.findByIdAndUpdate(
          found._id,
          profile,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${userid} not updated`;
      else return updated as Profile;
    });
}

export default { index, get, create, update };