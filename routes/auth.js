/*
 * 密码
 */
const key = ['123456', '30lin0834']

const router = require('koa-router')()

router.get('/islogin', function *(next) {
    this.body = this.session.log ? 1 : -1
})

router.post('/login', function *(next) {
    let data = this.request.body
    let ok = (!!data.key && key.includes(data.key))
    this.session.log = ok
    this.body = {ok}
})

module.exports = router
