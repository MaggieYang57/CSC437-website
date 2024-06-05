import express, { Request, Response } from "express";
import { Group } from "../models";
import groups from "../services/group-service";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const newGroup = req.body;
  groups
    .create(newGroup)
    .then((g: Group) => res.status(201).send(g))
    .catch((err) => res.status(500).send(err));
});

router.get("/user/:userId", (req: Request, res: Response) => {
    const {userId} = req.params;
    console.log(userId)
    if (!userId) {
        return res.status(400).send("User ID is required");
    }
    groups
      .index()
      .then((list: Group[]) => list.filter(group => group.people.some(person => person === userId )))
      .then(filtered => res.json(filtered))
      .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  groups
    .get(id)
    .then((group: Group | undefined) => {
      if (!group) throw "Not found";
      else res.json(group);
    })
    .catch((err) => res.status(404).end());
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newGroup = req.body;

  groups
    .update(id, newGroup)
    .then((group: Group) => res.json(group))
    .catch((err) => res.status(404).end());
});

export default router;