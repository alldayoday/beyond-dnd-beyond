import mongoose from "mongoose"

const Schema = mongoose.Schema

const spellSchema = new Schema({
  name: {
    type: String,
  },
  effect: {
    type: String, 
  },
})

const weaponSchema = new Schema({
  weapon: {
    type: String,
  },
  damage: {
    type: String, 
  },
})

const characterSchema = new Schema({
  name: {type: String, required: true, unique: true},
  class: {type: String},
  armorClass: {type: Number},
  str: {type: Number},
  dex: {type: Number},
  con: {type: Number},
  int: {type: Number},
  wis: {type: Number},
  cha: {type: Number},
  initiative: {type: Number},
  currentHP: {type: Number},
  hitPoints: {type: Number},
  avatar: {type: String},
  // intiativeBonus: Number,
  spells: [spellSchema],
  weapons: [weaponSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Character = mongoose.model("Character", characterSchema)

export {
  Character
}

//comment out for combat details