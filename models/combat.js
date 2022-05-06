import mongoose from "mongoose"
const Schema = mongoose.Schema

// const turnSchema = new Schema({
//   initiative: { type: Number },
//   character: { type: Schema.Types.ObjectId, ref: "Character" },
// })

const combatSchema = new Schema({
  name: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
})


const Combat = mongoose.model("Combat", combatSchema)

export {
  Combat
}