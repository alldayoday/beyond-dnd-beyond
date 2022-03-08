import mongoose from "mongoose"

const Schema = mongoose.Schema

const combatInstanceSchema = new Schema({
  name: {
    type: String,
  },
  initiative: {
    type: Number, 
  },
  hitPointsMax: {
    type: Number
  },
  hitPoints: {
    type: Number
  },
  armorClass: {
    type: Number
  }
})

const combatSchema = new Schema({
  name: {type: String},
  instances: [combatInstanceSchema],
  characters: [{type: Schema.Types.ObjectId, ref: "Character"}],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})


const Combat = mongoose.model("Combat", combatSchema)

export {
  Combat
}