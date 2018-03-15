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
    text: 'Second test todo',
    completed: true,
    completedAt: 333
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
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    })
})

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist;
                    done();
                }).catch((err) => done(err));
            })
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('should return 400 if id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(400)
            .expect((res) => {
                expect(res.body).toMatchObject({})
            })
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var id = todos[0]._id;
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text: 'Third string',
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('Third string');
                expect(res.body.todo.completed).toBeTruthy();
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = todos[1]._id;
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text: 'This is updated',
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('This is updated');
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done)
    });
})

//Pan 
//mobil 
//email
//3200