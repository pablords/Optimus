async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://admin:senha@servidor:3306/unity");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}


	
async function select(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM contact_massivo;');
    return rows;
}
 
module.exports = {select}