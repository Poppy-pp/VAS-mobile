
<!--* 
* @description: 报单中心列表 新装单子 拆除单子 售后单子 控制中心（父节点） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper wx-content">
		<el-tabs :tab-position="tabPosition" v-model="activeName" class="newForm_s" @tab-click="handleClick">
		    <el-tab-pane label="新装登记" name="1">
              	<section class="myorderFF">
					<newOrderSupplement 
					:windowOutHeight="windowOutHeight" 
					v-if="activeName == 1">
					</newOrderSupplement>
			    </section>
		    </el-tab-pane>

   			<!-- <el-tab-pane label="拆除登记" name="2">
   				<el-card class="newForm_s_col_2 ml10">
	                <div class="text item">
	                  	<section class="myorderFF">
							<customerDismantleSpi 
							:windowOutHeight="windowOutHeight" 
							v-if="activeName == 2">
							</customerDismantleSpi>
					    </section>
	            	</div>
            	</el-card>
		    </el-tab-pane>
		    
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4fbc27b0c7399191&redirect_uri=http%3a%2f%2fw.wwvas.com&response_type=code&scope=&state=formProcess&#wechat_redirect

		    <el-tab-pane label="维修登记" name="3">
		    	<el-card class="newForm_s_col_2 ml10">
	                <div class="text item">
	                  	<section class="myorderFF">
							<customerSUpplement 
							:windowOutHeight="windowOutHeight" 
							v-if="activeName == 3">
							</customerSUpplement>
					    </section>
	            	</div>
            	</el-card>
		    </el-tab-pane> -->
		    
		</el-tabs>
	</section>
</template>


<script>
	import util from '../../common/js/util';
	//组件引入
	import newOrderSupplement from 'components/businessManage/declarationFormProcess/newOrderSupplement';
	// import customerSUpplement from 'components/businessManage/customerService/customerSUpplement';
	// import customerDismantleSpi from 'components/businessManage/dismantleFormProcess/customerDismantleSpi';
	export default {
		props:['windowOutHeight'],
		components:{newOrderSupplement},
		data() {
			return {
				tabPosition:'left',
				activeName: '1'
			}
		},
		methods: {
			//页面管理切换
			handleClick(tab, event) {
	        	// console.log(tab.name, event);
	      	}
		},
		created() {
		}
	}
</script>