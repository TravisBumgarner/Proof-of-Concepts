require('dotenv').config()

const PORT = 5000;

import server from './src/app'

server.listen(PORT, () => console.log(`http/ws server listening on ${PORT}`));