import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import logger from './middleware/logger'
import time from './middleware/time'
import controller from './middleware/controller'
import staticFiles from './middleware/static-files'
import template from './middleware/template'

const app = new Koa()
const isProd = process.env.NODE_ENV === 'production'
app.use(logger)
app.use(time)
app.use(bodyParser())
app.use(staticFiles('/static/', path.join(__dirname, 'static')))
app.use(template(path.resolve(__dirname, 'views'), { noCache: !isProd, watch: !isProd }))
app.use(controller())

// 在端口3000监听:
app.listen(3000, function () {
  console.log('app started at port 3000...')
})
