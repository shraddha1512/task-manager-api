const app = require('./app')
const port = process.env.PORT

// console.log(port);

app.listen(port, () => {
    console.log('Server is setup on port '+ port)
})
