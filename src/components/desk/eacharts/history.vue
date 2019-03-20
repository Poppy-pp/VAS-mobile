<!--* 
* @description: 超速
* @author: chen 
* @update:   
*-->
<template>
  
    <div id="history" style="width:100%;height:500px;margin-left:5px"></div>
</template>
<script>
    import {getGisMonitorService} from "../../../api/api";

    export default {
        props:["echarts"],
        data() {
            return {
              mapMove: null
            }
        },
        methods: {
         
         findMileage:function(){
          let _this = this;
           this.mapMove = this.echarts.init(document.getElementById('history'));
                   let statustime=[],statusname=[],name="",
                       servernamecn=this.$route.query.name,
                       servicename=this.$route.query.servicename,
                       servicenamecn=this.$route.query.servicenamecn;
                       name=servicenamecn+"/"+servernamecn;
                  var res={
                    servernamecn:servicename,
                    servicename:servernamecn
                  }
                  
                 getGisMonitorService(res).then((result) => {                  
                     result.data.data.forEach((item,index)=>{     
                     statustime.push(item.statustime);                
                     statusname.push(item.status);
                  }); 

                  var myChart = this.mapMove;
           
                  var option = {
                        title: {
                            text: name+' 历史状态'
                        },
                        tooltip: {
                            trigger: 'axis', 
                            formatter: function(datas) 
                            {
                                var res = datas[0].name + '<br/>', val;
                                for(var i = 0, length = datas.length; i < length; i++) {
                                    if(datas[i].value==0){
                                       val = '正常'
                                    }
                                     else if(datas[i].value==1){
                                       val = '异常'
                                    }
                                     else if(datas[i].value==2){
                                       val = '启动中'
                                    }
                                     
                                      res += datas[i].seriesName + '：' + val + '<br/>';
                                  }
                                  return res;
                             }
                        },
 
                        legend: {
                            //data:['Step Start',]
                        },
                        /*grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: false
                        },*/
                        toolbox: {
                          show: false,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: statustime,
                             axisLabel:{
                              /*interval:0,//横轴信息全部显示  
                              rotate:50,//-30度角倾斜显示  */
                          // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                              formatter: function (value, index) {                                                
                                  return value.split(' ')[1];
                              },
                            },
                        },
                        yAxis: {
                            type: 'value',
                             axisLabel:{
                              min:0,
                              max:2,
                              interval:0,//横轴信息全部显示  
                              rotate:-55,//-30度角倾斜显示  
                              formatter: function (value) {
                                    var texts = [];
                                    if(value==0){
                                     texts.push('正常');
                                    }
                                    else if (value ==1) {
                                     texts.push('异常');
                                    }
                                    else if (value== 2) {
                                     texts.push('启动中');
                                    }                                     
                                    return texts;

                              }
                          }
                        },
                        
                      dataZoom: [
                        {
                             
                            show: true,
                            realtime: false,
                            start: 100,
                            end: 20
                        },                               
                        {
                            show: false,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 100,
                            height: '100%',
                            showDataShadow: false,
                            left: '100%'
                        }
                      ],
                        series: [
                            {
                                name:name,
                                type:'line',
                                step: 'start',
                                data:statusname
                            }
                        ]
                    };
              if (option && typeof option === "object") {
                   myChart.setOption(option, true);
              }
            }); 
          }
        },
        created: function () {
          let _this;
          //当页面窗口发生变化的时候 重绘echarts图表
            _this = this;
             this.$nextTick(function () {
                   this.findMileage();
             });  
            window.onresize = function () {
            setTimeout(()=>{
              _this.mapMove.resize();
            },50);
          }
          
        },
       mounted(){
           
         
        } 
    }
</script>