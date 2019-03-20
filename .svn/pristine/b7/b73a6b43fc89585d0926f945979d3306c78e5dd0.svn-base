<!--* 
* @description: 服务器检测
* @author: chen 
* @update:   
*-->
<template>
    <div id="servicestatus" >
      <table id="servicename" style="border:1px solid gray;margin:0 auto;margin-top:10%;font-size:12px;text-align:center;">
        <tr>
          <th class="bl">服务器名称</th>
          <th class="bl">服务名称</th>
          <th class="bl">当前状态</th>
          <th class="bl" >操作</th>
        </tr>
        <tbody></tbody>
      </table>
    </div>
</template>

<style type="text/css">
  .bl{
   border:1px solid gray
  }
  /*.singleclick{
    background-color: white;
    border: 0
  }*/
  th {
    background: #333;
    color: white;
    font-weight: bold;
    height:45px
  }
  tr{
     height:45px
  }
  tr:nth-of-type(odd) { 
      background: #eee; 

  }

    .singleclick{
          position: relative;
          color: rgba(255,255,255,1);
          text-decoration: none;
          background-color: rgba(219,87,5,1);
          font-family: 'Yanone Kaffeesatz';       
          display: block;
          padding: 10px;
          width: 100%;
          height:100%;
          font-size: 15px
    }

  /*  .servicename{
      border: 0
    }*/

</style>
<script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<script>
    import Messaging from "static/js/mqttws31";
    import treeCarFromMqtt from "static/js/treeCarFromMqtt";
    import { MessageBox } from 'mint-ui';
    import {gis} from "../../../api/api";
    import {getservicelist} from "../../../api/api";
   // import jquery from "static/js/jquery";
    
    var host = "139.219.109.157";
   // var host = "192.168.0.61";
    var port = 61623;
    var mqttClient = null;
    var loginUserId = 'monitor';
    var clientuuid = loginUserId;
    var _t=this;

    export default {
         
        props:["echarts"],
        data() {
            return {
              mapMove: null
            }
        },
        methods: {   
         
        createtable:function(){
          let that=this;
           getservicelist().then((result) => {   
            result.data.data.forEach((item,index)=>{  
           // var obj =eval('(' + item.servicelst + ')');
            var list=item.servicelst;
            for(var k = 0; k <list.length; k++) {
              var tbody="<tr>"+
                 "<td style='border:0px solid gray;width:32%' >"+item.servername+"</td>"+               
                 "<td style='border:0px solid gray;width:33%'>"+
                 "<input type='hidden' value='"+list[k].servicenameen+"'>"+
                 "<span  class='servicename'>"+list[k].servicenamecn+"</span></td>"+
                 "<td style='border:0px solid gray;width:15%;color:green' class='status'>正常</td>"+
                 "<td style='border:0px solid gray;width:20%;text-align: center;'><button class='singleclick'>重启</button></td>"+                  
                 "</tr>";
                  $("#servicename tbody").append(tbody); 
             }
            });
          });
          
        }, 
      /* rowspan:function(tb,row,col) { //封装的一个JQuery小插件
       //setTimeout(function () {
        var value=""; 
        var pos=1; 
        for(var i=row;i<tb.rows.length;i++){ 
            value = tb.rows[i].cells[col].innerText; 
            if(lastValue == value){ 
                tb.rows[i].deleteCell(col); 
                tb.rows[i-pos].cells[col].rowSpan = tb.rows[i-pos].cells[col].rowSpan+1; 
                pos++; 
            }else{ 
              lastValue = value; 
              pos=1; 
             } 
           }
       // },1);
      },*/
      createMQTTClient:function() {
        console.log(4444);
          let _this = this;
          
          if (mqttClient != null) return;
          mqttClient = new Messaging.Client(host, port, loginUserId);
          //事件
          mqttClient.onMessageArrived = function (message) {
          console.log(message);     

             if(message.destinationName=='servicestatus'){
              var msg=message.payloadString;
              var status;
              var obj =eval('(' + msg + ')'); //由JSON字符串转换为JSON对象
              

                /*    var tbody="<tr>"+
                       "<td style='border:0px solid gray;width:32%'>"+obj.servername+"</td>"+
                       "<td style='border:0px solid gray;width:33%'><span  class='servicename'>"+obj.servicename+"</span></td>"+
                       "<td style='border:0px solid gray;width:15%'>"+status+"</td>"+
                       "<td style='border:0px solid gray;width:20%;text-align: center;'><button class='singleclick'>重启</button></td>"+ 
                       "</tr>";*/
                  let that=this,flag = false;
                  $.each($("#servicename tbody").find("tr"),function(index,item){
                    let p = $(this).find("td");
                    if( obj.servicenamecn!=null){
                      console.log($(p[0]).text() == obj.servicenamecn && $(p[1]).text()==obj.servername);
                      if($(p[0]).text() == obj.servername && $(p[1]).text()==obj.servicenamecn){
             
                         if(obj.status==0){
                              $(p[2]).text("正常");
                              $(p[2]).css("color","green");
                           }  
                         if(obj.status==1){
                            //status="异常";//红色
                             $(p[2]).text("异常");
                             $(p[2]).css("color","red");
                         }  
                         if(obj.status==2){
                            $(p[2]).text("启动中");
                             $(p[2]).css("color","black");
                         } 
                         
                         //console.log($(p[2]));
                        
                         /*flag = false;*/
                        return false;
                      }
                      /*else{
                        flag = true;
                      }*/
                    }
                  });
                  
           } 
      };
      mqttClient.onConnectionLost = function (responseObject) {
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
              },600000);  
          }       
      };
          //链接
          mqttClient.connect({
              userName: "admin",
              password: "password",
              onSuccess: function (frame) {
                  console.log('connect success');
                  mqttClient.subscribe("servicestatus");   

                  //
                  mqttClient.subscribe("chenpan"); 
                  mqttClient.subscribe("operatecommand"); 

                  _this.sendMessageToMqttServer("chenpan","22222");
              },
              onFailure: function (failure) {
                  console.log(failure.errorMessage);
                  //10秒后重新连接
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
        sendMessageToMqttServer:function(destinationName,topicName) {
          var objStr = JSON.stringify({
                  clientid: clientuuid,
                  topicname: topicName
              });
              var msg = new Messaging.Message(objStr);
              msg.destinationName = destinationName;
              //msg.qos = 0;
              mqttClient.send(msg);
              
              console.log(destinationName + "-" + objStr);
          } ,

          sendMessageTooperatecommandServer:function(destinationName,topicName) {

          var objStr = JSON.stringify({
                  cmdcode: 0,
                  servicenamecn:topicName.name,
                  servername:topicName.servername,
                  cmdcreateby:topicName.userid.toString()
              });
              var msg = new Messaging.Message(objStr);
              msg.destinationName = destinationName;
              //msg.qos = 0;
              mqttClient.send(msg);
              
              console.log(destinationName + "-" + objStr);
          } ,
             
       },
      mounted(){ 
         let _this = this;
          $("#servicename tbody").on("click","button.singleclick",function(e){
              MessageBox.confirm('确定执行此操作?').then(action => {
              let name = $(this).parent().prev().prev().text(),
                  servername = $(this).parent().prev().prev().prev().text(),
                  userid,
                  msg;
               let   user = JSON.parse(sessionStorage.getItem("user"));
                     msg={name:name,servername:servername,userid:user.employeeInfo.ID}
              
              _this.sendMessageTooperatecommandServer("operatecommand",msg);


             /* var tab=document.getElementById('servicename');
               console.log(tab);
               _this.rowspan(tab,0,0);*/
               //alert("成功！！！！"+name);
           });
          }) 

           $("#servicename").on("click","span.servicename",function(e){      
                let name = $(this).parent().prev().text();
                let servicename = $(this).prev().val();
                let servicenamecn = $(this).parent().text();

                console.log(servicenamecn);
                 _this.$router.push({path:'/pagehistory',query:{name:name,servicename:servicename,servicenamecn:servicenamecn}});
           });

            
        
      },
       created: function () {
           let _this = this;
          //当页面窗口发生变化的时候 重绘echarts图表           
            this.$nextTick(function () {
              _this.createtable();
             // _this.createMQTTClient();                
                
           });  


    
          window.onresize = function () {
          setTimeout(()=>{
            _this.mapMove.resize();
          },50);

        }
      } 
    }
</script>