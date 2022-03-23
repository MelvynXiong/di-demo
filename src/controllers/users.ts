import { Context, Next } from 'koa'
import { Get, Controller } from '../decorator'

@Controller('/user')
export default class UserController {
  @Get('')
  async greet(ctx: Context, next: Next) {
    const name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
  }
}
