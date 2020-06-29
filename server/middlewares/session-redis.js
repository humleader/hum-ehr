const redisStore = require('utils/redis-store')

module.exports = () => {
  return async (ctx, next) => {
    if (!ctx.session) {
      const koaHum = await redisStore.get('KOA_HUM:' + ctx.cookies.get('HUM_SESS'))
      if (koaHum) {
        ctx.session = koaHum
      }
    }
    await next()
  }
}
