import type jsPDF from 'jspdf'
import golosTextBold from './Golos Text-bold'
import golosTextRegular from './Golos Text-normal'
import sourceCodeProRegular from './Source Code Pro-normal'

const addFontsToDocument = (doc: jsPDF) => {
  const fonts = [golosTextBold, golosTextRegular, sourceCodeProRegular]

  fonts.forEach((font) => {
    doc.addFileToVFS(font.file, font.data)
    doc.addFont(font.file, font.name, font.type)
  })
}

export default addFontsToDocument
