var express = require('express');
var router = express.Router();

router.get('/', renderIndex);

function renderIndex(req, res){
    res.render('./news/index');
}
module.exports = router;