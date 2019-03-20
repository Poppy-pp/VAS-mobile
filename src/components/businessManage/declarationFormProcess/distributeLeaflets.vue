<!--* 
* @description: 微信报单中心（报单） 
* @author: 王鹏 corpid :wxb51aaeb1e86d07df
* @update: 王鹏 (2017-05-27 10:55) 
*-->

<template>
  <section class="wx-content-child">
  <div class="page-part">
    <mt-cell title="报单类型">
      {{ ruleFormStatic.declaretype }}
    </mt-cell>
    <mt-cell title="客户名称">
    <span v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname }}</span>
    </mt-cell>
    </div>

    <div class="page-part">
      <mt-cell title="报单备注" v-if="ruleFormStatic.flowData">
        {{ ruleFormStatic.flowData.apply_remark }}
      </mt-cell>
      <mt-cell title="派单备注" v-if="ruleFormStatic.flowData">
      <span>{{ ruleFormStatic.flowData.verify_remark }}</span>
      </mt-cell>
      <mt-cell title="施工备注" v-if="ruleFormStatic.flowData">
      <span>{{ ruleFormStatic.flowData.work_remark }}</span>
      </mt-cell>
      <mt-cell title="审核备注" v-if="ruleFormStatic.flowData">
      <span>{{ ruleFormStatic.flowData.service_verify_remark }}</span>
      </mt-cell>
    </div>

    <div class="page-part">
    <mt-cell title="车主姓名">
      {{ ruleFormStatic.ownerInfo.name }}
    </mt-cell>
    <mt-cell title="车主电话">
      {{ ruleFormStatic.ownerInfo.mobile }}
    </mt-cell>
    <mt-cell title="车主证件号码">
      {{ ruleFormStatic.ownerInfo.idcard }}
    </mt-cell>
    </div>
    <div class="page-part">
    <mt-cell title="车辆型号">
      {{ ruleFormStatic.vehicleInfo.model }}
    </mt-cell>
    <mt-cell title="车辆颜色">
      <template v-if="ruleFormStatic.vehicleInfo.color">
        <dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
        <dd v-else>
          <span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
        </dd>
      </template>
    </mt-cell>
    <mt-cell title="车牌号">
      {{ ruleFormStatic.vehicleInfo.licenseplatenum }}
    </mt-cell>
    <mt-cell title="车架号">
      {{ ruleFormStatic.vehicleInfo.vin }}
    </mt-cell>
    <mt-cell title="受理银行">
      {{ ruleFormStatic.vehicleInfo.receivingbank.corpname }}
    </mt-cell>
    <mt-cell title="车价">
      <span v-if="ruleFormStatic.vehicleInfo.price">{{ ruleFormStatic.vehicleInfo.price }}元</span>
    </mt-cell>
    <mt-cell title="是否有盗抢险">
      <span v-if="ruleFormStatic.vehicleInfo.hastheftinsurance">{{ ruleFormStatic.vehicleInfo.hastheftinsurance == 1 ? '有':'无' }}</span>
    </mt-cell>
    </div>
    <div class="page-part">
    <mt-cell title="业务员">
      {{ ruleFormStatic.salername }}
    </mt-cell>
    <mt-cell title="业务员联系电话">
      {{ ruleFormStatic.salermobile }}
    </mt-cell>
    <mt-cell title="当前处理人">
      <span v-if="$store.getters.orderRowInfo.assignee">{{ $store.getters.orderRowInfo.assignee }}</span>
    </mt-cell>
    <mt-cell title="安装联系人">
      {{ ruleFormStatic.contactperson }}
    </mt-cell>
    <mt-cell title="安装联系电话">
      {{ ruleFormStatic.contactmobile }}
    </mt-cell>
    <mt-cell title="安装保险产品数量">
      <span>{{ ruleFormStatic.installapplyinsu ? ruleFormStatic.installapplyinsu : 0 }}台</span>
    </mt-cell>
    <mt-cell title="安装常规产品数量">
      <span v-if="ruleFormStatic.installapplyinsu == 1">{{ ruleForm.prodclass.length - 1 }}台</span>
      <span v-else>{{ ruleForm.prodclass.length }}台</span>
    </mt-cell>
    <mt-cell title="安装地址">
      <span v-if="ruleFormStatic.installaddress">{{ ruleFormStatic.installaddress }}</span>
    </mt-cell>
    <mt-cell title="预约安装日期">
      {{ ruleFormStatic.installapplydate }}
    </mt-cell>
    <mt-cell title="报单备注">
      {{ ruleFormStatic.flowData.apply_remark }}
    </mt-cell>
    </div>
    <mt-cell title="车辆情况选项">
      <mt-switch v-model="ruleForm.carstatus">{{ ruleForm.carstatus?"已到":"未到" }}</mt-switch>
    </mt-cell>
    <div class="page-part">
      <mt-cell title="安装小组" class="w100">
        <wxselect 
        :valuekey="valuekey"
        :isYcSearch="isYcSearch"
        :defaultValue="ruleForm.send_work_group_name" 
        @changeCop="changeInstallGrounp"
        @changeSelect="changeSelect">
      </wxselect>
    </mt-cell>
    <mt-cell title="指定安装人员" class="w100">
      <wxselect 
      ref="installUser"
      :valuekey="valueIuserkey"
      :isYcSearch="isYcColorSearch"
      :defaultValue="ruleForm.send_work_user_name" 
      :defaultDataArray="workUser" 
      @changeSelect="changeUserSelect">
    </wxselect>
  </mt-cell>
  <mt-cell title="受理银行" class="w100">
    <wxselect 
    :valuekey="valueReceivingbankKey"
    :isYcSearch="isYcReceivingbankSearch"
    :defaultValue="ruleForm.receivingbankname" 
    @clearData="clearBankData"
    @changeCop="changeReceivingbank"
    @changeSelect="changeBankSelect">
  </wxselect>
</mt-cell>
<mt-field label="服务年限" type="number" v-model="ruleForm.yearsofservice"></mt-field>
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
        :disabled="(ruleForm.prodclass[index].installtype == '保险设备')"
        :defaultValue="ruleForm.prodclass[index].installtype"
        :index="index"
        @changeCop="changeDevice"
        @close="deviceClose"
        @changeSelect="changeDeviceSelect">
      </wxselect>
    </mt-cell>
     <mt-cell title="安装设备型号" class="w100">
      <wxselect 
        :isYcSearch="isYcDeviceSearch"
        :hiddenSearch="true"
        :valuekey="modelKey"
        :defaultValue="tmpProdclass[index].installModel"
        :index="index"
        @clickBefore="modelFocus(index,ruleForm.prodclass[index].installtype)"
        @changeCop="getDeviceModelList"
        @close="deviceClose"
        @changeSelect="changeDeviceModelSelect">
      </wxselect>
     </mt-cell>
  </leftSlider>
</template>
<mt-button size="large" @click="addRow" class="mt5">添加设备</mt-button>
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
</div>
</section>
</template>

<script>
  import util from '../../../common/js/util';
  import {getPdInstallUserList,getPdInstallGroupList,searchCorpNameList,getProductModelClass,addApprovaperApply,addApprovaperSend,getvariablesTaskInfoList,getClerkProductModel} from '../../../api/api';
  import { Indicator,Toast } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  import leftSlider from 'components/customComponents/leftSlider';
  export default {
    components:{wxselect,leftSlider},
    data() {
      return {
        workUser:[],
        isShowSlider:true,
        isYcDeviceSearch:false,
        modelKey:'prodmodel',
        valuekey:"groupname",
        valueIuserkey:"employeename",
        valueReceivingbankKey:"corpname",
        isYcSearch:true,
        isYcColorSearch:false,
        isYcReceivingbankSearch:false,
        ruleForm:{
          hastheftinsurance:false,
          installapplyinsu:1,
          yearsofservice:1,
          carstatus:true,
          contactperson:'',
          contactmobile:'',
          receivingbankid:'',
          receivingbankname:'',
          salername:'',
          salermobile:'',       
          send_work_group_id:'',
          send_work_group_name:'',
          send_work_user_id:'',
          send_work_user_name:'',
          result:true,
          remark:'',
          prodclass:[]
        },

        tmpProdclass:[],
        tempModel:'',
        curTaskId:'',
        ruleFormStatic:{
          vehicleInfo:{
            model:'',
            color:'',
            licenseplatenum:'',
            vin:'',
            price:'',
            yearsofservice:'',
            receivingbank:{}
          },
          ownerInfo:{
            name:'',
            idcard:'',
            mobile:''
          },
          flowData:{
            verify_result:'',
            apply_remark:''
          },
          installEmployee:{
            employeename:''
          },
          installGroupInfo:{
            groupname:''
          }
        },
        modelFocusPara:{
          index:0,
          classVal:''
        },
        isFlag:true,
        isEditeBack:false
      }
    },
    methods: {
      //关闭设备选择窗体 回调
      deviceClose(){
        this.isShowSlider = true;
      },
      //选择设备类型
      changeDeviceSelect(item,index){
        this.ruleForm.prodclass[index].installtype = item;
      },
      //选择设备类型
      changeDeviceModelSelect(item,index){
        this.ruleForm.prodclass[index].installModel = item.id;
        this.tmpProdclass[index].installModel = item.prodmodel;
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
      //获取到选择设备型号焦点
      modelFocus(index,classVal){
        this.modelFocusPara = {
          index:index,
          classVal:classVal
        }
      },
      //设备类型改变
      getDeviceModelList(s,callback){
        if(!this.ruleForm.send_work_user_id){
          Toast("请先选择安装人员");
          return;
        }
        let para = {
          empid:this.ruleForm.send_work_user_id,
          class:{
            prodspec:this.modelFocusPara.classVal
          }
        }
        Indicator.open();
        getClerkProductModel(para).then((res) => {
            Indicator.close();
            if(res.data.result.code == 0){
              callback(res.data.data);
            }
        });
      },
      //删除设备
      deleteItem(index){
        this.ruleForm.prodclass.splice(index,1);
        this.tmpProdclass.splice(index,1);
      },
      //添加一行设备类型数量 选择
      addRow(){
        this.ruleForm.prodclass.push({
          installtype:'',
          installModel:'',
        });
        this.tmpProdclass.push({
          installModel:'',
        });
      },
      //改变是否有保险
      hasthefChange(val){
        let res = !val?1:0;
        this.ruleForm.installapplyinsu = res;
        if(res == 1){
          this.ruleForm.prodclass.splice(0,0,{installtype:'保险设备',installModel:''});
          this.tmpProdclass.splice(0,0,{installModel:''});
        }else{
          this.ruleForm.prodclass.splice(0,1);
          his.tmpProdclass.splice(0,1);
          if(this.ruleForm.prodclass.length == 0){
            this.ruleForm.prodclass.push({installtype:'',installModel:''});
            this.tmpProdclass.push({installModel:''});
          }
        }
      },
      //默认选中组人员
      getPdInstallGroupList(){
        let para = {
          grouptype:'INSTALL',
          deptid:58,
          showCount:200
        };
        this.groupLoading = true;
        getPdInstallGroupList(para).then((res) => {
          this.workGroup = res.data.data.records;
          this.groupLoading = false;
          if(this.isFlag){
            this.workGroup.forEach((v) => {
              if(v.id == this.ruleFormStatic.installGroupInfo.id){
                this.ruleForm.send_work_group_id = v.id;
                this.ruleForm.send_work_group_name = v.groupname;
                this.getPdInstallUserList(v.id);
                return false;
              }
            });
          }
        });
      },
      //选择分组
      changeInstallGrounp(searchkey,callback){
        this.isFlag = false;
        let para = {
          grouptype:'INSTALL',
          deptid:58,
          showCount:1000
        };
        Indicator.open();
        getPdInstallGroupList(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            callback(res.data.data.records);
          }
        });
      },
      //选择小组
      changeSelect(item){
        this.ruleForm.send_work_group_name = item.groupname;
        this.ruleForm.send_work_group_id = item.id;
        this.$refs.installUser.clearData();
        this.getPdInstallUserList(item.id);
      },
      //选择小组安装人员
      changeUserSelect(item){
        this.ruleForm.send_work_user_id = item.ID;
      },
      //根据安装小组获取对应组下的安装人员
      getPdInstallUserList(gid){
        let para = {
          groupid:gid,
          showCount:1000
        };
        Indicator.open();
        getPdInstallUserList(para).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            this.workUser = res.data.data.records;
            if(this.isFlag){
              this.workUser.forEach((v) => {
                if(v.userid == this.ruleFormStatic.installEmployee.userid){
                  this.ruleForm.send_work_user_name = v.employeename;
                  this.ruleForm.send_work_user_id = v.ID;
                  return false;
                }
              });
            }
          }
        });
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
      //清空银行
      clearBankData(){
        this.ruleForm.receivingbankid = '';
      },
      //选择银行
      changeBankSelect(item){
        this.ruleForm.receivingbankname = item.corpname;
        this.ruleForm.receivingbankid = item.id;
      },
      /* 提交表单数据 */
    submitForm(formName) {
      if(this.ruleForm.hastheftinsurance == 1 && this.ruleForm.receivingbankid == ''){
        Toast("有盗抢险必须选择受理银行");
        return;
      }
      if(this.ruleForm.installapplyinsu == 0 && this.ruleForm.prodclass.length == 0){
        Toast("保险或常规设备数量不能为0！");
        return;
      }
      for (var i = 0,len = this.ruleForm.prodclass.length; i < len; i++) {
        if(!this.ruleForm.prodclass[i].installModel){
          Toast("设备型号必须选");
          return false;
        }
      }
      let addformpara = {
        taskId:this.curTaskId,
        properties : {}
      };
      addformpara.properties = {
        installgroupid:this.ruleForm.send_work_group_id,
        installby:this.ruleForm.send_work_user_id,
        carstatus:this.ruleForm.carstatus?1:0,
        installapplyinsu:this.ruleForm.installapplyinsu,
        vehicleInfo:{
          yearsofservice:this.ruleForm.yearsofservice,
          receivingbankid:this.ruleForm.receivingbankid
        },
        prodclass:[],
        contactperson:this.ruleForm.contactperson,
        contactmobile:this.ruleForm.contactmobile,
        salername:this.ruleForm.salername,
        salermobile:this.ruleForm.salermobile,
        result:this.ruleForm.result,
        remark:this.ruleForm.remark
      }
      //判断派单是退回编辑 还是 新增派单
      if(this.ruleForm.prodclass && this.isEditeBack){
        let temprodclass = [];
        this.ruleForm.prodclass.forEach((item,index)=>{
          let para = {};
          if(!isNaN(Number(item.installModel))){
            para.installModel = item.installModel;
          }else{
            para.installModel = item.installremark;
          }
          para.installtype = item.installtype;
          temprodclass.push(para);
        });
        addformpara.properties.prodclass = temprodclass;
      }else{
        addformpara.properties.prodclass = this.ruleForm.prodclass;
      }
      addApprovaperSend(addformpara).then((res) => {
        if(res.data.result.code == 0){
          Toast({
            message: '派单成功',
            iconClass: 'f35 iconfont icon-gou'
          });
          this.$router.back(-1);
        }
      });
    },
    //父级如果是点击查询回调
    getCustoHistoryInfo(res){
      this.ruleForm.hastheftinsurance = parseInt(res.installapplyinsu) == 1 ? true:false;
      this.ruleForm.contactmobile = res.contactmobile;
      this.ruleForm.contactperson = res.contactperson;
      this.ruleForm.salername = res.salername;
      this.ruleForm.salermobile = res.salermobile;
      if(res.vehicleInfo.receivingbank) {
        this.ruleForm.receivingbankid = res.vehicleInfo.receivingbank.id;
        this.ruleForm.receivingbankname = res.vehicleInfo.receivingbank.corpname;
      }
      this.ruleForm.installapplyinsu = res.installapplyinsu;
      if(res.vehicleInfo.yearsofservice) this.ruleForm.yearsofservice = res.vehicleInfo.yearsofservice;
      if(res.carstatus){
        this.ruleForm.carstatus = res.carstatus == 0 ? false : true;
      }else{
        this.ruleForm.carstatus = true;
      }
      this.isFlag = true;
      if(res.flowData.work_result === false || res.flowData.work_receive_result === false) {
        this.isEditeBack = true;
        this.getPdInstallGroupList();
        //默认选中设备型号
        if(res.prodclass){
          let tempProdclass = [];
          res.prodclass.forEach((item,index)=>{
            tempProdclass.push({installModel:item.installremark,installremark:item.installModel,installtype:item.installtype});
          });
          this.tmpProdclass = tempProdclass;
          this.ruleForm.prodclass = tempProdclass;
        }
        this.ruleForm.remark = res.flowData.verify_remark;
      }else{
        if(res.installapplyinsu == 1){
          this.ruleForm.prodclass.push({installtype:'保险设备',installModel:''});
          this.tmpProdclass.push({installModel:''});
        }
        if(res.prodclass){
          res.prodclass.forEach((item,index)=>{
            if(item.applynum > 0){
              for(var i = 0,len = item.applynum ; i < len ; i++){
                this.ruleForm.prodclass.push({installtype:item.installtype,installModel:''});
                this.tmpProdclass.push({installModel:''});
              }
            }
          });
        }
      }
    },
    //根据任务id获取表单信息
    getFormData() {
      let obj = this.$store.getters.orderRowInfo
      if(!obj) return;
          //获取填写的任务变量值
          let pa = {
            taskId:obj.id
          };
          this.curTaskId = obj.id;
          Indicator.open();
          getvariablesTaskInfoList(pa).then((res) => {
            let _this = this,data = res.data.data;
            Indicator.close();
            if(!data.vehicleInfo){
              data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
            }
            if(!data.ownerInfo){
              data.ownerInfo = _this.ruleFormStatic.ownerInfo;
            }
            if(!data.installEmployee){
              data.installEmployee = _this.ruleFormStatic.installEmployee;
            }
            if(!data.installGroupInfo){
              data.installGroupInfo = _this.ruleFormStatic.installGroupInfo;
            }
            if(!data.flowData){
              data.flowData = _this.ruleFormStatic.flowData;
            }
            if(!data.vehicleInfo.receivingbank){
              data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
            }
            _this.ruleFormStatic = data;
            this.getCustoHistoryInfo(data);
          }).catch((error) => {
            Indicator.close();
          });
        },
    },
    created(){
      this.getFormData();
    }
  }
</script>