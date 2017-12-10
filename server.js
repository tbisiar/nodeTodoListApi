var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
var mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), // created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', {
    useMongoClient: true,
});

// swagger-ui-express setup
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);
app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/todoListRoutes'); // importing routes
routes(app); // register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);