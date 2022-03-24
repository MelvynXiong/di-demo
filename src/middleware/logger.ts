import { Context, Next } from 'koa'
import colors from 'colors'

export default async (ctx: Context, next: Next) => {
  console.log(colors.green(`${ctx.request.method} ${ctx.request.url}`))
  await next()
}
