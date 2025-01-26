const easyinvoice = require('easyinvoice');
const fs = require('fs');

function createInvoice(data = {}, invoiceName) {
    return easyinvoice.createInvoice(data, function (result) {
        fs.writeFileSync('storage/invoices/' + invoiceName + '.pdf', result.pdf, 'base64');
    });
}

module.exports = { createInvoice };