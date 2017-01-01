const router = require('koa-router')()

router.get('/', function *(next) {
    this.redirect("/rishifu/index.html")
})

module.exports = router
