const Schemas = {
    'demos': {
        tags: Array,
        arrs: [
            {
                name: String
            }
        ]
    },

    'overviews': {
        title: {type: String, unique: true},
        // 页面内容
        page: [
            /*
            {
                // 块样式类型
                blockType: String,
                content: Array
            }
            */
        ]
    },

    'products': {
        // 产品类型
        proClass: {type: String, required: true},
        // 产品子类型
        proSubClass: String,
        // 产品名称
        proName: {type: String, unique: true, required: true},
        area: String,
        // lineup页面中的缩略图, 为DataURL
        briefPic: String,
        // 页面内容
        page: [

            /*
            {
                // 块样式类型
                blockType: {type: String, required: true},
                content: Array
            }
            */
        ]
    },

    'headerpics': {
        // 首页轮播图，仅用一个数组条目存储
        pics: []
    }
}

module.exports = Schemas
