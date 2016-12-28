PDFDocument = require ('pdfkit')
var fs = require('fs')
doc = new PDFDocument({
  size: [612, 573]
});

doc.pipe (fs.createWriteStream('public/node.pdf'))

doc.font('fonts/SHARP.ttf')
   .fontSize(13)
   .text('Some text with an embedded font!', 88, 172)
doc.end();
//
// myDoc.pipe(fs.createWriteStream('node.pdf'));
//
// myDoc.font('Times-Roman')
//     .fontSize(48)
//     .text('NodeJS PDF Documentssssssssss', 100, 100);
// myDoc.end();

// var fs = require('fs');
// var pdf = require('html-pdf');
// var html = fs.readFileSync('public/invoiceTemplate.html', 'utf8');
// var options = { "height": "20.2cm",        // allowed units: mm, cm, in, px
//   "width": "21.6cm",  };
//
// pdf.create(html, options).toFile('public/htmlToPDF.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });
