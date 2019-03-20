<!--* 
* @description: 我的请求
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section>
		<mt-search v-model="filters.search_key" cancel-text="取消" placeholder="请输入关键信息，如:车主姓名"></mt-search>
		<ul class="tabslider yb-ul" 
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="loading"
		infinite-scroll-distance="50">
		<li class="clearfix" v-for="props in todo">
			<div class="yb-ul-title clearfix">
				<h1 class="zq-name fL"><i class="iconfont icon-dingdan"></i>{{ props.cur_name }}</h1>
				<span class="pro-name fL cles">{{ props.cur_employeename }}</span>
				<span class="hy-b fR">{{ orderFormatter(props) }}</i></span>
			</div>
			<div class="yb-ul-inf clearfix">
				<a href="javascript:void(0);">
					<template v-if="props.description">
						<template v-if="props.description.indexOf('#') != -1">
							<span>{{ props.description.split('#')[0] }}</span>
							<span class="color_rgba1" :style="{background:props.description.substr(props.description.indexOf('#'),7)}"></span>
						</template>
						<template v-else>
							<span>{{ props.description }}</span>
						</template>
					</template>
				</a>
				<span class="yb-time cles">{{ props.start_time }}</span>
			</div>
		</li>
	</ul>
	<p v-show="loading" class="page-infinite-loading">
		<mt-spinner type="triple-bounce" :size="60" color="rgb(38, 162, 255)"></mt-spinner>
	</p>
</section>
</template>
<script>
	import { Toast } from 'mint-ui';
	import {queryRequest} from '../../api/api';
	export default {
		data() {
			return {
				loading: false,
				loadError:false,
				//搜索 筛选信息
				filters: {
					search_key:''
				},
				currentPage:0,
				pageSize:10,
				todo:[]
			}
		},
		watch:{
			filters:{
				handler(cval,oval){
					this.getTodo();
				},
				deep:true
			}
		},
		methods: {
			//滚动到底部加载更多列表信息
			loadMore(){
				if(this.filters.search_key || this.loading || this.loadError) return;
				this.currentPage++;
				this.pageTodo();
			},
			//订单类型格式化
			orderFormatter(row){
				if(row.proc_def_id.indexOf("vindicate_remove") != -1){
					return "拆除";
				}
				if(row.proc_def_id.indexOf("vindicate") != -1 && row.proc_def_id.indexOf("vindicate_remove")  == -1){
					return "售后维修";
				}
				if(row.proc_def_id.indexOf("new_build") != -1){
					return "新装";
				}
			},
			//获取我的待办列表列表
			getTodo() {
				let para = {
					showCount	  : this.pageSize,
					search_key    : this.filters.search_key
				};
				this.currentPage = 0;
				this.loading = true
				queryRequest(para).then((res) => {
					this.loading = false;
					if(res.data.result.code == 0){
						if(res.data.data.records.length == 0){
							this.loadError = true;
							Toast('没有更多数据了');
							return;
						}
						this.todo = res.data.data.records;
					}else{
						this.loadError = true;
					}
				}).catch((error) => {
					this.loading = false;
				});
			},
			//下拉刷新
			pageTodo() {
				let para = {
					currentPage   : this.currentPage,
					showCount	  : this.pageSize,
					search_key    : this.filters.search_key
				};
				this.loading = true
				queryRequest(para).then((res) => {
					this.loading = false;
					if(res.data.result.code == 0){
						if(res.data.data.records.length == 0){
							this.loadError = true;
							Toast('没有更多数据了');
							return;
						}
						Array.prototype.push.apply(this.todo, res.data.data.records); 
					}else{
						this.loadError = true;
					}
				}).catch((error) => {
					this.loading = false;
				});
			}
		},
		created(){
			this.pageTodo();
		}
	}
</script>
