const app = require('koa')()
const koaRouter = require('koa-router')()
const parser = require('koa-bodyparser')
const json = require('koa-json')
const path = require('path')
const session = require('koa-session')
const koaStatic = require('koa-static')

app.use(function *(next) {
    yield next
    this.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
    })
})

// *********start middwares******************
// koa-session
app.keys = ['secret', 'keys'] // key of session
const opts = {
    'maxAge': 60 * 60 * 1000
}
app.use(session(app, opts))

// koa-parser
app.use(parser({
    extendTypes: {
        json: ['application/x-javascript']
    }
}))

// koa-json
app.use(json())

// 判断资源是否需要权限
// 若需要权限， 判断是否有权限
app.use(function *(next) {
   yield next 
})

// koa-router
const routeOpts = require('./routes/config.json')
for (let key in routeOpts) {
    if (routeOpts.hasOwnProperty(key)) {
        let elem = require('./routes/' + routeOpts[key])
        koaRouter.use(key, elem.routes(), elem.allowedMethods())
    }
}
app.use(koaRouter.routes())

// koa-static
app.use(koaStatic(path.join(__dirname, '/public')))
// *********end middwares******************

module.exports = app
