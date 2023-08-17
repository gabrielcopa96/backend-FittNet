const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 3001

server.listen(PORT, async () => {
  console.log(`Server listening at port ${PORT}`);
});
