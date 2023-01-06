const { createPool } = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "leo10@messi",
    database: "wordslist",
    connectionLimit: 10
})

pool.query('select * from book1 ORDER BY RANd() LIMIT 1' ,(err ,result ,fields) =>{
    if(err)
        return console.log(err);
    return console.log(result);
})

// console.log(pool);
module.export = pool;