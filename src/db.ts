import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',      // Change if using remote DB
  user: 'root',           // Your MySQL user
  password: '12345',       
  database: 'microbros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;