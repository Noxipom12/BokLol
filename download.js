const axios = require('axios');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to download a video
async function downloadVideo(url, outputPath) {
    const writer = fs.createWriteStream(outputPath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Function to prompt user for URLs
function promptForUrls() {
    return new Promise((resolve) => {
        rl.question('Masukkan URL video (pisahkan dengan koma jika lebih dari satu): ', (input) => {
            const urls = input.split(',').map(url => url.trim());
            resolve(urls);
        });
    });
}

// Main function to download all videos
async function downloadAllVideos(urls) {
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const fileName = `video${i + 1}.mp4`;
        const outputPath = path.resolve(__dirname, fileName);

        try {
            console.log(`Downloading ${url}...`);
            await downloadVideo(url, outputPath);
            console.log(`Downloaded ${fileName}`);
        } catch (error) {
            console.error(`Error downloading ${url}:`, error);
        }
    }
}

// Run the script
(async () => {
    const urls = await promptForUrls();
    await downloadAllVideos(urls);
    rl.close();
})();
