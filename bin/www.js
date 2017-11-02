const dotenv = require('dotenv');

dotenv.config();

require('../src');
const api = require('../api');
const { port } = require('config/app');

api.on('error', (err) => {
    console.log(err); // eslint-disable-line
});

api.listen(port, () => {
  console.log(`Running app on port ${port}`); // eslint-disable-line
})
.on('error', (err) => {
    console.log(err); // eslint-disable-line
});

