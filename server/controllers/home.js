const { baseURI, appCode, apiPrefix, pageTitle, redis } = require('utils/config')
const Redis = require('koa-redis')
const Store = new Redis({
  host: redis.host,
  port: redis.port,
  password: redis.password
}).client
// 获取用户列表

const env = process.env.NODE_ENV || 'development'

module.exports = async ctx => {
  const initState = getInitState()
  const koaHum = await Store.get('KOA_HUM:' + ctx.cookies.get('HUM_SESS'))
  ctx.session = {}
  if (ctx.session && koaHum) {
    ctx.session = JSON.parse(koaHum)
  }
  const config = await getConfig(ctx)

  if (!ctx.session.user && env !== 'development') {
    ctx.redirect(`/login?callbackUrl=${encodeURIComponent(ctx.path)}`)
  } else {
    await render(ctx)('index', {
      pageTitle,
      config: JSON.stringify(config),
      initState: JSON.stringify(initState),
      baseURI
    })
  }
}

// 提供给前台 redux 作为初始化 state
function getInitState() {
  return {}
}

// 获取全局配置
async function getConfig(ctx) {
  let userInfo = {}
  userInfo = {
    ...ctx.session.user
  }

  return {
    // title
    pageTitle,
    // 基础 URI
    baseURI,
    // ajax 请求前缀
    apiPrefix,
    // 系统编号
    appCode,
    // 用户信息
    userInfo,
    // 环境
    env
  }
}

// 优化模板不存在的时候的提示
const render =
  env === 'development'
    ? ctx => {
        return async (...args) => {
          try {
            await ctx.render(...args)
          } catch (e) {
            ctx.body = 'HTML 静态模板编译中，请稍后刷新页面...'
          }
        }
      }
    : ctx => ctx.render
