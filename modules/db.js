const mongoose = require("mongoose");
const dburl = "mongodb://tanmayvij:admin123@35.196.35.2/meanchatapp?authSource=admin";

mongoose.connect(dburl, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
    console.log("Mongoose connected");
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

function gracefulShutdown(msg, callback) {
    mongoose.connection.close(function() {
      console.log('Mongoose disconnected through ' + msg);
      callback();
    });
}
  
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});