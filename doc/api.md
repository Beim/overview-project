# get

## url: `/auth/islogin`

@param: ()

@return
```
已登陆返回1
未登陆返回-1
```

----

## url: `/api/sitemap`

@param: ()

@return:
```
{
    "overviews": [
        {
            "title": "company Overview"
        },
        {
            "title": "Message"
        },
        {
            "title": "Global network"
        },
        {
            "title": "Our business networks"
        }
    ],
    "products": {
        "Marine Products": [
            {
                "proClass": "Marine Products",
                "proSubClass": "Marine Product",
                "proName": "School Whiting"
            },
            {
                "proClass": "Marine Products",
                "proSubClass": "Marine Product",
                "proName": "King Crab"
            },
            {
                "proClass": "Marine Products",
                "proSubClass": "Shrimp",
                "proName": "wild brown shrimp"
            },
            {
                "proClass": "Marine Products",
                "proSubClass": "Shrimp",
                "proName": "magadas rouge premium"
            }
        ]
    }
}
```

----

## url: `/api/lineup/{proClass}`

@param: ()

@return:
```
[
    {
        "_id": "5838142f5c56645911b0f4b8",
        "proSubClass": "Marine Product",
        "proName": "School Whiting",
        "briefPic": "dataURL"
    },
    {
        "_id": "5838142f5c56645911b0f4ba",
        "proSubClass": "Marine Product",
        "proName": "King Crab",
        "briefPic": "dataURL"
    },
    {
        "_id": "5838142f5c56645911b0f4bc",
        "proSubClass": "Shrimp",
        "proName": "wild brown shrimp",
        "briefPic": "dataURL"
    },
    {
        "_id": "5838142f5c56645911b0f4be",
        "proSubClass": "Shrimp",
        "proName": "magadas rouge premium",
        "briefPic": "dataURL"
    }
]
```

----

## url: `/api/product/{proClass}/{proName}`

@param: proClass String; proName String;

@return:
```

```

## url: `/api/headerpics`

@param:

@return:
```
[
    'dataUrl1',
    'dataUrl2',
    'dataUrl3',
    'dataUrl4'
]
```

----

# post

----

## url: `/auth/login`

@param: data Object;
```
data = {key: '123456'}
```

@return:
```
{
    ok: 成功为true，失败false
}
```

----

## url: `/api/product`

@param: product Object;

@return:
```
成功返回1，出错返回-1
```

## url: `/api/headerpics`

@param: pics Array;

@return
```
成功返回1，出错返回-1
```

----

# put

----

# delete

----

## url: `/api/product/{proClass}/{proName}`

@param: ()

@return:
```
成功返回1，出错返回-1
```
