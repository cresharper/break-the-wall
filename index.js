const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline-sync')
const fs = require('fs');

let wantedUrl = readline.question('Enter a paywalled article you want to read: ')

console.log('Alright, give me a bit...')

// const URL = "https://seekingalpha.com/article/4566855-amyris-running-out-of-funds-key-strategic-transaction-delay";

request(wantedUrl, function (err, res, body) {
    if(err) {
        console.log(err, "error occurred while hitting URL");
    }
    else {
        if(wantedUrl.indexOf('seekingalpha.com') > -1) {
            let $ = cheerio.load(body);
            $('[data-test-id="content-container"] > p').each(function(index) {
                console.log($(this).text())
            })
        } else {
            console.log('sorry we dont have that website yet')
        }
    }
});
