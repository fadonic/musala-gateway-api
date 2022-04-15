const router = require('express').Router()
const { validateIPAddress } = require('../util')
const Gateway = require('./../models/Gateway')

// @Route api/gateways/register
// @Access public
// @Method POST
router.post('/register', async (req, res) => {
  let ipv4 = req.body.ipv4
  if (!validateIPAddress(ipv4)) {
    return res.status(244).json('Invalid IPV4 Address')
  }

  const newGateway = new Gateway({
    name: req.body.name,
    ipv4: ipv4,
    serialNumber: req.body.serialNumber
  })

  try {
    const checkGatewayExist = await Gateway.findOne({
      serialNumber: req.body.serialNumber
    })
    if (!checkGatewayExist) {
      const gateway = await newGateway.save()
      return res.status(201).json(gateway)
    } else {
      return res.status(500).json('Serial number already exist')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// @Route api/gateways/
// @Access public
// @Method GET
router.get('/', async (req, res) => {
  try {
    const gateways = await Gateway.find().populate('gatewayDevices')
    return res.status(200).json(gateways)
  } catch (err) {
    res.status(500).json(err)
  }
})

// @Route api/gateways/find/:id
// @Access public
// @Method GET
router.get('/find/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.id)
    const result = gateway || 'No record found'
    return res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
