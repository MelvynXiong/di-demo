import { Context, Next } from 'koa'

export default async (ctx: Context, next: Next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log(`Time: ${ms}ms`)
}
