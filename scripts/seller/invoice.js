const easyinvoice = require('easyinvoice');
const fs = require('fs');

function createInvoice(data = {}, invoiceName) {
    return easyinvoice.createInvoice(data, function (result) {
        fs.writeFileSync('storage/invoices/'+ invoiceName + '.pdf', result.pdf, 'base64');
        easyinvoice.download('storage/invoices/'+ invoiceName + '.pdf');
    });
}


module.exports = { createInvoice };