# NodeJS Crawler (using Puppeteer)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)](https://github.com/GoogleChrome/puppeteer/blob/master/CHANGELOG.md)

This project is a web crawler built using Puppeteer. Puppeteer is a Node.js library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. This web crawler uses Puppeteer to crawl  the [IBBI](https://ibbi.gov.in/en/tender) website, extract data from it, and store it in a .json file.

## Prerequisites:
* Node.js
* Puppeteer

## Installing
Clone this repository to your local machine.

`$ git clone https://github.com/thisisyashgarg/nodejs-crawler.git`

Change the directory to the cloned repo.

`$ cd puppeteer`

Install all the dependencies.

`$ npm install`

## Running
Run the web crawler using Puppeteer.

`$ npm start`

The data will be stored in the `data.json` file in the `data` folder.
