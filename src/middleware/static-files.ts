import { Context, Next } from 'koa'
import path from 'path'
import mime from 'mime'
import fs from 'mz/fs'

export default function staticFiles(url: string, dir: string) {
  return async function (ctx: Context, next: Next) {
    const rPath = ctx.request.path
    if (rPath.startsWith(url)) {
      const fp = path.join(dir, rPath.substring(url.length))
      const isExist = await fs.exists(fp)
      if (isExist) {
        ctx.response.type = mime.getType(rPath) as string
        ctx.response.body = await fs.readFile(fp)
      } else {
        ctx.response.status = 404
      }
    } else {
      // 不是指定前缀的 url, 继续处理下一个middleware
      await next()
    }
  }
}
