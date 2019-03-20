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
        <span v-if="ruleFormStatic.installapplyinsu == 1">{{ ruleFormStatic.prodclass.length - 1 }}台</span>
        <span v-else>{{ ruleFormStatic.prodclass.length }}台</span>
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
    <div class="page-part">
      <mt-cell title="安装小组">
        {{ ruleFormStatic.installGroupInfo.groupname }}
      </mt-cell>
      <mt-cell title="安装人员">
        {{ ruleFormStatic.installEmployee.employeename }}
      </mt-cell>
      <mt-cell title="车辆情况选项">
        <span v-if="ruleFormStatic.carstatus">{{ ruleFormStatic.carstatus?"已到":"未到" }}</span>
      </mt-cell>
      <mt-cell title="服务年限">
        <span v-if="ruleFormStatic.vehicleInfo.yearsofservice">{{ ruleFormStatic.vehicleInfo.yearsofservice }}年</span>
      </mt-cell>
      <mt-cell title="派单备注">
        {{ ruleFormStatic.flowData.verify_remark }}
      </mt-cell>
    </div>
    <div class="page-part">
      <mt-cell title="车辆照片"></mt-cell>
      <div class="imgMd" v-for="(item,index) in ruleFormStatic.pictures">
        <img :title="item.picdesc" class="image" @click="showImg" :src="$store.state.IMG_URL+item.piclink">
        <span>{{ item.picdesc }}</span>
      </div>
    </div>
    <div class="page-part" v-for="(item,index) in ruleFormStatic.installDetails">
      <mt-cell title="安装位置">{{ item.installpositionname }}</mt-cell>
      <mt-cell title="安装时状态"><span v-if="item.onlinestatus">{{ item.onlinestatus == 0 ? "未上线" : "在线" }}</span>
                    <span v-else>未上线</span></mt-cell>
      <mt-cell title="设备ID">{{ item.packInfo.E_PRODUNUM }}</mt-cell>
      <mt-cell title="设备类型">{{ item.packInfo.E_PRODTYPE }}</mt-cell>
      <mt-cell title="设备型号">{{ item.packInfo.E_PRODMODEL }}</mt-cell>
      <mt-cell title="SIM卡号">{{ item.packInfo.C_PRODUNUM }}</mt-cell>
      <mt-cell title="iccid">{{ item.packInfo.SIMCARDID }}</mt-cell>
      <mt-cell title="卡类型">{{ item.packInfo.C_PRODMODEL }}</mt-cell>
      <mt-cell title="设备实时状态"><span v-if="item.curonlinestatus">{{ item.curonlinestatus }}</span></mt-cell>
      <mt-cell title="实时位置信息"><span v-if="item.recvtime">{{ item.recvtime }}</span></mt-cell>
      <mt-cell title="备注">{{ item.remark }}</mt-cell>
      <mt-cell title="实时位置信息"><span v-if="item.recvtime">{{ item.recvtime }}</span></mt-cell>
      <mt-cell title="设备照片"></mt-cell>
      <div class="imgMd" v-for="(item,index) in item.pictures">
        <img :title="item.picdesc" class="image" @click="showImg" :src="$store.state.IMG_URL+item.piclink">
        <span>{{ item.picdesc }}</span>
      </div>
    </div>
    <mt-cell title="审核意见">
      <mt-switch v-model="ruleForm.result">{{ ruleForm.result?"通过":"拒绝" }}</mt-switch>
    </mt-cell>
    <mt-cell title="拒绝理由" v-if="!ruleForm.result" class="w100">
      <wxselect 
        :isYcSearch="isYcSearch"
        :defaultValue="ruleForm.defaultRefusal" 
        :defaultDataArray="ruleForm.refusal" 
        @changeSelect="changeSelect">
      </wxselect>
    </mt-cell>
    <mt-field label="备注" placeholder="请输入备注" type="textarea" rows="4" v-model="ruleForm.remark"></mt-field>
  <div class="page-part" style="margin: 0 5px;">
    <mt-button type="primary"  @click="submitForm('ruleForm')" size="large">提交</mt-button>
  </div>
  <div v-if="isShowImg" @click="hideImgShow" class="imgVisModel"></div>
</section>
</template>
<script>
  import { addApprovaperServiceVerify,getvariablesTaskInfoList } from '../../../api/api';
  import { Indicator,Toast } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  export default {
    components:{wxselect},
    data() {
      return {
        isYcSearch:false,
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
        ruleForm:{
          defaultRefusal:'资料错误',
          refusal:["资料错误","未上线","其它"],
          result:true,
          remark:'',
        },
        isShowImg:false
      }
    },
    methods: {
      //点击隐藏图片展示
      hideImgShow(e){
         this.isShowImg = false;
         $(".showimg").removeClass("showimg");
      },
      //点击图片展示放大图片
      showImg(e){
        this.isShowImg = !$(e.target).hasClass("showimg");
        $(e.target).toggleClass("showimg");
      },
      //查看车型列表
      changeInstallGrounp(searchkey,callback){
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
        this.ruleForm.defaultRefusal = item;
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
      /* 提交表单数据 */
      submitForm(formName) {
        let obj = this.$store.getters.orderRowInfo;
        let addformpara = {
          taskId:obj.id,
          properties : {
            result:this.ruleForm.result,
            remark:(this.ruleForm.defaultRefusal?(this.ruleForm.defaultRefusal+'-'):'')+this.ruleForm.remark
          }
        };
        Indicator.open();
        //提交审核结果
        addApprovaperServiceVerify(addformpara).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            Toast({
              message: '审核成功',
              iconClass: 'f35 iconfont icon-gou'
            });
            this.$router.back(-1);
          }
        });
      },
    },
    created(){
      this.getFormData();
    }
  }
</script>