# get

## url: /auth/islogin

@return
```
已登陆返回1
未登陆返回-1
```

----

## url: /api/sitemap

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

## url: /api/lineup/{proClass}

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

## url: /api/product/{proClass}/{proName}

@return:
```

```

## url: /api/headerpics

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

## url: /api/overview/{title}

@return:
```
成功返回
[
    ...
]

错误返回-1
```