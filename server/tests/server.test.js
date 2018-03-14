const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = "Some test text";

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err))
            });
    });

    it('should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
            });

        Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
        }).catch((e) => done(e));
    });
});

describe('GET /todos', () => {
    it('should GET 2 todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
                // expect(res.body.todos).toContain(todos)
            })
            .end(done);
    })
})

describe('GET /todos/:id', () => {
    it('should return a todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('should return 400 (Invalid ObjId)', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(400)
            .expect((res) => {
                expect(res.body).toMatchObject({})
            })
            .end(done);
    });

    it('should return 404 (Undefined id)', (done) => {
        request(app)
            .get('/todos/5aa8d8206cbb260d30010884')
            .expect(404)
            .end(done)
    })
})