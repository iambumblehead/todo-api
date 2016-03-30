// Filename: todo_db_user.js  
// Timestamp: 2016.03.29-20:31:53 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

const todo_db = require('./todo_db');

const todo_db_user = module.exports = (o => {

  o.tablename = 'user7';

  o.showall = fn => {
    todo_db.getall(o, fn);
  };

  o.inittable = fn => {
    const opendb = todo_db.getopendb();
    
    opendb.query([
      'CREATE TABLE IF NOT EXiSTS ' + o.tablename + '(',
      '   id SERIAL PRIMARY KEY,',
      '   name VARCHAR(40) not null ',
      ')'
    ].join('')).on('end', () => {
      opendb.end();
      
      fn(null, 'done');
    });
  };

  o.inittabledata = fn => {
    const opendb = todo_db.getopendb();
    
    opendb.query([
      'INSERT INTO ' + o.tablename + ' ("name") ',
      "SELECT 'defaultuser' ",
      'WHERE NOT EXISTS ( ',
      '  SELECT "name"',
      '  FROM ' + o.tablename,
      "  WHERE name = 'defaultuser'",
      ")"
    ].join('')).on('end', () => {
      opendb.end();

      fn(null, 'done');
    });
  };

  o.seed = fn => {
    o.inittable((err, res) => {
      if (err) return fn(err);

      o.inittabledata((err, res) => {
        if (err) return fn(err);

        o.showall((err, res) => {
          if (err) return fn(err);

          fn(null, 'done');
        });        
      });
    });
  };

  
  return o;
  
})({});
