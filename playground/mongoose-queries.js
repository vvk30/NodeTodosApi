const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { ObjectID } = require('mongodb');
const { User } = require('./../server/models/user');

var id = '5aa8d8206cbb260d30010884';

var uid = '5aa7ada1ca3f129a0d06b48';

if (!ObjectID.isValid(id)) {
    return console.log('Id not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
}).catch((e) => console.log(e));

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
}).catch((e) => console.log(e));

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('ID not found');
    }
    console.log('TodoById:' + todo);
}).catch((e) => console.log(e));

User.findById(uid).then((user) => {
    if (!user) {
        return console.log('No user found');
    }
    console.log('User' + user);
}).catch((e) => console.log(e));