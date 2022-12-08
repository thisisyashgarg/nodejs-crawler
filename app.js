import puppeteer from 'puppeteer'
// import mongoose from 'mongoose'
import fs from 'fs'

const url= 'https://ibbi.gov.in/en/tender';
// mongoose.connect('')

//mongoose schema 
// const tableSchema = ({
//     name: String,
//     subject: String,
//     contractAwardedTo: String
// },
// {timestamps: {
//     createdAt: 'created_at', // Use `created_at` to store the created date
//     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
// }});
// const table = mongoose.model('Tables', tableSchema);


(async () =>{
    try{
        const browser = await puppeteer.launch({headless: true}); // if this is false, it will show the working
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36');
        await page.goto(url);
        
        // we cannot use foreach loop here, cause it is not async, we can use forOf loop

        await page.waitForSelector('tr');
        const TDS = await page.$$('tr td'); //this works as query selector all, $ - querySelector

        // console.log(typeof TDS);
        // console.log(await (await TDS[14].getProperty('textContent')).jsonValue())
        // for(let i = 2; i < TDS.length; i++){
        //     const schema = {
        //         name: (await (await TDS[i-2].getProperty('textContent')).jsonValue()).trim(),
        //         subject: (await (await TDS[i-1].getProperty('textContent')).jsonValue()).trim(),
        //         contractor: (await (await TDS[i].getProperty('textContent')).jsonValue()).trim()
        //     }
        //     fs.writeFile('./tmp/data.json', JSON.stringify(schema), err =>{
        //         if(!err){
        //             console.log('added')
        //         }
        //     })
        // }
        const schema = {
            name: (await (await TDS[12].getProperty('textContent')).jsonValue()).trim(),
            subject: (await (await TDS[13].getProperty('textContent')).jsonValue()).trim(),
            contractor: (await (await TDS[14].getProperty('textContent')).jsonValue()).trim()
        }
        console.log(JSON.stringify(schema));
        

        
        



        



        // console.log(rowsOfTable.length);
        console.log('working fine')

    }
    catch (err){
        console.log(`our error: ${err}`)
    }
})();