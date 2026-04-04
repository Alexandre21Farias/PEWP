const { Client } = require('pg')

async function testConnection() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  })

  try {
    await client.connect()
    console.log('Connected!')
    const res = await client.query('SELECT version();')
    console.log(res.rows[0])
  } catch (err) {
    console.error('Connection failed:', err.message)
    console.error(err.stack)
  } finally {
    await client.end()
  }
}

testConnection()
