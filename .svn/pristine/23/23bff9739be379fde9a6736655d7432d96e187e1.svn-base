import Messaging from "static/js/mqttws31";
//import treeCarFromMqtt from "static/js/treeCarFromMqtt";

var host = "139.219.109.157";
var port = 61623;
var mqttClient = null;
var loginUserId = 'monitor';
var clientuuid = loginUserId + "_" + uuid(15, 30);
var _this=this;
var connect=null;

export default { 
    createMQTTClient() {
        if (mqttClient != null) return;
           mqttClient = new Messaging.Client(host, port, loginUserId);
        //事件
        mqttClient.onMessageArrived = function (message) {
            console.log(54545454);
            //console.log(message);
            //var entity = eval("(" + message.payloadString.replace("null", "") + ")");
            //var entity = eval("(" + message.payloadString + ")");
            //判断主题数据
           // initCompanyGroup();
            /*switch (entity.topicmodel) {
                //case 0: initCompanyGroup(entity.data); break;
                case 1: initCompanyGroupStatistics(entity.data); break;
                
            }*/
             this.connect=message;
             console.log(this.connect);
        };
        mqttClient.onConnectionLost = function (responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log(mqttClient.clientId + '断开连接,错误码' + responseObject.errorCode);
                //链接标识
                $("#connectMqttState").css("color", "#31302e").attr("title", "连接已断开，自动重连中...");
                //10秒后重新连接
                console.log('重新连接......');
                mqttClient = null;
                setTimeout(function () {
                    if (mqttClient == null) {
                        //新建一个
                        clientuuid = loginUserId + "_" + uuid(15, 30);
                        _this.createMQTTClient();
                    }
                },10000);  
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

                sendMessageToMqttServer("chenpan","2222222");
            },
            onFailure: function (failure) {
                console.log(failure.errorMessage);
                //链接标识
                $("#connectMqttState").css("color", "#31302e").attr("title", "连接已断开，自动重连中...");
                //10秒后重新连接
                console.log('重新连接......');
                mqttClient = null;
                setTimeout(function () {
                    if (mqttClient == null) {
                        //新建一个
                        clientuuid = loginUserId + "_" + uuid(15, 30);
                        _this.createMQTTClient();
                    }
                }, 10000);
            },
            cleanSession:true
        });
    } 
     

 };
    //创建标识符
    function  uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
     //给服务器发送消息
    function sendMessageToMqttServer(destinationName,topicName) {
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

   