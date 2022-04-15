module.exports = {
  validateIPAddress: ip => {
    const numberRegex = /^\d+$/
    const a = ip.split('.')
    if (a.length !== 4) return false

    for (let i = 0; i < a.length; i++) {
      if (a[i].startsWith('0') && a[i].length > 1) {
        return false
      }
      if (numberRegex.test(a[i]) === false) {
        return false
      }
      const v = parseInt(a[i])
      if (Number.isNaN(v)) {
        return false
      }
      if (v < 0 || v > 0xff) {
        return false
      }
    }
    return true
  }
}
