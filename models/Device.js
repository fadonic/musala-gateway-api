const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema(
  {
    uid: {
      type: Number,
      required: true
    },
    vendor: {
      type: String,
      required: true
    },
    gateway: {
      type: Schema.Types.ObjectId,
      ref: 'gateway',
      required: true
    },

    status: {
      type: String,
      default: 'Offline'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Device', DeviceSchema)
