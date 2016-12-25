let myChart = echarts.init(document.getElementById('main'))
const colorConfig = {
    titleColor: '#fff',
    pointColor: '#eea638',
    pointSize: [6, 60],
    pointValue: {min: 1, max: 5}
}

let latlong = mapConfig.latlong
let mapData = [
    // {code: mapConfig.code['China'], name: 'product 1', value: 3, color: '#eea638'},
    {code: mapConfig.code['Russia'], name: 'product 1', value: 3},
]

mapData = mapData.filter((elem) => {
    if (!elem.code)
        console.log(`country name error, name: ${elem.name}`)
    if (!elem.color)
        elem.color = colorConfig.pointColor
    return elem.code
})

let option = {
    backgroundColor: '#404a59',
    title : {
        text: '111World Population (2011)',
        subtext: '111From Gapminder',
        left: 'center',
        top: 'top',
        textStyle: {
            color: colorConfig.titleColor
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
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series : [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: mapData.map(function (itemOpt) {
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
            })
        }
    ]
};

myChart.setOption(option)
myChart.on('click', (params) => {
    alert(params.name)
    console.log(params)
})
