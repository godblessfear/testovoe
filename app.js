const { request } = require('http');
const mysql = require('mysql');

//connection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'testovoe',
    password: 'root'
});

connection.connect(err => {
    if(err) return err;
});

const request_all = {
    count: 3,
    page: 2,
}

const last_id = request_all.count * request_all.page +1;
const first_id = last_id - request_all.count;
let array = []

for(i = first_id; i < last_id; i++){
    array.push(i)
}

connection.query("SELECT * FROM `products` WHERE `id` in (" + array + ")", (err, result) => {
    if(err) return console.log(err);


    console.log({
        data: result,
        page: request_all.page,
        length: result.length
    })
});

connection.end();