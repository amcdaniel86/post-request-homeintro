const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//path is core module, not needed to install.
const app = express();


const logger = (req, res, next) => {
  console.log('Logging...');
  next();
}

app.use(logger);

//View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// my middleware
app.use(myFakeMiddleWare);

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));



app.get('/get-user-info', (req, res) => {
  res.render('user-info-form')
});

app.get('/display-user-info', (req, res, next) => {
  let name =        req.query.name;
  let age =         req.query.age;
  let superhero =   req.query.superhero;

  
  res.send(`
        Your name is ${name}
        Your age is ${age}
        Your superhero is ${superhero}  
    `)
});

app.get('/login', (req, res, next) => {
  res.render('login')
});
// point of this is to show the form to the user, no submitting info with this route.

app.post('/login', (req, res, next) => {
  //  what es6 feature can clean these 2 lines up?
  let email = req.body.email;
  let password = req.body.password;
  
  // if ironhacker@gmail.com adn password are email and password, display welcome, otherwise display go away.
  
  res.send(`Email: ${email}, Password: ${password}`);

  
});
// {below the NAME fields must match the req.body values in the app.post route above. that's how they talk to each other.
  
  
  /* <form action="/login" method="POST">

<label for="email">Email</label>
<input id="email" type="text" name="email">

<label for="password">Password</label>
<input id="password" type="password" name="password"> */

app.get('/test', (req, res, next) => {
  let mySecret = req.secretValue;
  res.send(mySecret);
});


app.listen(3000, () => {
  console.log('listening')
});

function myFakeMiddleWare(req, _, next){
  console.log('myfakemiddleware was called!')
  req.secretValue = "swordfish";
  next();
}