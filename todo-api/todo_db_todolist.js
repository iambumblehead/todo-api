// Filename: todo_db_todolist.js  
// Timestamp: 2016.03.28-15:16:00 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

const todo_db = require('./todo_db');
const todo_db_user = require('./todo_db_user');

const todo_db_todolist = module.exports = (o => {

  o.tablename = 'todolist3';

  o.inittable = fn => {
    const opendb = todo_db.getopendb();
    
    opendb.query([
      'CREATE TABLE IF NOT EXiSTS ' + o.tablename + '(',
      '  id SERIAL PRIMARY KEY,',
      '  todouser INTEGER REFERENCES ' + todo_db_user.tablename + ',',
      '  text TEXT not null',
      ')'
    ].join('')).on('end', () => {
      opendb.end();
      
      fn(null, 'done');
    });
  };

  o.seed = fn => {
    o.inittable((err, res) => {
      fn(err, res);
    });
  };

  o.set_byusername = (name, todolist, fn) => {
    const opendb = todo_db.getopendb(),
          usertable = todo_db_user.tablename,
          todotable = o.tablename;
    
    opendb.query([
      ' WITH ins (text, name) AS',
      '  (VALUES',
      "    ('"+todolist+"', '"+name+"')",
      '  ) ',
      ' INSERT INTO :todotable',
      '  (text, todouser) ',
      ' SELECT',
      '  ins.text, :usertable.id',
      ' FROM',
      '  :usertable JOIN ins',
      '    on ins.name = :usertable.name'
    ].join('')
     .replace(/:usertable/gi, usertable)
     .replace(/:todotable/gi, todotable), (err, res) => {
       opendb.end();
       
       fn(err, res);
     });
  };

  o.get_byusername = (name, fn) => {
    const opendb = todo_db.getopendb(),
          usertable = todo_db_user.tablename,
          todotable = o.tablename;
    
    opendb.query([
      'SELECT :todotable.id, :todotable.text ',
      'FROM :usertable ',
      'INNER JOIN :todotable ON :todotable.todouser = :usertable.id ',
      'WHERE :usertable.name = \'' + name + '\''
    ].join('')
     .replace(/:usertable/gi, usertable)
     .replace(/:todotable/gi, todotable), (err, res) => {
       opendb.end();
       
       fn(err, res);
     });
  };

  o.set_byid = (id, data, fn) => {
    const opendb = todo_db.getopendb(),
          todotable = o.tablename;

    opendb.query([
      "UPDATE "+todotable+" SET text = '"+data+"' WHERE id = " + id 
    ].join(''), (err, res) => {
      opendb.end();

      if (err) return fn(err);
      
      fn(null, 'done');    
    });
  };

  // no upsert psql 9.3 (atomic update|insert)
  // if row exists, update row, else set new row
  o.set = (name, data, fn) => {
    const opendb = todo_db.getopendb();

    o.get_byusername(name, (err, res) => {
      opendb.end();

      if (err) return fn(err);
      
      var row = res && res.rows && res.rows[0];
      if (row) {
        o.set_byid(row.id, data, fn);
      } else {
        o.set_byusername(name, data, fn);
      }
    });
  };

  // if DELETE is common occurrence consider 'on delete cascade'
  o.delete_atusername = (name, fn) => {
    const opendb = todo_db.getopendb(),
          usertable = todo_db_user.tablename,
          todotable = o.tablename;

    opendb.query([
      'DELETE ',
      'FROM ' + todotable + ' ',
      'WHERE :todotable.todouser IN (select :usertable.id from :usertable where :usertable.name=\''+name+'\')'
    ].join('')
     .replace(/:usertable/gi, usertable)
     .replace(/:todotable/gi, todotable), (err, res) => {
      opendb.end();

       if (err) return fn(err);

       fn(null, res);
     });

    // alternative form using DELETE ... FROM ... USING ... WHERE
    //opendb.query([
    //  'DELETE ',
    //  'FROM ' + todotable + ' AS todotable ',
    //  'USING ' + usertable + ' AS usertable ',
    //  'WHERE (usertable.id = todotable.todouser) AND usertable.name = \''+name+'\''
    //].join(''), (err, res) => {
    //  opendb.end();
    //
    //  if (err) return fn(err);
    //
    //  fn(null, 'done');
    //});
  };

  o.getall = (fn) => {
    todo_db.getall(o, (err, res) => {
      console.log('all data', res);
    });
  };
      
  return o;
  
})({});
