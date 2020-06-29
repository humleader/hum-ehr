const JSZip = require('jszip')
const Docxtemplater = require('docxtemplater')

const fs = require('fs')
const path = require('path')
const toPdf = require('office-to-pdf')
const root = path.join(__dirname, '../../')

const renderWord = async item => {
  // Load the docx file as a binary
  let content = null
  if (!item.isLogo) {
    content = fs.readFileSync(path.join(root, 'template/template.docx'), 'binary')
  } else {
    content = fs.readFileSync(path.join(root, 'template/template_logo.docx'), 'binary')
  }

  const zip = new JSZip(content)

  const doc = new Docxtemplater()
  doc.loadZip(zip)

  const data = JSON.parse(item.profile)

  // set the templateVariables
  doc.setData(data)

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
  } catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    }
    console.log(JSON.stringify({ error: e }))
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error
  }

  var buf = doc.getZip().generate({ type: 'nodebuffer' })

  return toPdf(buf)
}

module.exports = renderWord
