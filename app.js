import puppeteer from 'puppeteer'
import fs from 'fs'
const url= 'https://ibbi.gov.in/en/tender';

(async () =>{
    try{
        const mainData = [ ]
        const browser = await puppeteer.launch({headless: true}); // if this is false, it will show the working
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36');
        await page.goto(url);

        while (await page.$('.pagination .next a')) {

            await page.waitForSelector('tr');
            const TDS = await page.$$('tr td'); //this works as query selector all, $ - querySelector

            for(let i = 0; i < TDS.length-2; i+=3){
                const schema = {
                    date: (await (await TDS[i].getProperty('textContent')).jsonValue()).trim(),
                    subject: (await (await TDS[i+1].getProperty('textContent')).jsonValue()).trim(),
                    contractor: (await (await TDS[i+2].getProperty('textContent')).jsonValue()).trim()
                }
            mainData.push(schema);
            }
            console.log(JSON.stringify(mainData));
            await page.click('.pagination .next a');
        }

        fs.writeFile('data/data.json', JSON.stringify(mainData, null, 4), err =>{
            if(err){
                console.log(err)
            }
            console.log('data added')
        })
        console.log('working fine')
        // await browser.close();

    }
    catch (err){
        console.log(`our error: ${err}`)
    }
})();