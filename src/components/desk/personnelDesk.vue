<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update: chen  
*-->

  <template>
         <div  style="">
           <currentstatus ref="currentstatus" :echarts="echarts" v-if="activeNames == '1'"></currentstatus>  
           <servicestatus ref="servicestatus" :echarts="echarts" v-if="activeNames == '2'"></servicestatus> 
           <span id="jvm" ></span>
        </div>

</template>


<style type="text/css">
  #jvm{
    display: block ;
    margin-left: 6%;
    text-indent:23%;
  }

</style>
<script>
  import {getVasServiceStatus} from "../../api/api";//vas状态
  import echarts from 'echarts';
  import 'echarts/map/js/china';
  
 
  import currentstatus from './eacharts/currentstatus';//当前状态
  import servicestatus from './eacharts/servicestatus';//服务器状态
 
  export default {
    components:{currentstatus,servicestatus},
    data() {
      return {
               echarts:echarts,               
               selected:"1",
               pickerVisible:false,
               activeNames:"0"
           }
         },
         methods: {
              getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
              },
              openPicker() {
                this.$refs.picker.open();
              },
              handleConfirm(date){
                console.log(date)
              },

          },
          created(){
            this.activeNames=0
          },
          mounted(){
              getVasServiceStatus().then((result) => {  
                var jvmStartTime,//启动时间
                    jvmVersion,//版本
                    jvmName,//名称
                    processId,//当前进程ID
                    osName,//操作系统
                    osVersion,//操作系统版本
                    totalPhysicalMenory,//机器总内存（MB）
                    freePhysicalMenory,//机器已使用内存(MB)
                    freePhysicalMenoryRatio,//可用内存占比
                    processors,//CPU内核
                    systemUpTime//系统正常运行时间
                let data= result.data.data;

                /*"</br>进程ID："+data.processId+*/
                  $("#jvm").append("VAS系统参数"+"</br>名称："+data.jvmName+"</br>操作系统："+data.osName+"</br>操作系统版本："+data.osVersion+"</br>启动时间："+ data.jvmStartTime+ "</br>版本："+data.jvmVersion+"</br>机器总内存（MB）："+data.totalPhysicalMenory+
                    "</br>机器已使用内存(MB)："+data.freePhysicalMenory+"</br>可用内存占比："+data.freePhysicalMenoryRatio+"</br>CPU内核："+data.processors
                    +"</br>系统正常运行时间："+data.systemUpTime
                    );
                 /*result.data.data.forEach((item,index)=>{ 
                  console.log(item);

                });*/
              });

            if(this.getQueryString("model")!=null){
               this.activeNames=this.getQueryString("model");
            }
            
          }
      }
</script>