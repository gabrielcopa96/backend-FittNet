import server from './src/app';
import { conn } from './src/db';

const PORT = process.env.PORT || 3001

conn.then(() => {
  server.listen(PORT, async () => {
    console.log(`Server listening at port ${PORT}`);
  });
}).catch((err: any) => {
  console.log("not connection database", err);
})