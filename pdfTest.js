var pdf = require('pdfkit');
var fs = require('fs');

var myDoc = new pdf

myDoc.pipe(fs.createWriteStream('node.pdf'));

myDoc.font('Times-Roman')
    .fontSize(48)
    .text('NodeJS PDF Documentssssssssss', 100, 100);
myDoc.end();
