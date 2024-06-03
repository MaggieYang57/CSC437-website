import express, { Request, Response } from "express";
import { Group } from "../models";
import groups from "../services/group-service";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const newGroup = req.body;
  groups
    .create(newGroup)
    .then((g: Group) => res.status(201).send(g))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
    const userId = req.query.userid || req.body.userid;
    if (!userId) {
        return res.status(400).send("User ID is required");
    }
    let userObjectId;
    try {
        userObjectId = new mongoose.Types.ObjectId(userId as string);
    } catch (error) {
        return res.status(400).send("Invalid User ID format");
    }
    groups
      .index()
      .then((list: Group[]) => list.filter(group => group.people.some(person => person.equals(userObjectId) )))
      .then(filtered => res.json(filtered))
      .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  groups
    .get(id)
    .then((profile: Group | undefined) => {
      if (!profile) throw "Not found";
      else res.json(profile);
    })
    .catch((err) => res.status(404).end());
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newGroup = req.body;

  groups
    .update(id, newGroup)
    .then((profile: Group) => res.json(profile))
    .catch((err) => res.status(404).end());
});

export default router;