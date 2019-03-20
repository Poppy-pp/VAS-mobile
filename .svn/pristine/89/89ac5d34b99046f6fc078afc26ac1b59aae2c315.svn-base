<!--* 
* @description: 维修报单（报单） 
* @author: 王鹏 corpid :wxb51aaeb1e86d07df
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
  <section class="wx-content-child pb10">
    <mt-search v-model="filters.search_key" :result.sync="filterResult" placeholder="请输入车牌号/车架号">
      <mt-cell
        v-for="item in searchCarResult"
        title="车架号"
        :value="item.value"
        @click.native="handleSelectVin(item)">
      </mt-cell>
    </mt-search>
    <div v-if="searchCarResult.length == 0">
      <div class="page-part" v-if="ruleForm.vehicleid">
        <mt-cell title="车型" :value="formInfo.car.model"></mt-cell>
        <mt-cell title="车架号" :value="formInfo.car.vin"></mt-cell>
        <mt-cell title="车牌" :value="formInfo.car.licenseplatenum"></mt-cell>
      </div>
       <div class="page-part" v-for="(item,index) in deviceData">
          <mt-checklist
            class="bg0"
            title=""
            v-model="checkedCities1[index].check"
            :options="[item]">
          </mt-checklist>
          <mt-cell title="维修原因" class="w100" v-if="checkedCities1[index].check.length != 0">
            <wxselect 
              :valuekey="valuekey"
              :isYcSearch="isYcSearch"
              :disabled="checkedCities1[index].check.length == 0"
              :index="item.packid"
              @changeCop="getFaultcodeInfo"
              @changeSelect="changeFaultcodeSelect">
            </wxselect>
          </mt-cell>
          <mt-cell title="设备类型" :value="item.prodspec" v-if="checkedCities1[index].check.length != 0"></mt-cell>
          <mt-cell title="设备型号" :value="item.prodmodel" v-if="checkedCities1[index].check.length != 0"></mt-cell>
          <mt-cell title="SIM卡号" :value="item.simnum" v-if="checkedCities1[index].check.length != 0"></mt-cell>
      </div>

      <div class="page-part">
        <mt-cell title="预约安装日期" class="w100">
          <i slot="icon" class="fcred">*</i>
          <input autocomplete="off" placeholder="请选择" onfocus='this.blur();' @click="$refs['aftersaledate'].open()" v-model="ruleForm.aftersaledate" type="text" class="wx-input">
        </mt-cell>
        <mt-cell title="安装地址" class="w100">
          <i slot="icon" class="fcred">*</i>
          <selectAddress @change="selectAddressChange"></selectAddress>
        </mt-cell>
        <mt-field label="详细地址" placeholder="请输入详细地址" @change="refmap" v-model="ruleForm.aftersaleaddress"></mt-field>
        <gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
      </div>

      <div class="page-part">
        <mt-field label="安装联系人" placeholder="请输入安装联系人" v-model="ruleForm.contactperson"></mt-field>
        <mt-field label="安装联系方式" placeholder="请输入安装联系方式" v-model="ruleForm.contactmobile"></mt-field>
        <mt-field label="备注" placeholder="请输入备注" type="textarea" rows="4" v-model="ruleForm.remark"></mt-field>
      </div>
      <div class="page-part" style="margin: 0 5px;">
        <mt-button type="primary"  @click="submitForm('ruleForm')" size="large">提交</mt-button>
      </div>
    </div>
    <mt-datetime-picker ref="aftersaledate"  
      :startDate="ruleForm.startDate"
      @confirm="handleChange"> 
    </mt-datetime-picker>
  </section>
</template>

<script>
  import util from '../../../common/js/util';
  import { getSearchVinNum,getCidSearchDevice,getFaultcodeInfo,startVindicate } from '../../../api/api';
  import { Indicator,Toast } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  import selectAddress from 'components/customComponents/selectAddress';
  import gdmap from 'components/map/gdmap';
  export default {
    components:{ wxselect,selectAddress,gdmap },
    data() {
      return {
        filters:{
          search_key:''
        },
        value1:[],
        valuekey:'dictdatavalue',
        isYcSearch:false,
        searchCarResult:[],
        formInfo:{
          car:{
            vin:'',
            num:'',
            model:''
          }
        },
        ruleForm:{
          startDate:new Date(),
          vehicleid:'',
          aftersaledate:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          aftersaleaddress:'',
          contactperson:'',
          contactmobile:'',
          aftersaleaddressCity:'',
          afterSaleDetails:[],
          remark:''
        },
        //控制设备返回对象数组
        checkedCities1:[],
        //控制设备信息是否展开
        checkedCities2:[],
        //存储选中设备维修信息需要提交到后台的信息
        checkedCities: [],
        deviceData:[],
      }
    },
    computed: {
      filterResult() {
        let queryString = this.filters.search_key,
        para = {
            key : $.trim(queryString.toUpperCase())?$.trim(queryString.toUpperCase()):"2"
        };
        if(!queryString){
          this.searchCarResult = [];
          return;
        };
        getSearchVinNum(para).then((res) => {
          if(res.data.result.code == 0){
            this.searchCarResult = res.data.data.records;
          }
        });
      }
    },
    watch:{
      checkedCities1:{
        handler(cval,oval){
          if(!cval) return;
          this.checkedCities = [];
          cval.forEach((item,index)=>{
            if(item.check.length > 0){
              let flag = false;
              if(this.checkedCities.length > 0){
                this.checkedCities.forEach((obj,ind)=>{
                  if(obj.packid != this.checkedCities2[item.index].packid){
                    flag = true;
                  }
                });
              }else{
                this.checkedCities.push({installid:this.checkedCities2[item.index].installid,packid:this.checkedCities2[item.index].packid});
              }
              if(flag) this.checkedCities.push({installid:this.checkedCities2[item.index].installid,packid:this.checkedCities2[item.index].packid});
            }
          });
        },
        deep:true
      }
    },
    methods: {
      //拖拽地图小点返回的地址
      draggerMapMarker(address,lnglatXY,type){
        this.ruleForm.aftersaleaddress = address;
      },
      //地址改变刷新地图坐标
      refmap(){
        this.$refs.vueAmap.geocoder(this.ruleForm.aftersaleaddress,(res)=>{
        });
      },
      //选择地址选择
      selectAddressChange(resw){
        this.$refs.vueAmap.geocoder(resw.split("/").join(""),(res)=>{
          this.ruleForm.aftersaleaddressCity = resw.split("/").join("");
        });
      },
      handleChange(value){
        this.ruleForm.aftersaledate = util.formatDate.format(new Date(value), 'yyyy-MM-dd hh:mm:ss');
      },
      //选择故障代码
      changeFaultcodeSelect(item,index){
        if(this.checkedCities)
        this.checkedCities.forEach((item1,index)=>{
          this.checkedCities[index].faultcode = item.dictdataname;
        });
      },
      //查询维修故障代码
      getFaultcodeInfo(r,callback){
        Indicator.open();
        getFaultcodeInfo().then((res)=>{
          Indicator.close();
          if(res.data.result.code == 0){
            callback(res.data.data.records)
          }
        });
      },
      //根据车架号/车牌号查询
      handleSelectVin(item){
        this.searchCarResult = [];
        //车信息
        this.formInfo.car.vin = item.vin;
        this.formInfo.car.num = item.licenseplatenum;
        this.formInfo.car.model = item.model;
        let para = {
          carid:item.id
        };
        this.ruleForm.vehicleid = item.id;
        Indicator.open();
        //设备信息
        getCidSearchDevice(para).then((res) => {
          Indicator.close();
          this.deviceData = [];
          this.checkedCities = [];
          this.checkedCities1 = [];
          this.checkedCities2 = [];

          if(res.data.result.code == 0){
            let data = res.data.data.records;
            if(data.length == 0){
              Toast({
                 message: '当前车辆没有安装任何设备！',
                 iconClass: 'f35 iconfont icon-cha'
              });
              return;
            }
            this.deviceData = data;
            this.deviceData.forEach((items,index)=>{
              this.checkedCities2.push({
                packid:items.packid,
                installid:items.installid,
                faultcode:''
              });
              this.checkedCities1.push({
                check:[],
                index:index,
                packid:res.packid,
                installid:res.installid
              });
              if(items.status != 'INSTALL'){
                 this.deviceData[index].disabled = true;
              }
              this.deviceData[index].label = items.prodnum+"("+ items.prodspec +"-"+items.prodmodel+")";
              this.deviceData[index].value = items.prodnum+"("+ items.prodspec +"-"+items.prodmodel+")";
            });
          }
        });
      },
      /* 提交表单数据 */
      submitForm(formName) {
        if(this.checkedCities.length == 0 ){
          Toast({
             message: '至少选择一个设备！',
             iconClass: 'f35 iconfont icon-cha'
          });
          return;
        }
        if(!this.ruleForm.aftersaleaddressCity){
          Toast("请选择安装地址");
          return;
        }
        // let user = JSON.parse(sessionStorage.getItem("user"));//2.7版本
        let user3 = JSON.parse(sessionStorage.getItem('user3'));//3.0版本
        let para = {
          // createby:user.id,//2.7版本
          // corpid:user.corporateInfo.id,
          createby:user3.userid,//3.0版本
          corpid:user3.corpid,
          vehicleid:this.ruleForm.vehicleid,
          aftersaledate:this.ruleForm.aftersaledate,
          aftersaleaddress:this.ruleForm.aftersaleaddress,
          contactperson:this.ruleForm.contactperson,
          contactmobile:this.ruleForm.contactmobile,
          remark:this.ruleForm.remark,
          afterSaleDetails:this.checkedCities
        };
        Indicator.open();
        startVindicate(para).then((res) => {
          Indicator.close();
          this.resetForm();
          if(res.data.result.code == 0){
            Toast({
               message: '维修订单提交成功！',
               iconClass: 'f35 iconfont icon-gou'
            });
          }

        }).catch((error) => {
            Indicator.close();
            this.resetForm();
        });
      },
      /* 重置表单数据 */
      resetForm(formName) {
        this.ruleForm = {//启动报单提交表单信息
          startDate:new Date(),
          vinnum:'',
          vehicleid:'',
          aftersaleaddressCity:'',
          aftersaledate:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          aftersaleaddress:'',
          contactperson:'',
          contactmobile:'',
          remark:'',
          afterSaleDetails:[]
        };
        this.deviceData = [];
        this.checkedCities = [];
        this.checkedCities1 = [];
        this.checkedCities2 = [];
      },
    },
  }
</script>