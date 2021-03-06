const print_j = (obj, space = 4) => console.log(JSON.stringify(obj, null, space))
const fs = require('fs')
const path = require('path')
const ACCOUNT = require('./account.json')
const SCHEMAS = require('./Schemas.js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise // Use native promises

// 连接数据库
mongoose.connect(`mongodb://${ACCOUNT.username}:${ACCOUNT.pwd}@127.0.0.1:27017/${ACCOUNT.db}`)
const db = mongoose.connection
db.on('error', (err) => console.log('CONNECTION ERROR: ' + error))
db.once('open', () => console.log('------数据库连接成功！------'))

// 存储name对应的schema和model
const models = {}
for (let name in SCHEMAS) { 
    let schema = mongoose.Schema(SCHEMAS[name])
    models[name] = {
        schema,
        model: mongoose.model(name, schema)
    }
}

/*
 * 获取model
 * @param name String
 * @return <Model>
 */
const gmodel = (name) => {
    if (!models[name]) {
        throw 'Model 不存在'
    }
    return models[name].model
}

const log = (...args) => {
    let logfile = path.resolve(__dirname, '../log/mongo-log.txt')
    let date = new Date().toLocaleString()
    let str = args.join('\n')
    let msg = `${date}\n${str}\n\n`
    fs.writeFile(logfile, msg, {flag: 'a'}, (err) => {
        if (err) console.log(err)
    })
}

exports.get = {
    // 返回sitemap所需要的标题信息
    sitemap: () => {
        return new Promise((resolve, reject) => {
            gmodel('products').find({}, {proClass: 1, proName: 1, _id: 0})
            .then(docs => {
                resolve(docs)
            })
            .catch(e => {
                log('get-sitemap-error', e)
                resolve(-1)
            })
        })
    },

    // 返回lineup界面需要的产品信息
    productLineup: (proClass) => {
        return new Promise((resolve, reject) => {
            gmodel('products').find({proClass}, {proClass: 0, proSubClass: 0, _id: 0, __v: 0})
            .then((docs) => {
                resolve(docs)
            })
            .catch((e) => {
                log('get-productLineup-error', e)
                resolve(-1)
            })
        })
    },

    // 返回轮播图数组
    // 若不存在则返回4个元素为空字符串的数组
    headerpic: () => {
        return new Promise((resolve, reject) => {
            gmodel('headerpics').find()
            .then((docs) => {
                if (docs[0]) {
                    resolve(docs[0].pics)
                }
                else {
                    let arr = ['', '', '', '']
                    resolve(arr)
                }
            })
            .catch(e => {
                log('get-headerpic-error', e)
                resolve(-1)
            })
        })
    },

    // 返回overview 的title 对应的page 信息
    overview: (title) => {
        return new Promise((resolve, reject) => {
            gmodel('overviews').find({title}, 'title page')
            .then((docs) => {
                if (docs[0])
                    resolve(docs[0].page)
                else
                    resolve(-1)
            })
            .catch((e) => {
                log('get-overview-error', e)
                resolve(-1)
            })
        })
    },

    product: (proName) => {
        return new Promise((resolve, reject) => {
            gmodel('products').find({proName}, {_id: 0, __v: 0})
            .then(docs => {
                resolve(docs)
            })
            .catch(e => {
                log('get-product-error', e)
                resolve(-1)
            })
        })
    },

    worldmap: () => {
        return new Promise((resolve, reject) => {
            gmodel('products').find({}, {proClass: 1, proName: 1, briefPic: 1, area: 1, _id: 0})
            .then(docs => {
                resolve(docs)
            })
            .catch(e => {
                log('get-worldmap-error', e)
                resolve(-1)
            })
        })
    },

    products: (limits, parse = {_id: 0, __v: 0}) => {
        return new Promise((resolve, reject) => {
            gmodel('products').find(limits, parse)
            .then(docs => {
                resolve(docs)
            })
            .catch(e => {
                log('get-products-error', e)
                resolve(-1)
            })
        })
    }
}

// 提交内容
exports.post = {

    // 上传产品
    product: (pro) => {
        return new Promise((resolve, reject) => {
            gmodel('products').create(pro)
            .then((docs) => {
                resolve(1)
                // resolve(docs)
            })
            .catch((e) => {
                log('post-product-error: ', e)
                resolve(-1)
            })
            
        })
    },

    // 上传主页轮播图
    headerpic: (pics) => {
        return new Promise((resolve, reject) => {
            gmodel('headerpics').find()
            .then((docs) => {
                // 存在则更新
                if (docs[0] && docs[0].pics) {
                    let old_pics = JSON.parse(JSON.stringify(docs[0].pics))
                    pics.forEach((v, i) => {
                        if (pics[i]) 
                            old_pics[i] = pics[i]
                    })
                    docs[0].pics = old_pics
                    docs[0].save().then((r) => {
                        resolve(1)
                    }).catch(e => {
                        log('post-headerpic-savedoc-error', e)
                        resolve(-1)
                    })
                }
                // 不存在则新建
                else {
                    gmodel('headerpics').create({pics}).then(r => {
                        resolve(1)
                    }).catch(e => {
                        log('post-headerpic-create-error', e)
                        resolve(-1)
                    })
                }
            })
            .catch((e) => {
                log('post-headerpic-error: ', e)
                resolve(-1)
            })
        })
    },

    // 上传/更新 title对应的page
    overview: (title, page) => {
        return new Promise((resolve, reject) => {
            gmodel('overviews').find({title})
            .then(docs => {
                if (docs[0] && docs[0].page) {
                    docs[0].page = page
                    docs[0].save()
                }
                else {
                    gmodel('overviews').create({title, page})
                }
                resolve(1)
            })
            .catch(e => {
                log('post-overview-error: ', e)
                resolve(-1)
            })
        })
    }


}

// 更新内容
exports.put = {
    // 更新产品
    product: (limit, pro) => {
        return new Promise((resolve, reject) => {
            gmodel('products').find(limit)
            .then(docs => {
                if (docs[0]) {
                    for (let i in pro) {
                        docs[0][i] = pro[i]
                    }
                    docs[0].save()
                    resolve(1)
                }
                else {
                    log('put-product-find-error', JSON.stringify(limit))
                    resolve(-1)
                }
            })
            .catch(e => {
                log('put-product-error', e)
                resolve(-1)
            })
        })
    }
}

// 删除内容
exports.del = {
    // 删除产品
    product: (limit) => {
        return new Promise((resolve, reject) => {
            gmodel('products').remove(limit)
            .then((docs) => {
                resolve(1)
                // resolve(docs)
            })
            .catch((e) => {
                log('del-product-error', e)
                resolve(-1)
            })
        })
    }
}

// exports.get['sitemap']()
// exports.get['productLineup']('Marine Products')


let products = [
    {
        proClass: 'product1',
        proSubClass: 'product1',
        proName: 'productB',
        area: 'BZ',
        briefPic: 'dataURL',
        page: [
            1,
            2,
            3
        ]
    },
    {
        proClass: 'product1',
        proSubClass: 'product1',
        proName: 'productA',
        area: 'BZ',
        briefPic: 'dataURL',
        page: [
            1,
            2,
            3
        ]
    },
    {
        proClass: 'product2',
        proSubClass: 'product2',
        proName: 'productC',
        area: 'BZ',
        briefPic: 'dataURL',
        page: [
            1,
            2,
            3
        ]
    },
    {
        proClass: 'product2',
        proSubClass: 'product2',
        proName: 'productD',
        area: 'BZ',
        briefPic: 'dataURL',
        page: [
            1,
            2,
            3
        ]
    },
    {
        proClass: 'product3',
        proSubClass: 'product3',
        proName: 'productE',
        area: 'BZ',
        briefPic: 'dataURL',
        page: [
            1,
            2,
            3
        ]
    },
]

let overviews = [
    {
        title: 'company Overview',
        page: [
        ]
    },
    {
        title: 'Message',
        page: [
        ]
    },
    {
        title: 'Global network',
        page: [
        ]
    },
    {
        title: 'Our business networks',
        page: [
        ]
    },
]

/*
gmodel('overviews').create(overviews)
.then((dos) => {
    console.log('created overviews')
})

gmodel('products').create(products)
.then((docs) => {
    console.log('created products')
})
*/


/*
gmodel('overviews').create({name: 'haha'}).then((doc) => {
    console.log('created: ')
    console.log(doc)
})
*/


/*
let kittySchema = mongoose.Schema({
    name: String
})
*/

/*
let Kitten = mongoose.model('Kitten', kittySchema)
let silence = new Kitten({name: 'Silence'})
*/

/*
kittySchema.methods.speak = function () {
    let greeting = this.name ? `Meow name is ${this.name}` : `I dont have a name`
    console.log(greeting)
}

let Kitten = mongoose.model('Kitten', kittySchema)
let fluffy = new Kitten({name: 'fluffy'})
*/

/*
fluffy.save((err, fluffy) => {
    if (err) return console.error(err)
    fluffy.speak()
})
*/

/*
Kitten.find().then((doc) => {
    console.log(doc)
})

Kitten.remove().then(() => {
    console.log('removed')
})

Kitten.create({name: 'lalala'}).then((e) => {
    console.log(e)
    console.log('created')
})
*/
