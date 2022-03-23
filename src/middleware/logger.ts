import { Context, Next } from 'koa'

export default async (ctx: Context, next: Next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
}
