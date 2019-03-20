<!--* 
* @description: 报单中心列表 新装单子 拆除单子 售后单子 控制中心（父节点） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper">
	 	<div class="page-tabbar">
			<div class="page-wrap">
		      <mt-tab-container class="page-tabbar-container" v-model="bottomNav">
		        <mt-tab-container-item id="1">
		        	<mytodolist v-if="bottomNav == '1'"></mytodolist>
		        </mt-tab-container-item>
		        <mt-tab-container-item id="2">
		        	<serviceMytodolist v-if="bottomNav == '2'"></serviceMytodolist>
		        </mt-tab-container-item>
		        <mt-tab-container-item id="3">
		        	<dismantleMytodolist v-if="bottomNav == '3'"></dismantleMytodolist>
		        </mt-tab-container-item>
		      </mt-tab-container>
		    </div>
			<mt-tabbar v-model="bottomNav" fixed>
		      <mt-tab-item id="1">
		        <i class="vmiddle iconfont icon-banlixinzhuang"></i>新装
		      </mt-tab-item>
		      <mt-tab-item id="2">
		        <i class="vmiddle iconfont icon-weixiu"></i>维修
		      </mt-tab-item>
		      <mt-tab-item id="3">
		        <i class="vmiddle iconfont icon-gpschaichu"></i>拆除
		      </mt-tab-item>
		    </mt-tabbar>
		</div>
	</section>
</template>
<style type="text/css">
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
</style>
<script>
	//组件引入
	import mytodolist from 'components/businessManage/myOrderInfo/mytodolist';
	import dismantleMytodolist from 'components/businessManage/myOrderInfo/dismantleMytodolist';
	import serviceMytodolist from 'components/businessManage/myOrderInfo/serviceMytodolist';
	export default {
		components:{mytodolist,dismantleMytodolist,serviceMytodolist},
		data() {
			return {
				bottomNav:'1'
			}
		},
		watch:{
			//监控tab变化值 并记录
			bottomNav(cv,ov){
				this.$store.dispatch("tabbarType",cv);
			}
		},
		methods: {
		},
		created(){
			this.bottomNav = this.$store.getters.tabbarType;
		}
	}
</script>