const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const port = 8000;

app.use(express.static('public'))
app.use(express.json())

let articleContent = [];

app.get('/info/:dynamic', (req,res) => {
    // example of url
    const {dynamic} = req.params
    // example of url query
    const {key} = req.query
    // console logging the result
    console.log(dynamic, key)
    res.status(200).json({info: articleContent})
})

app.post('/', (req, res) => {
    const { wantedUrl } = req.body
    if (!wantedUrl) {
        return res.status(400).send({status: 'failed'})
    }
    res.status(200).send({status: 'recieved'})
    request(wantedUrl, function (err, res, body) {
        if(err) {
            console.log(err, "error occurred while hitting URL");
            articleContent = "error occurred while hitting URL"
        }
        else {
            let $ = cheerio.load(body);
            articleContent.push($('[data-test-id="author-brief"]').html())
            articleContent.push($('[data-test-id="article-summary-title"]').html())
            articleContent.push($('ul.lo-d').html());
            $('[data-test-id="content-container"] > *').each(function(index) {
                articleContent.push($(this).html())
            })
        }
    });
})

app.listen(port, () => console.log(`server has started on ${port}`))