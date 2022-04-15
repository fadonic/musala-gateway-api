const { expectCt } = require('helmet')
const { validateIPAddress } = require('../util')

test('should be false for empty ip', () => {
  expect(validateIPAddress('')).toBe(false)
})

test('should be false if ip block number is greater than 255', () => {
  expect(validateIPAddress('277.88.10.1')).toBe(false)
})

test('should be false if ip block number start with 0', () => {
  expect(validateIPAddress('256.88.10.1')).toBe(false)
})

test('should be true if ip pass all validations', () => {
  expect(validateIPAddress('172.16.254.1')).toBe(true)
})
