require('dotenv').config()

import app from './src/app'

app.listen(process.env.PORT_SERVER, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT_SERVER}`)
  })