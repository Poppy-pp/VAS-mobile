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
    </mt-cell>
    <mt-cell title="任务候选人">
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
      <span>{{ ruleFormStatic.flowData.work_verify_result }}</span>
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
</section>
</template>

<script>
  import util from '../../../common/js/util';
  import {addApprovaperSendVindicate,getvariablesSeaviceTaskInfoList} from '../../../api/api';
  import { Indicator,Toast } from 'mint-ui';
  import wxselect from 'components/customComponents/select';
  export default {
    components:{wxselect},
    data() {
      return {
        isYcSearch:false,
        util:util,
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
          declarEmployee: {}
        },
        ruleForm:{
          defaultRefusal:'资料错误',
          refusal:["资料错误","未上线","其它"],
          result:true,
          remark:'',
        }
      }
    },
    methods: {
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
      let obj = this.$store.getters.orderRowInfo;
      if(!obj) return;
          //获取填写的任务变量值
          let pa = {
            taskId:obj.id
          };
          Indicator.open();
          getvariablesSeaviceTaskInfoList(pa).then((res) => {
            let _this = this,data = res.data.data;
            Indicator.close();
            if(!data.vehicleInfo){
                data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
            }
            if(!data.vehicleInfo.receivingbank){
                data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
            }
            if(!data.assigntoGroup){
                data.assigntoGroup = _this.ruleFormStatic.assigntoGroup;
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
        //提交审核结果
        addApprovaperSendVindicate(addformpara).then((res) => {
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