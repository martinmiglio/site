import addFontsToDocument from './fonts'
import jsPDF from 'jspdf'

type Options = {
  ignoreElements?: (element: HTMLElement) => boolean
  documentModifier?: (document: Document) => void
  scale?: number
  width?: number
  xMargin?: number
  yMargin?: number
}

const renderHTML2PDF = (element: HTMLElement, filename: string, options: Options) => {
  const pdf = new jsPDF('p', 'pt', 'a4')
  addFontsToDocument(pdf)
  pdf.html(element, {
    callback: function (doc) {
      doc.save(filename)
    },
    autoPaging: 'text',
    html2canvas: {
      ignoreElements: options.ignoreElements,
      scale: options.scale,
      onclone: (document) => {
        const pdfOnlyElements: NodeListOf<Element> = document.querySelectorAll('.pdf-only')
        Array.from(pdfOnlyElements).forEach((element) => {
          element.classList.add('print')
        })

        return options.documentModifier?.(document)
      },
      windowWidth: options.width
    },
    width: options.width,
    windowWidth: options.width,
    x: options.xMargin,
    y: options.yMargin
  })
}

export { renderHTML2PDF }
