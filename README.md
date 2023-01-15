# NodeJS Crawler (using Puppeteer)

This code imports puppeteer for web scraping. It creates a schema with date, subject and contractor and pushes it into mainData array. It also writes data from mainData array to a json file. 

## Prerequisites
+ Node 
+ Puppeteer

## Getting Started
1. Clone this repo
```
git clone https://github.com/thisisyashgarg/nodejs-crawler.git 
```

2. Install npm 
```
npm init -y
```

3. Install dependencies 
```
npm i puppeteer 
npm i dotenv 
```

4. Finally, run the code 
```
node index.js 
```
## Output
The output of this program will be a JSON file containing arrays of objects, each with the data of date, subject and contractors.
