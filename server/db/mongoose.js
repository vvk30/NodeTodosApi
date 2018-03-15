var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then((res) => {
    //console.log(res);
}).catch((err) => {
    console.log('Failed conn ' + err);

});

module.exports = {
    mongoose
};