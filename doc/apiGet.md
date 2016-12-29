# get

## url: /auth/islogin

@return
```
已登陆返回1
未登陆返回-1
```

----

## url: /api/product/{proName}

@return
```
成功返回
[
  {
    "proClass": "product1",
    "proSubClass": "product1",
    "proName": "productA",
    "area": "BZ",
    "briefPic": "dataURL",
    "page": [
      1,
      2,
      3
    ]
  }
]
不存在返回空数组[]
错误返回-1
```

----

## url: /api/sitemap

@param: ()

@return:
```
成功返回Object：
{
  "product1": [
    "productB",
    "productA"
  ],
  "product2": [
    "productC",
    "productD"
  ]
}

错误返回-1
```

----

## url: /api/lineup/{proClass}

@return:
```
成功返回
[
  {
    "proName": "productB",
    "briefPic": "dataURL"
  },
  {
    "proName": "productA",
    "briefPic": "dataURL"
  }
]
无数据为空数组
失败返回-1
```

----

## url: /api/headerpic

@return:
```
成功返回Array：
[
    'dataUrl1',
    'dataUrl2',
    'dataUrl3',
    'dataUrl4'
]
错误返回-1
```

----

## url: /api/overview/{title}

@return:
```
成功返回Array：
[
    ...
]

错误返回-1
```
