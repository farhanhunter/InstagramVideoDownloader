//INSTAGRAM REEL VIDIO DOWNLOADER
//PUPPETEER AND AXIOS
// FS, READLINE

const fs = require("fs");
const axios = require("axios");
const puppeteer = require("puppeteer");
const readline = require("readline");
const { url } = require("inspector");
const { resolve } = require("url");

async function main() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const inputUrl = await new Promise((resolve) => {
    interface.question("Masukan URL:", (inputUrl) => {
      resolve(inputUrl);
    });
  });

  await page.goto(inputUrl);

  await page.waitForSelector("video");

  const videoUrl = await page.evaluate(() => {
    const video = document.querySelector("video");

    return video.src;
  });

  //writer

  const writer = fs.createWriteStream("output/video.mp4");

  const response = await axios({
    url: videoUrl,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);
  console.log("Video berhasil didownload");
}
main();
