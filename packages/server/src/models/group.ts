import mongoose from "mongoose";

export interface Group {
    id: string,
    name: string;
    people: mongoose.Types.ObjectId[];
}