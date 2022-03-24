import { Context, Next } from 'koa'
import { Get, Controller } from '../decorator'
import RegionCodeService from '../services/RegionCodeService'

@Controller('/user')
export default class UserController {
  constructor(public readonly regionCodeService: RegionCodeService) {}

  @Get('')
  async greet(ctx: Context, next: Next) {
    const name = ctx.query.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
  }

  @Get('/getRegionCode')
  async getRegionCode(ctx: Context, next: Next) {
    ctx.body = this.regionCodeService.getRegionCode()
  }
}
