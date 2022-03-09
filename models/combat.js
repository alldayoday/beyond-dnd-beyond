import mongoose from "mongoose"

const Schema = mongoose.Schema

const combatInstanceSchema = new Schema({
  character: {type: Schema.Types.ObjectId, ref: "Character"},
  initiative: {
    type: Number, 
  },
  hitPoints: {
    type: Number
  },
  name: {type: String},
})

const combatSchema = new Schema({
  name: {type: String},
  instances: [combatInstanceSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  characters: [{type: Schema.Types.ObjectId, ref: "Character"}],
})


const Combat = mongoose.model("Combat", combatSchema)

export {
  Combat
}