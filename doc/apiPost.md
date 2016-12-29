# post

----

## url: /auth/login

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

## url: /api/product

@param: product Object;

@return:
```
成功返回1，出错返回-1(可能原因：proName 重复)
```

## url: /api/headerpic

@param: pics Array;

@return
```
成功返回1，出错返回-1
```

## url: /api/overview/{title}

@param: page Array;

@return
```
成功返回1，出错返回-1
```

----

# put

## url: /api/product/{proName}

@param: pro Object

@return
```
成功返回1；出错返回-1(可能原因：proName 不存在)
```

----

# delete

## url: /api/product/{proName}

@return
```
成功返回1；出错返回-1
```
