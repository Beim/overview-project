const print_j = (obj, space = 4) => console.log(JSON.stringify(obj, null, space))
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

exports.get = {
    // 返回sitemap所需要的标题信息
    sitemap: () => {
        return new Promise((resolve, reject) => {
            let p1 = gmodel('overviews').find({}, {title: 1, _id: 0})
            let p2 = gmodel('products').find({}, {proClass: 1, proSubClass: 1, proName: 1, _id: 0})

            Promise.all([p1, p2])
            .then(([docs1, docs2]) => {
                let products = {}
                for (let item of docs2) {
                    if (!products[item.proClass]) {
                        products[item.proClass] = [item]
                    }
                    else {
                        products[item.proClass].push(item)
                    }
                }
                let result = {
                    overviews: docs1,
                    products
                }
                resolve(result)
            })
            .catch((e) => {
                reject(e)
            })
        })
    },

    // 返回lineup界面需要的产品信息
    productLineup: (proClass) => {
        return new Promise((resolve, reject) => {
            gmodel('products').find({proClass}, 'proSubClass proName briefPic')
            .then((docs) => {
                resolve(docs)
            })
            .catch((e) => {
                reject(e)
            })
        })
    }
}

// 提交内容
exports.post = {
    
}

// 更新内容
exports.put = {
    
}

// 删除内容
exports.del = {
    
}

// exports.get['sitemap']()
// exports.get['productLineup']('Marine Products')


let products = [
    {
        proClass: 'Marine Products',
        proSubClass: 'Marine Product',
        proName: 'School Whiting',
        area: 'Brazil',
        briefPic: 'dataURL',
        page: [
            {
                blockType: 0,
                content: [
                    'aaa',
                    'bbb'
                ]
            }
        ]
    },
    {
        proClass: 'Marine Products',
        proSubClass: 'Marine Product',
        proName: 'King Crab',
        area: 'Brazil',
        briefPic: 'dataURL',
        page: [
            {
                blockType: 0,
                content: [
                    'aaa',
                    'bbb'
                ]
            }
        ]
    },
    {
        proClass: 'Marine Products',
        proSubClass: 'Shrimp',
        proName: 'wild brown shrimp',
        area: 'Canada',
        briefPic: 'dataURL',
        page: [
            {
                blockType: 0,
                content: [
                    'aaa',
                    'bbb'
                ]
            }
        ]
    },
    {
        proClass: 'Marine Products',
        proSubClass: 'Shrimp',
        proName: 'magadas rouge premium',
        area: 'Mexico',
        briefPic: 'dataURL',
        page: [
            {
                blockType: 0,
                content: [
                    'aaa',
                    'bbb'
                ]
            }
        ]
    },
]


let overviews = [
    {
        title: 'company Overview',
        page: [
            {
                blockType: 0,
                content: [
                    'aaaaaaa',
                    'bbbbbb'
                ]
            }
        ]
    },
    {
        title: 'Message',
        page: [
            {
                blockType: 0,
                content: [
                    'aaaaaaa',
                    'bbbbbb'
                ]
            }
        ]
    },
    {
        title: 'Global network',
        page: [
            {
                blockType: 0,
                content: [
                    'aaaaaaa',
                    'bbbbbb'
                ]
            }
        ]
    },
    {
        title: 'Our business networks',
        page: [
            {
                blockType: 0,
                content: [
                    'aaaaaaa',
                    'bbbbbb'
                ]
            }
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
