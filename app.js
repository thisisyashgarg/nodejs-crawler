import puppeteer from 'puppeteer'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();

const url= 'https://ibbi.gov.in/en/tender'; //url to be crawled
const mainData = [ ] //data will be stored here
const noOfPages = 3; // no of pages to be crawled

//function to get text form the table 
async function getPropertyFromTDS (TDS, i){
    return (await (await TDS[i].getProperty('textContent')).jsonValue()).trim();
}

(async () =>{
    try{
        const browser = await puppeteer.launch({headless: true}); 
        // launching the browser, if headless is false, it will show the working
        const page = await browser.newPage();

        //setting up your user agent
        page.setUserAgent(process.env.USER_AGENT);
        console.log('crawler is running...');

        for (let i = 1; i <= noOfPages; i++){
            const targetURL = `${url}?page=${i}`; //dynamic url 
            await page.goto(targetURL, {timeout: 0});
            await page.waitForSelector('tr'); 

            const TDS = await page.$$('tr td'); 
            //extracting all the targeted elements 
            //this works as query selector all

            for(let i = 0; i < TDS.length-2; i+=3){
                const schema = {
                    date: await getPropertyFromTDS(TDS, i),
                    subject: await getPropertyFromTDS(TDS, i+1),
                    contractor: await getPropertyFromTDS(TDS, i+2)
                }
            mainData.push(schema); //data being pushed in the maindata array
            }
        }

        //writing data into data.json from mainData array
        fs.writeFile('data/data.json', JSON.stringify(mainData, null, 4), err =>{
            if(err){
                console.log(err)
            }
            console.log('data added')
        });
        console.log('Everything went well')

        //closing the browser
        await browser.close();
    }

    catch (err){
        return console.log(`our error: ${err}`)
    }
})();


