const express = require("express");
const Parser = require('rss-parser');
const sqlite3 = require('sqlite3');
const router = express.Router();

const sqlite3Database = './db/rss_articles.db';

router.get("/", (req, res) => {
    let db = new sqlite3.Database(sqlite3Database, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the rss articles database.');
        let sql = `SELECT * FROM articles`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row.name);
            });
            res.send(rows)
        });
    });
});

router.get("/import", (req, res) => {
    let url = req.query.siteRssUrl;
    let parser = new Parser();
    (async () => {
        let feed = await parser.parseURL(url);
        let db = new sqlite3.Database(sqlite3Database, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the rss articles database.');
            db.serialize(() => {
                db.run(`INSERT INTO imports(rawContent, importDate) VALUES('${feed.toString()}', datetime('now'))`);
            });
        });
        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link)
            db.serialize(() => {
                db.run(`REPLACE INTO articles(externalID, title, link, importDate, description, mainPicture) 
                        VALUES('${item.guid}','${item.title}', '${item.link}', datetime('now'), '${item.content}', '')`);
            });
        });
        res.send("Import success")
    })();
});

module.exports = router;
