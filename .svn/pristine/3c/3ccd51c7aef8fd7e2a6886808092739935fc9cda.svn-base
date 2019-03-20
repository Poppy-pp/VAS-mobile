<!--* 
* @description: 微信报单中心（报单） 
* @author: 王鹏 corpid :wxb51aaeb1e86d07df
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
  <section class="wx-content-child">
   <div class="page-part">
    <mt-cell title="维修单号">
     <span v-if="ruleFormStatic.orderno">{{ ruleFormStatic.orderno }}</span>
    </mt-cell>
    <mt-cell title="创建人单位">
      <span v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname }}</span>
    </mt-cell>
    </div>
    <div class="page-part">
    <mt-cell title="当前处理人">
    <span v-if="$store.getters.orderRowInfo.assignee">{{ $store.getters.orderRowInfo.assignee }}</span>
    </mt-cell>
    <mt-cell title="任务候选人">
    <span v-if="$store.getters.orderRowInfo.candidateUsers">{{ $store.getters.orderRowInfo.candidateUsers }}</span>
    </mt-cell>
    <mt-cell title="报单时间">
      <dd v-if="ruleFormStatic.createdate">{{ util.formatDate.format(new Date(ruleFormStatic.createdate), 'yyyy-MM-dd hh:mm:ss') }}</dd>
    </mt-cell>
    </div>

    <div class="page-part">
      <mt-cell title="报单备注" v-if="ruleFormStatic.flowData">
        {{ ruleFormStatic.flowData.start_remark }}
      </mt-cell>
      <mt-cell title="派单备注" v-if="ruleFormStatic.flowData">
      <span>{{ ruleFormStatic.flowData.send_remark }}</span>
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
    <dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.name }}</dd>
    </mt-cell>
    <mt-cell title="车主身份证号码">
    </mt-cell>
    <mt-cell title="车主联系电话">
     <dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.mobile }}</dd>
    </mt-cell>
    </div>
    <div class="page-part">
    <mt-cell title="车辆型号">
      <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.model }}</dd>
    </mt-cell>
    <mt-cell title="车辆颜色">
      <template v-if="ruleFormStatic.vehicleInfo">
                  <template v-if="ruleFormStatic.vehicleInfo.color">
                    <dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
                    <dd v-else>
                      <span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
                    </dd>
                  </template>
                </template>
    </mt-cell>
    <mt-cell title="车牌号">
      <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
    </mt-cell>
    <mt-cell title="车架号">
      <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.vin }}</dd>
    </mt-cell>
    <mt-cell title="受理银行">
      <dd v-if="ruleFormStatic.vehicleInfo">
                  <template v-if="ruleFormStatic.vehicleInfo.receivingbank">
                    {{ ruleFormStatic.vehicleInfo.receivingbank.corpname }}
                  </template>
                </dd>
    </mt-cell>
    <mt-cell title="车价">
      <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.price }}元</dd>
    </mt-cell>
    </div>
    <div class="page-part">
    <mt-cell title="安装联系人">
      <dd v-if="ruleFormStatic.contactperson">{{ ruleFormStatic.contactperson }}</dd>
    </mt-cell>
    <mt-cell title="安装联系电话">
      <dd v-if="ruleFormStatic.contactmobile">{{ ruleFormStatic.contactmobile }}</dd>
    </mt-cell>
    <mt-cell title="安装地址">
      <dd v-if="ruleFormStatic.aftersaleaddress">{{ ruleFormStatic.aftersaleaddress }}</dd>
    </mt-cell>
    <mt-cell title="预约安装日期">
      <dd v-if="ruleFormStatic.aftersaledate">{{ ruleFormStatic.aftersaledate }}</dd>
    </mt-cell>
    <mt-cell title="报单备注">
      <dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.start_remark }}</dd>
    </mt-cell>
    </div>
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
<mt-field label="备注" placeholder="请输入备注" type="textarea" rows="4" v-model="ruleForm.remark"></mt-field>
<div class="page-part" style="margin: 0 5px;">
  <mt-button type="primary"  @click="submitForm('ruleForm')" size="large">提交</mt-button>
</div>
</section>
</template>

<script>
import util from '../../../common/js/util';
  import {getPdInstallGroupList,getPdInstallUserList,addApprovaperSendVindicateRmove,getvariablesSeaviceTaskInfoList} from '../../../api/api';
  import { Indicator,Toast } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  export default {
    components:{wxselect},
    data() {
      return {
        workUser:[],
        util:util,
        isYcDeviceSearch:false,
        valuekey:"groupname",
        valueIuserkey:"employeename",
        isYcSearch:true,
        isYcColorSearch:false,
        isYcReceivingbankSearch:false,
        isFlag:true,
        ruleForm:{
          send_work_group_id:'',
          send_work_group_name:'',
          send_work_user_id:'',
          send_work_user_name:'',
          result:true,
          remark:'',
        },
        ruleFormStatic: {
          vehicleInfo: {
            model: '',
            color: '',
            licenseplatenum: '',
            vin: '',
            price: '',
            yearsofservice: '',
            receivingbank: {},
            ownerInfo: {
              name: '',
              idcard: '',
              mobile: ''
            }
          },
          assigntoGroup: {
            groupname: ''
          },
          assigntoEmployeeInfo: {
            employeename: ''
          },
          afterSaleDetails: [],
          corporateInfo: {},
          declarEmployee: {},
          flowData: {},
          installGroupInfo: {}
        },
      }
    },
    methods: {
      //查询安装小组      
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
      /* 提交表单数据 */
      submitForm() {
        let obj = this.$store.getters.orderRowInfo;
        let addformpara = {
          taskId:obj.id,
          properties : {}
        };
        addformpara.properties = {
          assigntogroup:this.ruleForm.send_work_group_id,
          assignto:this.ruleForm.send_work_user_id,
          result:this.ruleForm.result,
          remark:this.ruleForm.remark
        };
        Indicator.open();
        //提交审核结果
        addApprovaperSendVindicateRmove(addformpara).then((res) => {
          Indicator.close();
          if(res.data.result.code == 0){
            Toast({
              message: '维修派单成功！',
              iconClass: 'f35 iconfont icon-gou'
            });
            this.$router.back(-1);
          }
        }).catch((error) => {
          Indicator.close();
        });
      },
      //父级如果是点击查询回调
      getCustoHistoryInfo(res){
        this.isFlag = true;
        if(res.flowData.work_result === false || res.flowData.work_receive_result === false) {
          this.getPdInstallGroupList();
          this.ruleForm.remark = res.flowData.send_remark;
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
          Indicator.open();
          getvariablesSeaviceTaskInfoList(pa).then((res) => {
            Indicator.close();
            if(res.data.result.code == 0){
              let _this = this,data = res.data.data;
             if(!data.vehicleInfo) {
                data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
              }
              if(!data.vehicleInfo.receivingbank) {
                data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
              }
              if(!data.assigntoGroup) {
                data.assigntoGroup = _this.ruleFormStatic.assigntoGroup;
              }
              _this.ruleFormStatic = data;
              this.getCustoHistoryInfo(data);
            }
          }).catch((error) => {
            Indicator.close();
          });
        }
      },
      created(){
        this.getFormData();
      }
    }
  </script>