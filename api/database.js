const fs = require('fs');
const dbfile = './database.json';
module.exports = (data) => {
    try {
        if (data) {
            fs.writeFileSync(dbfile, JSON.stringify(data), { encoding: 'utf-8' });
            return;
        }
        return JSON.parse(fs.readFileSync(dbfile, 'utf-8'));
    }
    catch { return [] }
};