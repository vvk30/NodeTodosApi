const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27018/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongodb server')
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');



    //deleteOne
    db.collection('Todos')
        .deleteOne({ text: 'Eat lunch' })
        .then((response) => {
            console.log(response);
        }, (err) => {
            console.log(err);
        });

    //deleteMany
    db.collection('Todos')
        .deleteMany({ text: 'Eat lunch' })
        .then((result) => {
            console.log(result);
        }, (err) => {
            console.log('Unable to delete ' + err);
        });

    //findOneAndDelete
    db.collection('Todos')
        .findOneAndDelete({ completed: false })
        .then((res) => {
            console.log(res);
        });
    client.close();
});