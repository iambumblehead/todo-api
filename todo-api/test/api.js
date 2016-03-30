// Filename: api.js  
// Timestamp: 2016.03.28-02:53:14 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// initialize tables, then test

const todo_setup = require('../todo_setup');

todo_setup(() => {
  require('./api.spec');
});
