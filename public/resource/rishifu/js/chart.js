const userConfig = {
    titleColor: '#696969',
    pointColor: 'black',
    specialPointColor: 'blue',
    pointSize: [8, 20],
    pointValue: {min: 1, max: 5},
    backgroundColor: '#F5F5DC',
    text: '上海日仕福公司 生产及采购网络',
    subtext: '下图显示了上海日仕福公司全球生产及采购网络，在某地区生产采购点越多则圆圈越大，可以点击查看详细信息',
    areaColor: '#FFEC8B',
    borderColor: '#ccc',
    pointerAreaColor: 'lightblue',
}


let myChart = echarts.init(document.getElementById('main'))
mapConfig.cton = {}
for (let i in mapConfig.code) {
    mapConfig.cton[mapConfig.code[i]] = i
}

const makeMap = (codes) => {
    let code = {}
    for (let item of codes) {
        if (code[item.code]) {
            code[item.code].count++
        }
        else {
            code[item.code] = {count: 1}
        }
        if (!item.defaultColor) {
            code[item.code].color = userConfig.specialPointColor
        }
    }
    let mapData = []
    for (let i in code) {
        mapData.push({
            code: i,
            name: mapConfig.cton[i],
            value: code[i].count,
            color: code[i].color ? code[i].color : userConfig.pointColor
        })
    }
    return mapData
}

const makeOption = (mapData) => {
    const colorConfig = {
        titleColor: userConfig.titleColor,
        pointColor: userConfig.pointColor,
        pointSize: userConfig.pointSize,
        pointValue: userConfig.pointValue
    }
    
    let latlong = mapConfig.latlong
    
    mapData = mapData.filter((elem) => {
        if (!elem.code)
            console.log(`country name error, name: ${elem.name}`)
        if (!elem.color)
            elem.color = colorConfig.pointColor
        return elem.code
    })
    
    let option = {
        backgroundColor: userConfig.backgroundColor,
        title : {
            text: userConfig.text,
            subtext: userConfig.subtext,
            left: 'center',
            top: 30,
            itemGap:30 ,
            textStyle: {
                color: colorConfig.titleColor,
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: params => params.name
        },
        visualMap: {
            show: false,
            min: colorConfig.pointValue.min,
            max: colorConfig.pointValue.max,
            inRange: {
                symbolSize: colorConfig.pointSize
            }
        },
        geo: {
            name: 'World Population (2010)',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: userConfig.areaColor,
                    borderColor: userConfig.borderColor
                },
                emphasis: {
                    areaColor: userConfig.pointerAreaColor
                }
            }
        },
        series : [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: mapData.map(function (itemOpt) {
                    if (!itemOpt.code || itemOpt.code == 'null') {
                        return {}
                    }
                    else {
                        return {
                            name: itemOpt.name,
                            value: [
                                latlong[itemOpt.code].longitude,
                                latlong[itemOpt.code].latitude,
                                itemOpt.value
                            ],
                            itemStyle: {
                                normal: {
                                    color: itemOpt.color
                                }
                            }
                        };
                      
                    }
                })
            }
        ]
    };
    return option
}

/*
 * 传入地区信息，更新地图
 * @param codes Array
 */
const makeChart = (codes) => {
    let mapData = makeMap(codes)
    myChart.setOption(makeOption(mapData))
}

makeChart([])

/*
myChart.on('click', (params) => {
    alert(params.name)
    console.log(params)
})

setTimeout(() => {
    let codes = [
        {
            code: 'CN',
            defaultColor: 0
        },
        {
            code: 'CN',
            defaultColor: 1
        },
        {
            code: 'RU',
            defaultColor: 1
        },
        {
            code: 'AF',
            defaultColor: 1
        },
        {
            code: 'AF',
            defaultColor: 1
        },
        {
            code: 'AF',
            defaultColor: 1
        },
        {
            code: 'AF',
            defaultColor: 1
        },
    ]
    makeChart(codes)
}, 1000)
*/
