var express = require('express');

var router = express();


var todoItems = [
    { id: 1, desc: 'foo'},
    { id: 1, desc: 'bar'},
    { id: 1, desc: 'baz'}
];

router.get('/', function (req, res) {
    // loading DB data
    res.render('index', {
        title: 'My App',
        items: todoItems
    });
});

router.post('/add', function(req, res) {
   var newItem = req.body.newItem;
   todoItems.push({
       id: todoItems.length + 1,
       desc: newItem
   });
   res.redirect('/'); 
   
   //console.log(newItem);
});

module.exports = router;