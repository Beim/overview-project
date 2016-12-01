const router = require('koa-router')()
const path = require('path')
const DB = path.resolve(__dirname, '../db/mongo.js')
const mongo = require(DB)

router.get('/', function *(next) {
    this.body = 'Hello World@'
})

router.get('/sitemap', function *(next) {
    this.body = yield mongo.get.sitemap()
})

router.get('/lineup/:proClass', function *(next) {
    let proClass = this.params.proClass
    let docs = yield mongo.get.productLineup(proClass)
    this.body = docs
})

router.get('/product/:proClass/:proName', function *(next) {
    let proClass = this.params.proClass
    let proName = this.params.proName
})

module.exports = router
