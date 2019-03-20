<!--* 
* @description: 车辆在线
* @author: chen 
* @update:   
*-->
<template>
    <div id="currentstatus" style="width:100%;height:500px;"></div>
</template>
<script>
    import {carCount} from "../../../api/api";
    import {onlinecount} from "../../../api/api";
    import Messaging from "static/js/mqttws31";
   // import treeCarFromMqtt from "static/js/treeCarFromMqtt";
    
    var host = "139.219.109.157";
   // var host = "192.168.0.61";
    var port = 61623;
    var mqttClient = null;
    var loginUserId = 'monitor';
    var clientuuid = loginUserId;

    export default {
        props:["echarts"],
        data() {
            return {
              mapMove: null
            }
        },
        methods: {  
           
          createMQTTClient:function() {
              let _this = this;
              _this.mapMove = _this.echarts.init(document.getElementById('currentstatus'));
              let cartotel=[] ,times=[] ,online=[],carcount=0,startvalue=0,endvalue=0;
              var myChart = _this.mapMove;

              if (mqttClient != null) return;
              mqttClient = new Messaging.Client(host, port, loginUserId);
              //事件
             mqttClient.onMessageArrived = function (message) {
                console.log(message);
               // if(message.destinationName!='onlinecount'){
               carCount().then((result) => {    
               carcount= result.data.data; 
               onlinecount().then((result) => {   
                  result.data.data.forEach((item,index)=>{    
                    cartotel.push(carcount);
                    times.push(item.itemdate);
                    online.push(item.itemvalue);
                }); 
                if(message.destinationName=='onlinecount'){
                  var msg=message.payloadString;
                  var obj =eval('(' + msg + ')'); //由JSON字符串转换为JSON对象      
                    cartotel.push(carcount);
                    times.push(obj.servertime);
                    online.push(obj.onlinecount);

                 }
                 startvalue=times[times.length-1];
                 if(times.length>=60){
                  endvalue=times[times.length-60];
                 }
                else{
                    endvalue=times[times.length-2];
                }
                //startcount=times.length;
               
                 var option = {
                    title: {
                        text: '设备在线',
                       // subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                   calculable : true,
                    legend: {
                        data:['Growth'],
                        itemGap: 5
                    },
                    grid: {
                        top: '12%',
                        left: '1%',
                        right: '10%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: times,
                         axisLabel:{
                         /*   interval:0,//横轴信息全部显示  
                            rotate:130,//-30度角倾斜显示  */
                          // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                          formatter: function (value, index) {                                                
                              return value.split(' ')[1];
                          },
                        },
                    },
                    yAxis: {
                        type: 'value',                        
                        axisLabel: {
                           // formatter: '{value} W',
                            interval:0,//横轴信息全部显示  
                            rotate:10,//-30度角倾斜显示  
                            formatter: function (value) {                                 
                                return value/10000+"W";                           
                          }
                        },
                        axisPointer: {
                            snap: true
                        }
                    },
                /*    smooth:true,*/
                 
                    dataZoom: [
                      {
                          show: true,
                          realtime: false,
                          startValue: startvalue,
                          endValue: endvalue,
                          start:100,
                          end:80
                      },                               
                      {
                          show: false,
                          yAxisIndex: 0,
                          filterMode: 'empty',
                          width: 100,
                          height: '100%',
                          showDataShadow: false,
                          left: '100%',

                      }
                    ],
                    series: [
                        {
                            name:'在线数',
                            type:'line',
                            smooth: true,
                            data: online,
                        
                        },
                        {
                            name:'总设备数',
                            type:'line',
                            smooth: true,
                            data:cartotel 
                           
                        }
                    ]
                 };

                 /*myChart.on('dataZoom', function (params) {
                  console.log(params);
                 });
                         */                             
                if (option && typeof option == "object") {                  
                    myChart.setOption(option, true);
                }
             });  
            });      
           //}                
          };
          mqttClient.onConnectionLost = function (responseObject) {
              console.log(responseObject);
              if (responseObject.errorCode != 0) {
                  console.log(mqttClient.clientId + '断开连接,错误码' + responseObject.errorCode);
                  
                  //10秒后重新连接
                  console.log('重新连接......2');
                  mqttClient = null;
                  setTimeout(function () {
                      if (mqttClient == null) {
                          //新建一个
                           clientuuid = loginUserId ;
                          _this.createMQTTClient();
                      }
                  },100000);  
              }       
          };
          //链接
          mqttClient.connect({
              userName: "admin",
              password: "password",
              onSuccess: function (frame) {
                  console.log('connect success');
                  mqttClient.subscribe("onlinecount");   

                  //
                  mqttClient.subscribe("chenpan"); 

                  _this.sendMessageToMqttServer("chenpan","2222222");
              },
              onFailure: function (failure) {
                  //链接标识
                  console.log('重新连接......1');
                  mqttClient = null;
                  setTimeout(function () {
                      if (mqttClient == null) {
                          //新建一个
                           clientuuid = loginUserId ;
                           _this.createMQTTClient();
                      }
                  }, 100000);
              },
              cleanSession:true
          });
        },
        sendMessageToMqttServer(destinationName,topicName) {
          var objStr = JSON.stringify({
                clientid: clientuuid,
                  topicname: topicName
              });
              var msg = new Messaging.Message(objStr);
              msg.destinationName = destinationName;
              //msg.qos = 0;
              mqttClient.send(msg);
              
              console.log(destinationName + "-" + objStr);
          }         
      },
       created: function () {
          let _this = this;
          //当页面窗口发生变化的时候 重绘echarts图表           
           this.$nextTick(function () {
            //  this.findDeclarationInstallNumber();
              this.createMQTTClient();
           });  

          window.onresize = function () {
          setTimeout(()=>{
            _this.mapMove.resize();
          },50);

        }
      } 
    }
</script>