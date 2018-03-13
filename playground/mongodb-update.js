const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27018/TodoApp', (err, client) => {
    if (err)
        return console.log('Unable to establish connection');
    console.log('Connection to Mongo successfull');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //     .findOneAndUpdate({
    //         text: 'Walk the dog'
    //     }, {
    //             $set: { completed: false }
    //         }, {
    //             returnOriginal: false
    //         }).then((res) => {
    //             console.log(res);
    //         });
    db.collection('Users')
        .findOneAndUpdate({
            _id: new ObjectID('5aa62195afb4131d6c1178d1')
        }, {
                $inc: { age: 1 }
            }, {
                returnOriginal: false
            }).then((res) => {
                console.log(res);
            })
    client.close();
})