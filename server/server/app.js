const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.uotql.mongodb.net/graphql');
}

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`DB connection: ${err}`));
dbConnection.once('open', () => console.log(`Connected to DB`));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});