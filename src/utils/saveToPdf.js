import generatePDF from 'react-to-pdf';

export function saveToPdf(pdfView, fileName) {
    generatePDF(pdfView, { filename: fileName })
}