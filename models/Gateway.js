const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GatewaySchema = new Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    ipv4: {
      type: String,
      required: true
    },

    gatewayDevices: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Device'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('gateway', GatewaySchema)
