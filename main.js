const url = "https://www.moneycontrol.com/stocks/marketstats/bse-mostactive-stocks/all-companies-97/";

const request = require("request"); // to get html data
const cheerio = require("cheerio"); // to select specific elements from page
const prompt = require("prompt-sync")(); // for taking console user prompt

request(url, cb);


function cb(err, response, html) {
    if (err) {
        console.error(err);
    } else {
        arr = working_fn(html);
    }
}


function working_fn(html) {
    let $ = cheerio.load(html);
    let anchorElem = $('.bsr_table.hist_tbl_hm>table>tbody>tr>td');

    // console.log($(anchorElem[1]).text().trim());

    let arr = []

    for (let i = 0; i < anchorElem.length; i = i + 19) {



        arr.push({
            CompanyName: $(anchorElem[i]).text().trim().split('\n')[0].toLowerCase(),
            Group: $(anchorElem[i + 1]).text().trim(),
            High: $(anchorElem[i + 2]).text().trim(),
            Low: $(anchorElem[i + 3]).text().trim(),
            Last: $(anchorElem[i + 4]).text().trim(),
            Price: $(anchorElem[i + 5]).text().trim(),
            Change: $(anchorElem[i + 6]).text().trim(),

        })
    }
    let company_name = prompt(`Enter the company name to know details`)
    let idx = validate_company(company_name, arr)
    if (idx != -1) {
        let cnt = true;
        while (cnt == true) {
            setTimeout(() => { console.log('....'); }, 2000);
            let ch = parseInt(prompt(`Enter the choice:
            1. Highest Value
            2. Lowest Value
            3. Last Value
            4. Price Value
            5. Change Percentage
            6. Group of Stock
            0 .Exit
            `));
            switch (ch) {
                case 1:
                    console.log(`For the company ${arr[idx].CompanyName.toUpperCase()} High is :
                 ` + arr[idx].High);
                    break;
                case 2:
                    console.log(`For the company ${arr[idx].CompanyName.toUpperCase()} Low is :
                ` + arr[idx].Low);

                    break;
                case 3:

                    console.log(`For the company ${arr[idx].CompanyName.toUpperCase()} Last Value is :
                 ` + arr[idx].Last);

                    break;
                case 4:
                    console.log(`For the company ${arr[idx].CompanyName.toUpperCase()} Last Value is :
                ` + arr[idx].Price);

                    break;
                case 5:
                    console.log(arr[idx].Change);

                    break;
                case 6:
                    console.log(arr[idx].Group);

                    break;
                case 0:
                    cnt = false;
                    break;
                default:
                    console.log('Wrong choice');
                    break;
            }
        }

    } else {
        console.log(`Company name is not Found 
        `);
    }



}


function validate_company(company_name, arr) {
    let f = -1;
    for (let i = 0; i < arr.length; i++) {
        if (company_name.replaceAll(' ', '').toLowerCase() == arr[i].CompanyName.replaceAll(' ', '')) {
            f = i;
            return i;
        }
    }
    return f;

}
