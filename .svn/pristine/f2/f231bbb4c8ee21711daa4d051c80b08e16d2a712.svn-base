<!--* 
* @description: 报单中心（内部分为6步子组件） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="wx-content">
		<div class="page-part">
			<mt-radio
			  class="mtradio bimg_none_one"
			  v-model="startForm.declaretype"
			  align="right"
			  @change="changeCumType"
			  :options="declareOptions">
			</mt-radio>
		</div>
	    <customerDeclarationCorp 
		    @defaultChangeCumType="defaultChangeCumType" 
		    :startForm="startForm" 
		    ref="proCusum">
	    </customerDeclarationCorp>
	</section>
</template>

<script>
	import wxselect from 'components/customComponents/select';
	import customerDeclarationCorp from 'components/businessManage/declarationFormProcess/customerDeclarationCorp';
	import {getCopNameBy} from '../../api/api';
	import { Indicator } from 'mint-ui';
	import axios from 'axios';
	export default {
		components:{wxselect,customerDeclarationCorp},
		data() {
			return {
				valuekey:"corpname",
				declareOptions:[
				  {
				    label: '客户报单',
				    value: '客户报单',
				    disabled: false
				  },
				  // {
				  //   label: '自主报单',
				  //   value: '自主报单',
				  //   disabled: false
				  // },
				],
				startForm:{
				          declaretype:'客户报单',
				          declareby:'',//报单员id
				          corpid:'',//报单公司id
				          corptype:'',//公司类型
				          corpname:'快提车'
				},
		        tmpCopItem:"",
		        copName:[],
		        copLoading:false
			}
		},
		methods: {
			//报单类型切换
			changeCumType(v){
				let user = JSON.parse(sessionStorage.getItem("user"));
				if(v == '自主报单'){
					this.declareOptions[0].disabled = true;
					this.startForm.declaretype = "自主报单";
				}else{
					this.startForm.declaretype = "客户报单";
					this.declareOptions[1].disabled = true;
			        this.startForm.corpid = user.corporateInfo.id;
			        this.startForm.corpname = user.corporateInfo.corpname;
			        this.tmpCopItem = user.corporateInfo.corpname;
				}
			},
			//默认当前报单类型 公司
			defaultChangeCumType(item){
				this.startForm.declaretype = item.declaretype;
				if(item.declaretype == "自主报单"){
					this.declareOptions[0].disabled = true;
					this.startForm.corpid = item.corporateInfo.id;
					this.startForm.corpname = item.corporateInfo.corpname;
			        this.tmpCopItem = item.corporateInfo.corpname;
				}else{
					this.startForm.corpid = item.corporateInfo.id;
					this.startForm.corpname = item.corporateInfo.corpname;
			        this.tmpCopItem = item.corporateInfo.corpname;
					this.declareOptions[1].disabled = true;
				}
			},
			//公司选择
			changeSelect(item){	
				if(!item.id) return;
				this.startForm.corpid = item.id;
				this.startForm.corpname = item.corpname;
			},
		},
		//初始化数据
		created() {
			let user = JSON.parse(sessionStorage.getItem("user"));
		            this.startForm.declareby = user.id;
		            let para = {
		                showCount:1000
		            }
		            Indicator.open();
		            getCopNameBy(para).then((res) => {
		                Indicator.close();
		                if(res.data.result.code == 0){
		                    this.copName = res.data.data.records;
		                    this.startForm.corptype = user.corporateInfo.corptype;
		                    //获取当前报单人信息
		                    if(user.corporateInfo.corptype == "WW"){
		                        this.startForm.declaretype = "自主报单";
		                        if(this.copName[0].corptype == "WW"){
		                          this.copName.splice(0,1);
		                        }
		                        this.declareOptions[0].disabled = true;
		                    }else{
		                        this.startForm.declaretype = "客户报单";
		                        this.declareOptions[1].disabled = true;
		                        this.startForm.corpid = user.corporateInfo.id;
		                        this.startForm.corpname = user.corporateInfo.corpname;
		                        this.tmpCopItem = user.corporateInfo.corpname;
		                    }
		                }
		            });
		}
	}
</script>