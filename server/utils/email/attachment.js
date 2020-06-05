const word = require('./word')
const emailContext = require('./email')
const emailContextCn = require('./email-cn')

const generate = async item => {
  const profile = JSON.parse(item.profile)

  let html = emailContext(profile)
  if (item.isEn) {
    html = emailContextCn(profile)
  }

  const pdfBuffer = await word(item)

  return { profile, html, pdfBuffer }
}

module.exports = generate
