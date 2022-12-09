import puppeteer from 'puppeteer'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();

const url= 'https://ibbi.gov.in/en/tender'; //url to be crawled
const mainData = [ ] //data will be stored here
const noOfPages = 3; // no of pages to be crawled

(async () =>{
    try{
        const browser = await puppeteer.launch({headless: true}); 
        // launching the browser, if this is false, it will show the working
        const page = await browser.newPage();

        //setting up your user agent
        page.setUserAgent(process.env.USER_AGENT);


        for (let i = 1; i <= noOfPages; i++){
            const targetURL = `${url}?page=${i}`; //dynamic url 
            await page.goto(targetURL);
            await page.waitForSelector('tr'); 
            const TDS = await page.$$('tr td'); //this works as query selector all, $ - querySelector
            for(let i = 0; i < TDS.length-2; i+=3){
                const schema = {
                    date: (await (await TDS[i].getProperty('textContent')).jsonValue()).trim(),
                    subject: (await (await TDS[i+1].getProperty('textContent')).jsonValue()).trim(),
                    contractor: (await (await TDS[i+2].getProperty('textContent')).jsonValue()).trim()
                }
            mainData.push(schema); //data being pushed in the maindata array
            }
        }
       
        //writing data into data.json from maindata array
        fs.writeFile('data/data.json', JSON.stringify(mainData, null, 4), err =>{
            if(err){
                console.log(err)
            }
            console.log('data added')
        })
        console.log('working fine')

        //closing the browser
        await browser.close();
    }
    
    catch (err){
        console.log(`our error: ${err}`)
    }
})();