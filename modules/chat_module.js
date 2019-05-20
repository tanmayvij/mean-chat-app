var mongoose = require("mongoose");

var message = mongoose.model('Message', {
    message: String,
    username: String
});

module.exports.get = function(req, res) {
    message.find().exec(function(err, result) {
        if(err)
        {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(result);
        }
    });
};

module.exports.post = function(req, res) {
    var msg = new message(req.body);
    msg.save(); 
    res.status(201).json();
};