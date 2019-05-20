var express = require('express');
var router = express.Router();
var chatModule = require('./chat_module');

router.route('/messages')
	.get(chatModule.get)
    .post(chatModule.post);
    
module.exports = router;