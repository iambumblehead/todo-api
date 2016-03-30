// Filename: todo_db.js  
// Timestamp: 2016.03.27-20:20:10 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

const pg = require('pg');

const todo_db = module.exports = (o => {

  o.getclient = () => (
    new pg.Client(
      process.env.DATABASE_URL
        || 'postgres://docker:docker@192.168.99.101:5432/docker'      
    )
  );

  o.getopendb = () => {
    var client = o.getclient();

    client.connect();

    return client;
  };

  o.getall = (module, fn) => {
    const opendb = todo_db.getopendb();

    opendb.query('SELECT * FROM ' + module.tablename, (err, result) => {
      opendb.end();
      
      fn(err, result);
    });
  };

  return o;
  
})({});
