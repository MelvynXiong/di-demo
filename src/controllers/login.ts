import { Context, Next } from 'koa'
import { Get, Controller } from '../decorator'

@Controller('/login')
export default class LoginInController {
  @Get('')
  async signIn(ctx: Context, next: Next) {
    const email = ctx.request.body.email || ''
    const password = ctx.request.body.password || ''
    console.log(`signin with email: ${email}, password: ${password}`)
    if (email === 'koa@youzan.com' && password === '12345') {
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
