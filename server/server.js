const express = require('express');
const cors = require('cors');
// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config");
const authorize = require('./util/authorize');
const app = express();
const AuthorRouter = require('./routes/author.routes');
const UserRouter = require('./routes/user.routes');

const port = 8000;

app.use(cors());

// Para poder acceder a los datos POST, necesitamos poder extraerlos del objeto "request" (solicitud).
// Asegurarse de que las siguientes líneas se encuentren por encima de cualquier bloque de código app.get o app.post
// Tanto express.urlencoded() y express.json() son funciones middleware en Express.
// Son responsables de proporcionar y analizar los datos de "request.body".
app.use(express.json(), express.urlencoded({ extended: true }));
app.use('/api/authors', authorize, AuthorRouter);
app.use('/api/users', UserRouter);

const server = app.listen(port, () =>
    console.log(`Server is loaded, locked and running on port ${server.address().port}!`)
);
