require('dotenv').config();
const app = require('./app');

// START SERVER LISTENING
const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${port}/`)
});