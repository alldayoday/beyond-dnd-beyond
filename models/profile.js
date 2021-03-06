import mongoose from 'mongoose'
const Schema = mongoose.Schema

const notesSchema = new Schema({
  session: { type: Number },
  date: { type: String },
  notes: { type: String },
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  sessionNotes: [notesSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
