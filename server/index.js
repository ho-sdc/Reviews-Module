const app = require('./server.js');
const port = 3003;
const db = require('../database/mongodb/index.js')

app.listen(port, () => console.log(`Listening on port ${port}.`));