import fs from 'fs'
import path from 'path'
import Router from '@koa/router'
import { META_PATH, META_METHOD } from '../decorator'
import colors from 'colors'

const router = new Router()

function isConstructor(target: string) {
  return target === 'constructor'
}

function isFunction(target: any) {
  return typeof target === 'function'
}
// 注册路由处理函数
function registerUrl(router: Router, prefixRoute: string, target: object) {
  const prototype = Object.getPrototypeOf(target)
  // 筛选出 controller 中定义的方法
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(
    (item) => !isConstructor(item) && isFunction(prototype[item])
  )

  methodsNames.forEach((methodName) => {
    const fn = prototype[methodName]

    const route = Reflect.getMetadata(META_PATH, fn)
    const method = Reflect.getMetadata(META_METHOD, fn)
    const finalRoute = path.join(prefixRoute, route)

    if (method === 'GET') {
      router.get(finalRoute, fn)
      console.log(`注册 GET 请求：${finalRoute}`)
    } else if (method === 'POST') {
      console.log(`注册 POST 请求：${finalRoute}`)
      router.post(finalRoute, fn)
    } else {
      console.log(`invalid URL: ${finalRoute}`)
    }
  })
}

function readControllerFile(router: Router, dir: string) {
  const files = fs.readdirSync(dir)
  const tsFiles = files.filter((item) => item.endsWith('.ts'))

  for (let file of tsFiles) {
    console.log(colors.blue(`开始处理controller：${file}`))
    // 自定义的 controller 类
    const controllerClass = require(path.join(dir, file))
    // 获取前置路由
    const prefixRoute = Reflect.getMetadata(META_PATH, controllerClass.default)
    registerUrl(router, prefixRoute, new controllerClass.default())
  }
}

export default (dir?: string) => {
  const real_dir = dir || path.resolve(__dirname, '../controllers')
  readControllerFile(router, real_dir)
  return router.routes()
}
