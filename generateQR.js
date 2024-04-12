const qr = require('qr-image');
const fs = require('fs');

// Convert into promise-based function
const util = require('util');
const fileWrite = util.promisify(fs.writeFile);

//generate QR code image
async function generateQR(url) {
    try {
        const qrPng = qr.imageSync(url, {type: 'png'});
        await fileWrite('qr_img.png', qrPng); //write data to qrcode.png
        console.log('QR code was generated!');
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}

// Read URL from URL.txt file
fs.readFile('URL.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading URL.txt:', err);
        return;
    }
    const url = data.trim(); // Remove any leading/trailing whitespace
    // Generate QR code image
    generateQR(url);
    
    // Save user input to userLink.txt
    fs.writeFile('userLink.txt', `URL: ${url}`, (err) => {
        if (err) throw err;
        console.log('User input saved to userLink.txt');
    });
});
