<!--* 
* @description: 微信报单中心（报单） 
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
  <mt-cell title="客户名称" class="bimg_none w100">
    <wxselect 
      :valuekey="valueCorpkey"
      @changeCop="getCorp"
      @changeSelect="changeNBSelect">
    </wxselect>
  </mt-cell>
  <mt-cell title="受理银行" class="w100">
    <wxselect 
    :valuekey="valueReceivingbankKey"
    :isYcSearch="isYcReceivingbankSearch"
    @changeCop="changeReceivingbank"
    @changeSelect="changeBankSelect">
  </wxselect>
</mt-cell>
</div>

<div class="page-part bgfff p5">
  <div class="uploadDiv fL ml10">
    <upload @uploadSuccess="vinHandleAvatarSuccess" :src="uploadSrc" :name="name"></upload>
    <div class="btsty">车架号照片</div>
  </div>
  <div class="uploadDiv fL ml10">
    <upload @uploadSuccess="carNumHandleAvatarSuccess" :src="uploadSrc" :name="name"></upload>
    <div class="btsty">车牌号照片</div>
  </div>
  <div class="uploadDiv fL ml10">
    <upload @uploadSuccess="carMpHandleAvatarSuccess" :src="uploadSrc" :name="name"></upload>
    <div class="btsty">铭牌号照片</div>
  </div>
  <div class="uploadDiv fL ml10" v-for="(item,index) in ruleForm.pictures" v-if="index > 2">
    <upload @uploadSuccess="carHandleSuccess" :index="index" :imgSrc="item.piclink" :src="uploadSrc" :name="name"></upload>
    <div class="btsty flexSc">
       <wxselect 
        :valuekey="valueUploadKey"
        :isYcSearch="isYcUploadSearch"
        :defaultValue="item.picdesc"
        :index="index"
        @changeCop="changeCarPicLac"
        @changeSelect="changeCarPicSelect">
      </wxselect>
      <div class="bottom" v-if="index != ruleForm.pictures.length-1">
        <i class="iconfont icon-shanchu" @click="removeBusiPicture(index)" title="删除照片"></i>
      </div>
    </div>
  </div>
</div>

<template v-for="(item,index) in deviceCurData">
  <div class="page-part bgfff p5">
    <leftSlider :index="index" @deleteItem="deleteItem" :isOneReturn="isOneReturn" :isShow="isShowSlider">
      <mt-cell title="设备类型">{{ item.PRODSPEC }}</mt-cell>
      <mt-cell title="设备型号">{{ item.E_PRODMODEL }}</mt-cell>
      <mt-cell title="设备编号">{{ item.E_PRODUNUM }}</mt-cell>
      <mt-cell title="卡类型">{{ item.C_PRODMODEL }}</mt-cell>
      <mt-cell title="SIM卡号">{{ item.C_PRODUNUM }}</mt-cell>
      <mt-cell title="安装位置" class="w100">
        <wxselect 
          :valuekey="valueUploadKey"
          :isYcSearch="isYcUploadSearch"
          :index="index"
          @close="deviceClose"
          @changeCop="changeInstallDecode"
          @changeSelect="changeDeviceLocSelect">
          </wxselect>
      </mt-cell>
      <mt-cell title="设备是否在线">
        <mt-switch @change="deviChangeStatus(ruleForm.installDetails[index].tmpOnlinestatus,index)" v-model="ruleForm.installDetails[index].tmpOnlinestatus"></mt-switch>
      </mt-cell>
      </leftSlider>
  </div>

  <div class="page-part bgfff p5">
    <div class="uploadDiv fL ml10">
      <upload @uploadSuccess="deviveZxHandleAvatarSuccess" :pindex="index" :src="uploadSrc" :name="name"></upload>
      <div class="btsty">设备走线照片</div>
    </div>
    <div class="uploadDiv fL ml10">
      <upload @uploadSuccess="deviveSbhHandleAvatarSuccess" :pindex="index" :src="uploadSrc" :name="name"></upload>
      <div class="btsty">设备号照片</div>
    </div>
    <div class="uploadDiv fL ml10">
      <upload @uploadSuccess="deviveSbHandleAvatarSuccess" :pindex="index" :src="uploadSrc" :name="name"></upload>
      <div class="btsty">设备照片</div>
    </div>
    <div class="uploadDiv fL ml10" v-for="(item,ind) in ruleForm.installDetails[index].pictures" v-if="ind > 2">
      <upload @uploadSuccess="deviceHandleSuccess" :index="ind" :pindex="index" :imgSrc="ruleForm.installDetails[index].pictures[ind].piclink" :src="uploadSrc" :name="name"></upload>
      <div class="btsty flexSc">
         <wxselect 
          :valuekey="valueUploadKey"
          :isYcSearch="isYcUploadSearch"
          :defaultValue="item.picdesc"
          :index="ind"
          :pindex="index"
          @changeCop="changeCarPicLac"
          @changeSelect="changeDevPicSelect">
        </wxselect>
        <div class="bottom" v-if="(ind != ruleForm.installDetails[index].pictures.length-1)">
        <i class="iconfont icon-shanchu" @click="deviceRemoveBusiPicture(index,ind,ruleForm.installDetails[index].pictures[ind].piclink)" title="删除照片"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<wxselect :isbutton="isbutton" :butText="butText" @changeCop="searchDevceinfo" :valuekey="valueDevkey"
        :isYcSearch="isYcDevSearch" @changeSelect="changeDevSelect" @close="closeDev"></wxselect>
<div class="page-part">
  <mt-cell title="接入平台">
    <mt-switch v-model="ruleForm.hasPlat"></mt-switch>
  </mt-cell>
  <mt-cell title="平台名称" class="w100">
    <wxselect 
      :valuekey="valuePlatKey"
      :defaultValue="ruleForm.platname"
      :isYcSearch="isYcPlatSearch"
      :defaultDataArray="ruleForm.plat"
      @changeSelect="changePlatSelect">
      </wxselect>
  </mt-cell>
  <mt-field label="平台IP" disabled placeholder="请选择平台" v-model="ruleForm.platip"></mt-field>
  <mt-field label="备注" placeholder="请输入备注" type="textarea" rows="4" v-model="ruleForm.remark"></mt-field>
</div>
<div class="page-part" style="margin: 0 5px;">
  <mt-button type="primary"  @click="submitForm('ruleForm')" size="large">提交</mt-button>
  <mt-button size="large" @click="resetForm" class="mt10">清空</mt-button>
</div>

</section>
</template>

<script>
  import gdmap from 'components/map/gdmap';
  import util from '../../../common/js/util';
  import axios from 'axios';
  import {getModelListInfo1,getModelListInfo,searchCorpNameList,getProductModelClass,cldeviceIsOnstate,addApprovaperApply,addorderSupper,getCopNameBy,getCarPicLocation,getorderSupperDevice,getInstallPositionCode,getPlatList} from '../../../api/api';
  import { Indicator,Toast,MessageBox } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  import colorPicker from 'components/customComponents/colorPicker';
  import leftSlider from 'components/customComponents/leftSlider';
  import selectAddress from 'components/customComponents/selectAddress';
  import upload from 'components/customComponents/upload';
  export default {
    components:{wxselect,colorPicker,leftSlider,selectAddress,gdmap,upload},
    props:['startForm'],
    data() {
      return {
        isOneReturn:true,
        valuePlatKey:"platname",
        isYcPlatSearch:false,
        valueDevkey:'E_PRODUNUM',
        isYcDevSearch:false,
        isbutton:true,
        butText:"添加设备",
        valueUploadKey:'dictdatavalue',
        isYcUploadSearch:false,
        uploadSrc:'/vasms-web/atta/upload',
        name:'mediaFile',
        modelObj:'',
        isShowSlider:true,
        isYcDeviceSearch:false,
        valueCorpkey:'corpname',
        valuekey:"model",
        valueColorkey:"color",
        valueReceivingbankKey:"corpname",
        isYcSearch:true,
        isYcColorSearch:false,
        isYcReceivingbankSearch:false,
        dcolor:'#fff',
        deviceCurData:[],
        ruleForm:{
          platname:'',
          plat:[],
          model:'',
          color:'',
          vin:'',
          licenseplatenum:'',
          corpid:'',
          corpname:'',
          name:'',
          mobile:'',
          idcard:'',
          price:'',
          receivingbankid:'',
          receivingbankname:'',
          pictures:[
          {picdesc:"车架号",piclink:""},
          {picdesc:"车牌号",piclink:""},
          {picdesc:"铭牌号",piclink:""},
          {picdesc:"其它部分照片",piclink:""}
          ],
          hasPlat:true,
          platip:'',
          platnameId:'',
          licenseplatenum:'',
          vin:'',
          installDetails:[],
          platid:'',
          remark:''
        },
        tempModel:'',
        deviceData:'',
        firstAdd:false
      }
    },
    methods: {
      //设备是否在线
      deviChangeStatus(item,index){
        this.ruleForm.installDetails[index].onlinestatus = item?0:1;
      },
      //选择平台
      changePlatSelect(item){
        this.ruleForm.platid = item.ID;
        this.ruleForm.platip = item.platip;
      },
      closeDev(){
        this.firstAdd = false;
      },
      //选择设备
      changeDevSelect(row,index){
        if(!row) return;
        //判断设备是否已经存在 存在不在添加
        for(let i = 0,len = this.deviceCurData.length;i<len;i++){
          if(this.deviceCurData[i].E_PRODUNUM == row.E_PRODUNUM){
            return false;
          }
        }
        if(this.firstAdd){
          let len = this.deviceCurData.length-1;
          this.deviceCurData.splice(len,1,row);
          //添加设备信息
          this.ruleForm.installDetails.splice(len,1,{
            installpositioncode: null,
            packid: row.ID,
            E_PRODMODEL: row.E_PRODMODEL,
            E_PRODUNUM: row.E_PRODUNUM,
            pictures:[
              {picdesc:"设备走线照片",piclink:""},
              {picdesc:"设备照片",piclink:""},
              {picdesc:"设备号照片",piclink:""},
              {picdesc:"其它部分照片",piclink:""}
            ],
            onlinestatus:1,
            tmpOnlinestatus:false,
            installremark:null
          });
        }else{
          this.deviceCurData.push(row);
          //添加设备信息
          this.ruleForm.installDetails.push({
            installpositioncode: null,
            packid: row.ID,
            E_PRODMODEL: row.E_PRODMODEL,
            E_PRODUNUM: row.E_PRODUNUM,
            pictures:[
              {picdesc:"设备走线照片",piclink:""},
              {picdesc:"设备照片",piclink:""},
              {picdesc:"设备号照片",piclink:""},
              {picdesc:"其它部分照片",piclink:""}
            ],
            onlinestatus:1,
            tmpOnlinestatus:false,
            installremark:null
          });
        }
        this.cldeviceIsOnstate(row.E_PRODUNUM,this.deviceCurData.length - 1);
        this.firstAdd = true;
      },
      //查询设备信息
      searchDevceinfo(r,callback){
        let para = {
          search_key:r
        };
        Indicator.open();
        getorderSupperDevice(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            callback(res.data.data.records);
          }else{
            callback([]);
          }
        }).catch((error) => {
         Indicator.close();
       });
      },
      //安装位置初始化
      changeInstallDecode(r,callback){
        this.isShowSlider = false;
        Indicator.open();
        getInstallPositionCode().then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            callback(res.data.data.records);
          }
        });
      },
      //选择对应设备安装位置
      changeDeviceLocSelect(item,index){
        this.ruleForm.installDetails[index].installpositioncode = item.dictdataname;
      },
      //点击设备添加设备编辑
      deviceClickHandle(row, event, column){
        this.deviceCurData.push(row);
        //添加设备信息
        this.ruleForm.installDetails.push({
          installpositioncode: null,
          packid: row.ID,
          E_PRODMODEL: row.E_PRODMODEL,
          E_PRODUNUM: row.E_PRODUNUM,
          pictures:[
          {picdesc:"设备走线照片",piclink:""},
          {picdesc:"设备照片",piclink:""},
          {picdesc:"设备号照片",piclink:""},
          {picdesc:"其它部分照片",piclink:""}
          ],
          onlinestatus:1,
          tmpOnlinestatus:false,
          installremark:null
        });
        this.visible = false;
        this.cldeviceIsOnstate(row.E_PRODUNUM,this.deviceCurData.length - 1);
      },
      cldeviceIsOnstate(cnum,index){
        let para = {
          id : cnum
        };
        this.realTimeRefreshLoading = true;
        //添加设备自动识别是否在线
        cldeviceIsOnstate(para).then((res) => {
          this.realTimeRefreshLoading = false;
          this.ruleForm.installDetails[index].onlinestatus = res.data.online ? 0 : 1;
          this.ruleForm.installDetails[index].tmpOnlinestatus = res.data.online ? true : false;
        });
      },
      changeDevPicLac(){

      },
      //选择设备类型
      changeDevPicSelect(item,index,pindex){
        this.ruleForm.installDetails[pindex].pictures[index].picdesc =  item.dictdatavalue;
      },
      //选择照片类型
      changeCarPicSelect(item,index){
        this.ruleForm.pictures[index].picdesc = item.dictdatavalue;
      },
      //车架号
      vinHandleAvatarSuccess(file,response){
        this.installPic(response,4);
      },
      //车牌号
      carNumHandleAvatarSuccess(file,response){
        this.installPic(response,5);
      },
      //铭牌
      carMpHandleAvatarSuccess(file,response){
        this.installPic(response,6);
      },
      //车上传照片成功
      carHandleSuccess(file,response,index){
        this.installPic(response,1,index);
      },
      deviveZxHandleAvatarSuccess(file,response,index,pindex){
        this.installPic(response,7,index,pindex);
      },
      deviveSbhHandleAvatarSuccess(file,response,index,pindex){
        this.installPic(response,8,index,pindex);
      },
      deviveSbHandleAvatarSuccess(file,response,index,pindex){
        this.installPic(response,9,index,pindex);
      },
      //上传成功后的设备照片
      deviceHandleSuccess(file,response,index,pindex){
        this.installPic(response,2,index,pindex);
      },
      //删除订单图片
      removeBusiPicture(index){
        MessageBox.confirm('确认删除当前车辆照片吗?').then(action => {
          this.ruleForm.pictures.splice(index,1);
        });
      },
      //设备删除设备照片
      deviceRemoveBusiPicture(pind,cind,piclink){
        MessageBox.confirm('确认删除当前设备照片吗?').then(action => {
          this.ruleForm.installDetails[pind].pictures.splice(cind,1);
        });
      },
      //复制当前添加的 1车子 2设备照片 3删除对应设备照片 4车架号照片 5车牌号照片 6铭牌照片 7设备走线照片 8设备号 9设备照片
      installPic(response,type,index,pindex){
        //安装车照片
        if(type == 1 && response.status == 200){
          let carPictures = this.ruleForm.pictures;
          if(carPictures[index].piclink == ''){
            carPictures.push({picdesc:"其它部分照片",piclink:""});
          }
          carPictures.splice(index,1,{picdesc:carPictures[index].picdesc,piclink:response.data});
        }

        if(type == 4 && response.status == 200){
          this.ruleForm.pictures.splice(0,1,{picdesc:"车架号",piclink:response.data});
        }
        if(type == 5 && response.status == 200){
          this.ruleForm.pictures.splice(1,1,{picdesc:"车牌号",piclink:response.data});
        }
        if(type == 6 && response.status == 200){
          this.ruleForm.pictures.splice(2,1,{picdesc:"铭牌号",piclink:response.data});
        }

        //设备前三张
        if(type == 7 && response.status == 200){
          let pic = {
            picdesc:"设备走线照片",
            piclink:response.data
          }
          this.ruleForm.installDetails[pindex].pictures.splice(0,1,pic);
        }
        if(type == 8 && response.status == 200){
          let pic = {
            picdesc:"设备号照片",
            piclink:response.data
          }
          this.ruleForm.installDetails[pindex].pictures.splice(1,1,pic);
        }
        if(type == 9 && response.status == 200){
          let pic = {
            picdesc:"设备照片",
            piclink:response.data
          }
          this.ruleForm.installDetails[pindex].pictures.splice(2,1,pic);
        }
        //新增设备照片
        if(type == 2 && response.status == 200){
          let pic = {
            picdesc:this.ruleForm.installDetails[pindex].pictures[index].picdesc,
            piclink:response.data
          }
          if(this.ruleForm.installDetails[pindex].pictures[index].piclink == ''){
            this.ruleForm.installDetails[pindex].pictures.push({picdesc:"其它部分照片",piclink:""});
          }
          this.ruleForm.installDetails[pindex].pictures.splice(index,1,pic);
        }
      },
      //获取车辆上传照片位置
      changeCarPicLac(r,callback){
        let para = {
          showCount:1000
        }
        Indicator.open();
        getCarPicLocation(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            callback(res.data.data.records);
          }
        });
      },
      //获取客户公司列表
      getCorp(r,callback){
        let para = {
            showCount:1000
        }
        Indicator.open();
        getCopNameBy(para).then((res) => {
            Indicator.close();
            if(res.data.result.code == 0){
              let copName = res.data.data.records;
              if(copName[0].corptype == "WW"){
                copName.splice(0,1);
              }
              callback(copName);
            }
        });
      },
      //公司选择
      changeNBSelect(item){ 
        if(!item) return;
        this.ruleForm.corpid = item.id;
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
        this.deviceCurData.splice(index, 1);
        this.ruleForm.installDetails.splice(index, 1);
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
        this.tempModel = item.model;
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
      //如果照片上传link为空阻止上传
      picturesBuff(list){
        let temp = [];
        for(var i = 0,len = list.length;i < len;i++){
          if(list[i].piclink != ''){
            temp.push(list[i]);
          }
        }
        return temp;
      },
      /* 提交表单数据 */
      submitForm(formName) {
        if(!this.ruleForm.corpid){
          Toast("请选择客户名称");
          return;
        }
        if(this.tempModel != this.ruleForm.model){
          Toast("车型名称必须选择");
          return;
        }
        if(!this.checkPrice(this.ruleForm.price)) return;
        
        let _this = this,flag = true,
          para = {//拼接启动流程所需数据
            vehicleInfo:{
             ownerInfo:{
              idcard:_this.ruleForm.idcard,
              name:_this.ruleForm.name,
              mobile:_this.ruleForm.mobile,
            },
            model:_this.ruleForm.model,
            licenseplatenum:_this.ruleForm.licenseplatenum,
            color:_this.ruleForm.color,
            receivingbankid:_this.ruleForm.receivingbankid,
            vin:_this.ruleForm.vin?_this.ruleForm.vin.toUpperCase():_this.ruleForm.vin,
            price:_this.ruleForm.price
          },
          corpid:!isNaN(Number(_this.ruleForm.corpid))?_this.ruleForm.corpid:_this.ruleForm.corpname,
          installDetails:[],
          pictures:this.picturesBuff(_this.ruleForm.pictures),
          platid:_this.ruleForm.platid ? _this.ruleForm.platid : null,
          clerkremarks:_this.ruleForm.remark
        };
        _this.ruleForm.installDetails.forEach((res,index)=>{
          if(!res.installpositioncode){
            Toast('设备('+res.E_PRODMODEL+res.E_PRODUNUM+')没有选择安装位置')
            flag = false;
            return false;
          }else{
            let pics = res.pictures,tmp = [];
            para.installDetails.push({
              pictures:[],
              id:'',
              onlinestatus:'',
              packid:'',
              remark:'',
              installpositioncode:''
            });
            if(pics.length < 3){
              Toast('设备('+res.E_PRODMODEL+res.E_PRODUNUM+')的照片必须上传三张');
              flag = false;
              return false;
            }
            pics.forEach((pic,index)=>{
              if(pic.piclink != ''){
                tmp.push({picdesc:pic.picdesc,piclink:pic.piclink});
              }
            });
            para.installDetails[index].pictures = tmp;
            para.installDetails[index].onlinestatus = res.onlinestatus;
            para.installDetails[index].packid = res.packid;
            para.installDetails[index].remark = res.remark;
            para.installDetails[index].installpositioncode = res.installpositioncode;
          }
        });
        Indicator.open();
        addorderSupper(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            Toast({
              message: '新装补登提交成功',
              iconClass: 'f35 iconfont icon-gou'
            });
            this.resetForm();
          }
        }); 
      },
      /* 重置表单数据 */
      resetForm() {
         this.ruleForm = {//启动报单提交表单信息
          model:'',
          color:'',
          vin:'',
          licenseplatenum:'',
          name:'',
          mobile:'',
          corpid:'',
          idcard:'',
          price:'',
          receivingbankid:'',
          receivingbankname:'',
          pictures:[
          {picdesc:"车架号",piclink:""},
          {picdesc:"车牌号",piclink:""},
          {picdesc:"铭牌号",piclink:""},
          {picdesc:"其它部分照片",piclink:""}
          ],
          hasPlat:'1',
          platip:'',
          platnameId:'',
          licenseplatenum:'',
          vin:'',
          installDetails:[],
          platid:'',
          remark:''
        };
        this.deviceCurData = [];
      },
        /*平台——下拉*/
      platChange(){
        Indicator.open();
        getPlatList().then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
              this.ruleForm.plat = res.data.data.records;
              this.ruleForm.platid = this.ruleForm.plat[0].ID;
              this.ruleForm.platip = this.ruleForm.plat[0].platip;
              this.ruleForm.platname = this.ruleForm.plat[0].platname;
          }
        });
      }
    },
    created(){
      //新报补登 默认初始化平台
      this.platChange();
    }
  }
</script>