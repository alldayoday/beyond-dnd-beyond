import mongoose from "mongoose"
const Schema = mongoose.Schema


const combatSchema = new Schema({
  name: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
})


const Combat = mongoose.model("Combat", combatSchema)

export {
  Combat
}