const fetch = (method, url, data = null) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        if (['POST', 'PUT', 'DELETE'].includes(method)) {
            xhr.setRequestHeader('content-type', 'application/x-javascript')
            xhr.responseType = 'json'
        }
        xhr.onload = function (e) {
            res(this.response)
        }
        xhr.send(data ? JSON.stringify(data) : null)
    })
}

/*
 * 成功返回1，失败返回-1
 * login('123456', '/auth/login').then(res => {
 *  TODO...
 *  console.log(res)
 * })
 */
let login = (key, url = '/auth/login') => {
    return new Promise((res, rej) => {
        fetch('POST', url, {key})
        .then(body => {
            if (body.ok)
                res(1)
            else
                res(-1)
        })
    })
}

/*
 * 成功返回1，失败返回-1
 * islogin('/auth/islogin').then(res => {
 *  TODO...
 *  console.log(res)
 * })
 */
let islogin = (url = '/auth/islogin') => fetch('GET', url)
