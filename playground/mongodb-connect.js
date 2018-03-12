const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27018/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongodb server')
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    var user = { name: 'Vishal', age: 23 };
    var { name } = user;
    console.log(name);

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // });

    // db.collection('Users').insertOne({
    //     name: 'Vishal',
    //     age: 24,
    //     location: 'Pune'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Cannot insert user \n' + err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // })

    client.close();
});