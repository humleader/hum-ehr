const Redis = require('koa-redis')
const { redis } = require('utils/config')

const Store = new Redis({
  host: redis.host,
  port: redis.port,
  password: redis.password
})

module.exports = Store
