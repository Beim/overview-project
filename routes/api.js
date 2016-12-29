const router = require('koa-router')()
const path = require('path')
const DB = path.resolve(__dirname, '../db/mongo.js')
const mongo = require(DB)

/*
 * GET
 */

router.get('/', function *(next) {
    this.body = 'Hello World@'
})

router.get('/sitemap', function *(next) {
    let data = yield mongo.get.sitemap()
    if (data === -1) {
        this.body = -1
    }
    else {
        let res = {}
        for (let item of data) {
            if (res[item.proClass]) {
                res[item.proClass].push(item.proName)
            }
            else {
                res[item.proClass] = [item.proName]
            }
        }
        this.body = res
        
    }
})

router.get('/lineup/:proClass', function *(next) {
    let proClass = this.params.proClass
    let docs = yield mongo.get.productLineup(proClass)
    this.body = docs
})

router.get('/product/:proName', function *(next) {
    let proName = this.params.proName
    let res = yield mongo.get.product(proName)
    this.body = res ? res : -1
})

router.get('/headerpic', function *(next) {
    let pics = yield mongo.get.headerpic()
    this.body = pics
})

router.get('/overview/:title', function *(next) {
    let title = this.params.title
    let res = yield mongo.get.overview(title)
    this.body = res
})

/*
 * POST
 */

router.post('/product', function *(next) {
    let pro = this.request.body
    let res = yield mongo.post.product(pro)
    this.body = res
})

router.post('/headerpic', function *(next) {
    let pics = this.request.body
    let res = yield mongo.post.headerpic(pics)
    this.body = res
})

router.post('/overview/:title', function *(next) {
    let title = this.params.title
    let page = this.request.body
    let res = yield mongo.post.overview(title, page)
    this.body = res
})

/*
 * PUT
 */

router.put('/product/:proName', function *(next) {
    let proName = this.params.proName
    let pro = this.request.body
    let res = yield mongo.put.product({proName}, pro)
    this.body = res
})

/*
 * DELETE
 */

router.delete('/product/:proName', function *(next) {
    let {proClass, proName} = this.params
    let res = yield mongo.del.product({proName})
    this.body = res
})

module.exports = router
