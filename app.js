const express = require('express');
const userscontroler = require('./user.controler');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', userscontroler.get);
app.post('/', userscontroler.create);
app.delete('/',userscontroler.delete);
app.put('/',userscontroler.update);

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
});
