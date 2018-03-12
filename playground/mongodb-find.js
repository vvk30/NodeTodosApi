const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27018/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongodb server')
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //     .find({
    //         _id: new ObjectID('5aa62043f8ee621018759a01')
    //     })
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch Todos \n' + err);
    //     });
    // db.collection('Todos')
    //     .find({ completed: false })
    //     .count()
    //     .then((count) => {
    //         console.log('Todos');
    //         console.log(`Todos count is ${count}`);
    //     }, (err) => {
    //         console.log('Unable to fetch Todos \n' + err);
    //     });

    db.collection('Users')
        .find({
            name: 'Vishal'
        })
        .toArray()
        .then((docs) => {
            console.log('Users with Vishal name:');
            console.log(JSON.stringify(docs, undefined, 2));
            console.log('The array count is ', docs.length)
        }, (err) => {
            console.log('Unable to fetch users\n', err);
        });
    client.close();
});