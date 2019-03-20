<!--* 
* @description: 评论
* @author: chen 
* @update:  
*-->
<template>
   <section class="wrapper">
    <div class="detail-cont-top">
        <div class="detail-cont-top-img">
            <div class="media_pic_content_1 clearfix" id="js-img-list">
                <div class="media_pic_1">
                    <img class="js-add-imgurl limit_min_img bg_cover" :src="sysUserAvatar">
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="detail-cont-top-text">
            <span>{{ user.employeeInfo.employeename }}({{ user.name }})</span>            
        </div>
    </div>
    <div>
        <div class="per_item bor-b">
            <div class="per_item_img">
                <img src="static/images/jiaose.png" alt="">
                <span>角&emsp;&emsp;&nbsp;色</span>
            </div>
            <div class="per_item_right">
                <span v-if="user.employeeInfo.employeetype=='WW_CONTRACT'">万网正式工</span>
                <span v-if="user.employeeInfo.employeetype=='WW_PARTTIME'">万网兼职</span>
                <span v-if="user.employeeInfo.employeetype=='WW_PROBATION'">万网试用期</span>
                <span v-if="user.employeeInfo.employeetype=='CUSTOMER'">客户</span>
                <span v-if="user.employeeInfo.employeetype=='GUAR'">担保公司</span>
                <span v-if="user.employeeInfo.employeetype=='BANK'">银行</span>
                <span v-if="user.employeeInfo.employeetype=='OTH'">其他</span>
                <span v-if="!user.employeeInfo.employeetype">未知</span>
            </div>
        </div>

        <div class="per_item top2 bor-b">
            <div class="per_item_img">
                <img src="/static/images/gsi.png" alt="">
                <span>所属公司</span>
            </div>
            <div class="per_item_right">
                <span>{{ user.corporateInfo.corpname }}</span>
            </div>
        </div>
  

        <div class="per_item bor-b">
            <div class="per_item_img">
                <img src="static/images/bumen.png" alt="">
                <span>所在部门</span>
            </div>
            <div class="per_item_right">
                <span>{{ user.departmentInfo.deptname }}</span>
            </div>
            
        </div>
 
        <div class="per_item bor-b">
            <div class="per_item_img">
                <img src="static/images/haoma.png" alt="">
                <span>电话号码</span>
            </div>
            <div class="per_item_right">
                <span>{{user.employeeInfo.mobile}}</span>
            </div>                 
        </div>

        <div class="per_item bor-b">
            <div class="per_item_img">
                <img src="static/images/youxiang.png" alt="">
                <span>我的邮箱</span>
            </div>
            <div class="per_item_right">
                <span>{{user.employeeInfo.email?user.employeeInfo.email:""}}</span>
            </div>
        </div>
    
        <div class="per_item bor-b">
            <div class="per_item_img">
                <img src="static/images/dizhi.png" alt="">
                <span>当前地址</span>
            </div>
            <div class="per_item_right">
                <span>{{ curaddress }}</span>
            </div>
        </div>
         <div class="per_item bor-b">
            <div class="per_item_img">
                <img src="static/images/fahuo.png" alt="">
                <span>发货地址</span>
            </div>
            <div class="per_item_right">
                <span >{{user.employeeInfo.region}}</span>
            </div>
        </div>
    </div>
     <gdmap v-show="false" @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
</section>
</template>
<style scoped>
    @import '/static/css/global.css';
</style>
<script>
    import rem23 from 'static/js/rem';
    import gdmap from 'components/map/gdmap';
    export default {
        components:{gdmap},
        data() {
            return {
              user:'',
              curaddress:'',
              sysUserAvatar:'static/images/pho.png'
            }
        },
        methods:{
            draggerMapMarker(address,lnglatXY,type){
                this.curaddress = address;
            }
        },
        created(){
            this.user = JSON.parse(sessionStorage.getItem('user'));
            /** 用户信息初始化 头像 start*/
            if (this.user) {
                if(this.user.employeeInfo.headiconpath != undefined || this.user.employeeInfo.headiconpath != null){
                    this.sysUserAvatar = "/img/"+this.user.employeeInfo.headiconpath;
                }else{
                    this.sysUserAvatar = "static/images/pho.png";
                }
            }
        }
    }
</script>