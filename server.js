// 1. Core Node Modules
// 2. NPM Packages
// 3. Global Variables
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

// Routes
const routes = require('./routes');


// -------------------------------- MIDDLEWARE -------------------------------- //
// Body Parser (pulls data off of request object and puts it in "body" property)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve Static Assets
app.use(express.static(`${__dirname}/public`));

// Logger
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleString();
  console.table({ url, method, requestedAt });
  next();
})

// -------------------------------- HTML ENDPOINTS -------------------------------- //

// Root Route
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});


// -------------------------------- API ENDPOINTS -------------------------------- //

// Cities
app.use('/api/v1/cities', routes.cities);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
