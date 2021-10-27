import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    completed: { type: Boolean, default: false },
    description: { type: String, required: true }
    // creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// TaskSchema.virtual('creator', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Profile'
// })
