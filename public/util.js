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
