<!--* 
* @description: 历史状态
* @author: chen 
* @update: chen  
*-->

  <template>

         <div>
              <span  id="upperleve" style="font-size:20px">上一级</span>  
             <history ref="history" :echarts="echarts"></history> 
        </div>

</template>

<script>
  import echarts from 'echarts';
  import 'echarts/map/js/china';
 
  import history from './eacharts/history';//历史状态状态
  
 
  export default {
    components:{history},
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
             var _this=this;
              $("#upperleve").on("click",function(e){ 
                _this.$router.back(-1);        
              });
        
             
            // console.log(this.getQueryString("model"));
            if(this.getQueryString("model")!=null){
                this.activeNames=this.getQueryString("model");
            }

            //this.$router.back(-1);
           
             
           
          }
      }
</script>