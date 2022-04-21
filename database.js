const database = require('better-sqlite3')

const logdb = new database('log.db')

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row = stmt.get();
if (row === undefined) {
    console.log('Log database appears to be empty. Creating log database...')

    const sqlInit = `
        CREATE TABLE accesslog (   
            id TEXT PRIMARY KEY,
            remote_addr TEXT, 
            remote_user TEXT,
            date TEXT,
            method TEXT
            url TEXT,
            http_version TEXT, 
            status TEXT,
            referer TEXT,
            user_agent TEXT
        );
    `

    logdb.exec(sqlInit)
} else {
    console.log('Log database exists.')
}

module.exports = logdb