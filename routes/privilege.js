const privilege = {
    'get': [
        'index'
    ],
    'post': [
    
    ],
    'put': [
    
    ],
    'delete': [
    
    ]
}

const is = function (name, type) {
    return privilege[type] && privilege[type].includes(name)
}

module.exports = is
