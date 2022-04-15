const router = require('express').Router()
const Device = require('./../models/device')
const Gateway = require('./../models/Gateway')

// @Route api/devices/register
// @Access public
// @Method POST
router.post('/register', async (req, res) => {
  const newDevice = new Device({
    uid: req.body.uid,
    vendor: req.body.vendor,
    gateway: req.body.gatewayId,
    status: req.body.status
  })

  try {
    // check for gataway first
    const device = await newDevice.save()
    if (device) {
      const gateway = await Gateway.findById(req.body.gatewayId)
      if (gateway) {
        gateway.gatewayDevices.push(newDevice)
        const response = await gateway.save()
        if (response) {
          return res.status(201).json(device)
        }
      } else {
        res.status(404).json('Gateway not found')
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// @Route api/devices/
// @Access public
// @Method GET
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find().populate('gateway')
    return res.status(200).json(devices)
  } catch (err) {
    res.status(500).json(err)
  }
})

// @Route api/devices/find/:id
// @Access public
// @Method GET
router.get('/find/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id).populate('gateway')
    const result = device || 'No record found'
    return res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

// @Route api/devices/:id
// @Access public
// @Method DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deviceId = req.params.id
    const device = await Device.findById(deviceId)
    if (device) {
      const gatewayId = device.gateway
      const gateway = await Gateway.findById(gatewayId)
      const filteredgatewayDevices = gateway.gatewayDevices.filter(item => {
        return deviceId !== item.toString()
      })
      gateway.gatewayDevices = filteredgatewayDevices
      const updatedGateway = await gateway.save()
      return res.status(200).json(updatedGateway)
    } else {
      return res.status(404).json('Device not found')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
