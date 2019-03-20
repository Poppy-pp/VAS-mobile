<!--* 
* @description: 拆除（内部分为5步子组件） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
    <section class="tab_content-wrapper">
        <el-tabs v-model="activeName">
            <el-tab-pane label="拆除报单" class="newForm_s" name="bd">
                <div class="newForm_s_col_1">
                    <el-steps :space="120" 
                    process-status="finish" 
                    direction="vertical" 
                    :active="active" 
                    finish-status="success" 
                    style="margin: 20px 0;">
                    <el-step title="报单"></el-step>
                    <el-step title="确认/派单"></el-step>
                    <el-step title="施工"></el-step>
                    <el-step title="审核"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <el-card class="newForm_s_col_2">
                <div class="text item">
                    <section class="myorderFF">
                        <router-view 
                        @changeStep="changeStep" 
                        @getFormData="getFormData" 
                        :store="store" 
                        :ruleFormStatic="ruleFormStatic" 
                        :curTaskId="curTaskId" 
                        ref="proCusum">
                    </router-view>
                </section>
            </div>
        </el-card>
    </el-tab-pane>
</el-tabs>
</section>
</template>

<script>
    import store from '../../vuex/store';
    import {getBackFormInfo} from '../../api/api';
    export default {
        data() {
            return {
                activeName:'bd',
                ruleFormStatic:{
                    vehicleInfo:{
                        model:'',
                        color:'',
                        licenseplatenum:'',
                        vin:'',
                        price:'',
                        yearsofservice:''
                    },
                    ownerInfo:{
                        name:'',
                        idcard:'',
                        mobile:''
                    },
                    installEmployee:{
                        employeename:''
                    },
                    installGroupInfo:{
                        groupname:''
                    }
                },
                curTaskId:'',
                active:0,
                store:store,
                alignCenter:true,
                center:true
            }
        },
        methods: {
            changeStep(v){
                this.active = v;
            },
            //根据任务id获取表单信息
            getFormData(obj) {
                if(!obj) return;
                  //获取填写的任务变量值
                  let pa = {
                      taskId:obj.id
                  };
                  this.curTaskId = obj.id;
                  getBackFormInfo(pa).then((res) => {
                      let _this = this,data = res.data.data;
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
                      _this.ruleFormStatic = data;
                      _this.$refs.proCusum.getCustoHistoryInfo(data);
                  });
              },
          },
        //初始化数据
        created() {
        }
    }
</script>