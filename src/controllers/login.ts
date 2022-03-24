import { Context, Next } from 'koa'
import { Post, Controller } from '../decorator'

@Controller('/signin')
export default class LoginInController {
  @Post('')
  async signIn(ctx: Context, next: Next) {
    console.log(123)
    const email = ctx.request.body.email || ''
    const password = ctx.request.body.password || ''
    console.log(`signin with email: ${email}, password: ${password}`)
    if (email === 'admin@example.com' && password === '123456') {
      ctx.render('sign-ok.html', {
        title: 'sign in ok',
        name: 'xiong',
      })
    } else {
      ctx.render('sign-fail.html', {
        title: 'fail with error',
      })
    }
  }
}
