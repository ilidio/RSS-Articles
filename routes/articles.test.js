const Parser = require('rss-parser');

test('Getting lemonde rss should get not error', () => {
    let url = "https://www.lemonde.fr/rss/une.xml";
    let parser = new Parser();
    (async () => {
        let feed = await parser.parseURL(url);
        if (err) {
            console.error(err.message);
            expect(0).toBe(1);
        } else {
            expect(1).toBe(1);
        }
    })();
});