import { Context, Next } from 'koa'
import { Get, Controller } from '../decorator'

@Controller('/')
export default class HomeController {
  @Get('home')
  async visitHome(ctx: Context, next: Next) {
    ctx.render('index.html', { title: 'welcome xmh' })
  }
}
