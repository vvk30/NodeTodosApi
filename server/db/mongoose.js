var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/TodoApp').then((res) => {
    //console.log(res);
}).catch((err) => {
    console.log('Failed conn ' + err);

});

module.exports = {
    mongoose
};