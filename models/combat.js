import mongoose from "mongoose"

const Schema = mongoose.Schema

const combatSchema = new Schema({
  name: {type: String},
  characters: [{type: Schema.Types.ObjectId, ref: "Character"}],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})


const Combat = mongoose.model("Combat", combatSchema)

export {
  Combat
}