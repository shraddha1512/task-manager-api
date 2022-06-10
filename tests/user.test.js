const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email:'Mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Shraddha',
        email: 'shraddha@example.com',
        password: 'Mypass777!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should login for non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrong password!'
    }).expect(400)
})

test('Should get profile for user', async() => {
    await request(app)
            .get('users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('Should not get profile for an Unauthorization', async() => {
    await request(app)
            .get('users/me')
            .send()
            .expect(400)
})

// test('Should logout for user', async() => {
//     await request(app)
//             .get('users/me')
//             .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//             .send()
//             .expect(200)
// })

// test('Should delete account for user', async() => {
//     await request(app)
//             .get('users/me')
//             .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//             .send()
//             .expect(200)
// })

// test('Should not delete account for unauthorised-user', async() => {
//     await request(app)
//             .get('users/me')
//             .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//             .send()
//             .expect(200)
// })