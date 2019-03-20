<!--* 
* @description:新建安装单
* @author: 王鹏 corpid :wxb51aaeb1e86d07df
* @update: 王鹏 (2017-05-27 10:55) 
*-->

<template>
  <section class="wx-content-child pb10">
    <div class="page-part">
      <mt-field label="车主姓名" placeholder="请输入车主姓名" v-model="ruleForm.name"></mt-field>
      <mt-field label="车主电话" placeholder="请输入车主电话" type="tel" v-model="ruleForm.mobile"></mt-field>
      <mt-field label="车主身份证号" placeholder="请输入车主身份证号" v-model="ruleForm.idcard"></mt-field>
    </div>
    <div class="page-part">
      <mt-field label="车架号" placeholder="请输入车架号" v-model="ruleForm.vin"></mt-field>
      <mt-cell title="车型" class="w100">
        <i slot="icon" class="fcred">*</i>
        <wxselect 
        :valuekey="valuekey"
        :isYcSearch="isYcSearch"
        @changeCop="changeCop"
        @changeSelect="changeSelect">
      </wxselect>
    </mt-cell>
    <mt-cell title="车辆颜色" class="w100">
      <wxselect 
      :valuekey="valueColorkey"
      :isYcSearch="isYcColorSearch"
      @changeCop="changeColor"
      @changeSelect="changeColorSelect">
    </wxselect>
    <colorPicker :defaultColor="ruleForm.color"></colorPicker>
  </mt-cell> 
  <mt-field label="车牌号" placeholder="请输入车牌号" v-model="ruleForm.licenseplatenum"></mt-field>
  <mt-field label="车价(元)" placeholder="请输入车辆购置价" type="number" v-model="ruleForm.price"></mt-field>
  <mt-cell title="受理银行" class="w100">
    <wxselect 
    :valuekey="valueReceivingbankKey"
    :isYcSearch="isYcReceivingbankSearch"
    @changeCop="changeReceivingbank"
    @changeSelect="changeBankSelect">
  </wxselect>
</mt-cell>
</div>
<div class="page-part">
  <mt-cell title="是否有盗抢险">
    <mt-switch @change="hasthefChange" v-model="ruleForm.hastheftinsurance">{{ ruleForm.hastheftinsurance?"有":"没有" }}</mt-switch>
  </mt-cell>
  <template v-for="(item,index) in ruleForm.prodclass">
    <leftSlider class="mt5" :index="index" :size="ruleForm.prodclass.length" @deleteItem="deleteItem" :isShow="isShowSlider">
      <mt-cell title="安装设备类别" class="w100">
        <wxselect 
        :isYcSearch="isYcDeviceSearch"
        :hiddenSearch="true"
        :disabled="(index == 0 && ruleForm.hastheftinsurance == 1)"
        :defaultValue="ruleForm.prodclass[index].installtype"
        :index="index"
        @changeCop="changeDevice"
        @close="deviceClose"
        @changeSelect="changeDeviceSelect">
      </wxselect>
    </mt-cell>
    <mt-field :label="(index == 0 && ruleForm.hastheftinsurance)?'安装保险设备数量':'安装常规设备数量'" :disabled="(index == 0 && ruleForm.hastheftinsurance == 1)" placeholder="请输入数字" type="number" v-model="ruleForm.prodclass[index].applynum"></mt-field>
  </leftSlider>
</template>
<mt-button size="large" @click="addRow" class="mt5">添加设备</mt-button>
</div>

<div class="page-part">
  <mt-cell title="预约安装日期" class="w100">
    <i slot="icon" class="fcred">*</i>
    <input autocomplete="off" placeholder="请选择" onfocus='this.blur();' @click="$refs['installapplydate'].open()" v-model="ruleForm.installapplydate" type="text" class="wx-input">
  </mt-cell>
  <mt-cell title="安装地址" class="w100">
    <i slot="icon" class="fcred">*</i>
    <selectAddress @change="selectAddressChange"></selectAddress>
  </mt-cell>
  <mt-field label="详细地址" placeholder="请输入详细地址" @change="refmap" v-model="ruleForm.installaddress"></mt-field>
  <gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
</div>

<div class="page-part">
  <mt-field label="安装联系人" placeholder="请输入安装联系人" v-model="ruleForm.contactperson"></mt-field>
  <mt-field label="安装联系方式" placeholder="请输入安装联系方式" v-model="ruleForm.contactmobile"></mt-field>
  <mt-field label="业务员" placeholder="请输入业务员" v-model="ruleForm.salername"></mt-field>
  <mt-field label="业务员联系方式" placeholder="请输入业务员联系方式" v-model="ruleForm.salermobile"></mt-field>
  <mt-field label="备注" placeholder="请输入备注" type="textarea" rows="4" v-model="ruleForm.remark"></mt-field>
</div>
<div class="page-part" style="margin: 0 5px;">
  <mt-button type="primary"  @click="submitForm('ruleForm')" size="large">提交</mt-button>
  <mt-button size="large" @click="resetForm" class="mt10">清空</mt-button>
</div>
<mt-datetime-picker ref="installapplydate" 
  :startDate="ruleForm.startDate" 
  @confirm="handleChange"> 
</mt-datetime-picker>

</section>
</template>

<script>
  import gdmap from 'components/map/gdmap';
  import util from '../../../common/js/util';
  import {getModelListInfo1,getModelListInfo,searchCorpNameList,getProductModelClass,addApprovaperApply,runProc} from '../../../api/api';
  import { Indicator,Toast } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  import colorPicker from 'components/customComponents/colorPicker';
  import leftSlider from 'components/customComponents/leftSlider';
  import selectAddress from 'components/customComponents/selectAddress';
  export default {
    components:{wxselect,colorPicker,leftSlider,selectAddress,gdmap},
    props:['startForm'],
    data() {
      return {
        modelObj:'',
        isShowSlider:true,
        isYcDeviceSearch:false,
        valuekey:"model",
        valueColorkey:"color",
        valueReceivingbankKey:"corpname",
        isYcSearch:true,
        isYcColorSearch:false,
        isYcReceivingbankSearch:false,
        dcolor:'#fff',
        ruleForm:{
          startDate:new Date(),
          model:'',
          color:'',
          vin:'',
          licenseplatenum:'',
          name:'',
          mobile:'',
          idcard:'',
          price:'',
          lng:0,
          lat:0,
          receivingbankid:'',
          receivingbankname:'',
          salername:'',
          salermobile:'',
          contactmobile:'',
          contactperson:'',
          hastheftinsurance:0,
          installapplydate:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          installaddresscode:'',
          installaddress:'',
          installapplyinsu:0,
          remark:'',
          prodclass:[{installtype:'无线',applynum:1}]
        }
      }
    },
    methods: {
      //验证车价(只能输入数字)
      checkPrice(value){
        var reg = /^\+?[1-9][0-9]*$/,
        flag = reg.test(value);
        if(!flag){
          Toast({
            message: '车价只能为整数!',
            iconClass: 'f35 iconfont icon-cha'
          });
          return false;
        }
        return true;
      },
      //地址改变刷新地图坐标
      refmap(){
        this.$refs.vueAmap.geocoder(this.ruleForm.installaddress,(res)=>{
          this.ruleForm.lng = res.location.lng;
          this.ruleForm.lat = res.location.lat;
        });
      },
      handleChange(value){
        this.ruleForm.installapplydate = util.formatDate.format(new Date(value), 'yyyy-MM-dd hh:mm:ss');
      },
      //拖拽地图小点返回的地址
      draggerMapMarker(address,lnglatXY,type){
        this.ruleForm.installaddress = address;
      },
      //选择地址选择
      selectAddressChange(resw){
        this.$refs.vueAmap.geocoder(resw.split("/").join(""),(res)=>{
          this.ruleForm.lng = res.location.lng;
          this.ruleForm.lat = res.location.lat;
          this.ruleForm.installaddresscode = resw.split("/").join("");
        });
      },
      //关闭设备选择窗体 回调
      deviceClose(){
        this.isShowSlider = true;
      },
      //选择设备类型
      changeDeviceSelect(item,index){
        this.ruleForm.prodclass[index].installtype = item;
      },
      //选择设备
      changeDevice(s,callback){
        this.isShowSlider = false;
        Indicator.open();
        getProductModelClass().then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
           callback(res.data.data);
         }
       });
      },
      //删除设备
      deleteItem(index){
        this.ruleForm.prodclass.splice(index,1);
      },
      //添加一行设备类型数量 选择
      addRow(){
        this.ruleForm.prodclass.push(
        {
          installtype:'无线',
          applynum:1
        }
        );
      },
      //改变是否有保险
      hasthefChange(val){
        let res = !val?1:0;
        this.ruleForm.installapplyinsu = res;
        if(res == 1){
          this.ruleForm.prodclass.splice(0,0,{installtype:'保险设备',applynum:1});
        }else{
          this.ruleForm.prodclass.splice(0,1);
          if(this.ruleForm.prodclass.length == 0){
            this.ruleForm.prodclass.push({installtype:'无线',applynum:1});
          }
        }
      },
      //查看车型列表
      changeCop(searchkey,callback){
        let para = {
          _viewName:"VW_VAS_WEB_VAS_VEHICLE_MODEL",
          showCount:30,
          model:searchkey
        };
        Indicator.open();
        getModelListInfo1(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
           callback(res.data.data.records);
         }
       });
      },
      //选择车型
      changeSelect(item){
        this.modelObj = item;
        this.ruleForm.model = item.model;
      },
      //查询对应车型颜色
      changeColor(s,callback){
        this.ruleForm.color = '';
        let item = this.modelObj;
        if(!item){
          callback([]);
          return;
        };
        let para = {
          _viewName:"VW_VAS_WEB_VAS_VEHICLE_COLOR",
          showCount:100,
          brand:item.brand,
          serious:item.serious,
          model:item.model
        };
        Indicator.open();
        getModelListInfo(para).then((res) => {
          let carModelList = [];
          Indicator.close();
          res.data.data.records.forEach((res,index)=>{
            if(res.color){
             res.color.split(";").forEach((color,index)=>{
               carModelList.push(
                {color:color,color_rgb:res.color_rgb.split(";")[index]}
                );
             });
           }
         });
          callback(carModelList);
        });
      },
      //选择颜色
      changeColorSelect(item){
        this.ruleForm.color = item.color_rgb;
      },
      //查询受理银行
      changeReceivingbank(s,callback){
        let para = {
          corptype:'BANK',
          showCount:1000
        };
        Indicator.open();
        searchCorpNameList(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            callback(res.data.data.records)
          }
        });
      },
      changeBankSelect(item){
        this.ruleForm.receivingbankid = item.id;
      },
      /* 提交表单数据 */
      submitForm(formName) {
        if(!this.startForm.corpid){
          Toast("请选择客户名称");
          return;
        }
        if(!this.ruleForm.model){
          Toast("车型名称必须选择");
          return;
        }
        if(this.ruleForm.hastheftinsurance == 1 && this.ruleForm.receivingbankid == ''){
          Toast("有盗抢险必须选择受理银行");
          return;
        }
        if(this.ruleForm.installapplyinsu == 0 && this.ruleForm.prodclass.length == 0){
          Toast("请选择安装设备");
          return;
        }
        if(!this.ruleForm.installaddresscode){
          Toast("请选择安装地址");
          return;
        }
        if(!this.checkPrice(this.ruleForm.price)) return;
        let _this = this,para,
        prodclass = [];
        if(_this.ruleForm.installapplyinsu == 1) {
          _this.ruleForm.prodclass.forEach((item,index)=>{
            if(index != 0) prodclass.push(item);
          });
        }else{
          prodclass = _this.ruleForm.prodclass;
        }
        para = {//拼接启动流程所需数据
          ownerInfo:{
            idcard:_this.ruleForm.idcard,
            name:_this.ruleForm.name,
            mobile:_this.ruleForm.mobile,
          },
          vehicleInfo:{
            model:_this.ruleForm.model,
            licenseplatenum:_this.ruleForm.licenseplatenum,
            color:_this.ruleForm.color,
            receivingbankid:!isNaN(Number(_this.ruleForm.receivingbankid))?_this.ruleForm.receivingbankid:_this.ruleForm.receivingbankname,
            vin:_this.ruleForm.vin?_this.ruleForm.vin.toUpperCase():_this.ruleForm.vin,
            price:_this.ruleForm.price,
            hastheftinsurance:_this.ruleForm.hastheftinsurance
          },
          declaretype:_this.startForm.declaretype,
          declareby:_this.startForm.declareby,
          corpid:_this.startForm.corpid,
          salername:_this.ruleForm.salername,
          salermobile:_this.ruleForm.salermobile,
          contactmobile:_this.ruleForm.contactmobile,
          contactperson:_this.ruleForm.contactperson,
          installapplydate:_this.ruleForm.installapplydate,
          installapplyinsu:_this.ruleForm.installapplyinsu,
          installaddresscode:_this.ruleForm.installaddresscode,
          installaddress:_this.ruleForm.installaddress,
          remark:_this.ruleForm.remark,
          prodclass:prodclass
        };
        runProc(para).then((res) => {
          if(res.data.result.code == 0){
            this.resetForm();
            Toast({
              message: '新装报单成功',
              iconClass: 'f35 iconfont icon-gou'
            });
          }
        }); 
      },
      /* 重置表单数据 */
      resetForm() {
        this.ruleForm = {//启动报单提交表单信息
          startDate:new Date(),
          model:'',
          color:'',
          vin:'',
          licenseplatenum:'',
          name:'',
          mobile:'',
          idcard:'',
          price:'',
          lng:0,
          lat:0,
          receivingbankid:'',
          receivingbankname:'',
          salername:'',
          salermobile:'',
          contactmobile:'',
          contactperson:'',
          hastheftinsurance:0,
          installapplydate:util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          installaddresscode:'',
          installaddress:'',
          installapplyinsu:0,
          remark:'',
          prodclass:[{installtype:'无线',applynum:1}]
        };
      }
    }
  }
</script>