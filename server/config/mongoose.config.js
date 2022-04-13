const mongoose = require("mongoose");

// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
// Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true,
// and useFindAndModify is false: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
mongoose.connect("mongodb://owner_db:Hw!JmqCSJ3z*DnOc6b@management.pe:27017/authors_db")
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

// https://mongoosejs.com/docs/connections.html#connection-events
mongoose.connection.on('error', err => {
    console.error(`Mongoose error: ${err}.`);
    process.exit(0);
});

mongoose.connection.on('disconnected', () => console.info('Connection to the database was lost.'));
