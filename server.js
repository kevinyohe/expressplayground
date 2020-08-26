const path = require('path');
const express = require('express');
var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var schema = {
    "properties": {
      "foo": { "type": "string" },
      "bar": { "type": "number", "maximum": 3 }
    }
  };

// Middelware example
const logger = (req, res, next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
}

const app = express();
app.use(logger)

var validate = ajv.compile(schema);

app.get('/',function(req, res){
    res.send(test({"foo": "2", "bar": 3}));
})
app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.get('/api/hello', (req, res)=>{
    res.json({msg: 'Hello'})
})

// Using url path variables
app.get('/api/thing/:id', (req, res) =>{
    res.json({mes: req.params.id})
})


function test(data) {
    var valid = validate(data);
    if (valid) {
        console.log('Valid!');
        return 'Valid';
    }
    else {
        console.log('Invalid: ' + ajv.errorsText(validate.errors));
        return 'Invalid';
  };
}

port = process.env.PORT || 5000;

app.listen(5000, ()=>{
    console.log('Server started')
});
