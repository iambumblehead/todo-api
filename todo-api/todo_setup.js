// Filename: todo_setup.js  
// Timestamp: 2016.03.28-02:52:38 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var todo_db_user = require('./todo_db_user'),    
    todo_db_todolist = require('./todo_db_todolist');

module.exports = (fn) => {
  
  todo_db_user.seed((err, success) => {
//    console.log('seed ', err, success);

    todo_db_todolist.seed((err, success) => {
      fn(null, 'done');

      //todo_db_todolist.delete_atusername('defaultuser', (err, res) => {
//      todo_db_todolist.getall(fn);
    });
  });
};
/*
console.log('goo');
setup(function () {
  console.log('djdjdjd');
});
*/
