import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  players: [{type: Schema.Types.ObjectId, ref: 'Characters'}],
  combats: [{type: Schema.Types.ObjectId, ref: 'Combats'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
