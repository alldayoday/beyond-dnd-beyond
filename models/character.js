import mongoose from "mongoose"

const Schema = mongoose.Schema

const characterSchema = new Schema({
  name: {type: String, required: true, unique: true},
  armorClass: Number,
  intiativeBonus: Number,
  spells: String,
  weapons: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Character = mongoose.model("Character", characterSchema)

export {
  Character
}