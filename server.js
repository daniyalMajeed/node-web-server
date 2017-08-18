const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine','hbs')

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n',(err)=>{
    if(err){
      console.log('Unable to write to the server.log');
    }
  });

  next();

});

// app.use((req,res,next)=>{
//   res.render('maintainance.hbs')
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
  // res.send({
  //   name: 'Daniyal',
  //   likes: [
  //     'Eat', 'Sleep','Repeat'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome To My Website'
  })
});

app.get('/bad',(req,res)=>{

res.send({
  eroor: 'Web page not availbale'
});
});

app.get('/about',(req,res)=>{

//res.send('<h1>My first web Page in node js </h1>');
res.render('about.hbs',{
  pageTitle: 'About Page'
})
});

app.listen(port,()=>{
  console.log(`Server is set Up on port: ${port}`);
});
