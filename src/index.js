const Express = require('express');
const app = Express();
const router = require('./routes/app.route');
const proxyRouter = require('./routes/proxy.route');
const { errorHandler } = require('./interactors/app.interactor');


require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use('/api/', router);
app.use('/proxy/', proxyRouter);
app.use(errorHandler);


app.get('/', function(req, res){
  res.redirect('/api');
});

app.listen(PORT, function () {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
