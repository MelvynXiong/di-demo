import { Context, Next } from 'koa'
import nunjucks from 'nunjucks'

function createEnv(path: string, opts: any) {
  const autoescape = opts.autoescape === undefined ? true : opts.autoescape
  const noCache = opts.noCache || false
  const watch = opts.watch || false
  const throwOnUndefined = opts.throwOnUndefined || false
  // 从 path 中搜索 template 文件
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      noCache,
      watch,
    }),
    {
      autoescape,
      throwOnUndefined,
    }
  )
  if (opts.filters) {
    for (const [key, value] of Object.entries(opts.filters)) {
      env.addFilter(key, value as any)
    }
  }
  return env
}

export default function template(path: string, opts: any) {
  const env = createEnv(path, opts)
  return async (ctx: Context, next: Next) => {
    ctx.render = function (view: string, model: object) {
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
      ctx.response.type = 'text/html'
    }
    await next()
  }
}
