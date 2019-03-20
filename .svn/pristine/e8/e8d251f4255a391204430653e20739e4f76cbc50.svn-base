<!--* 
* @description: 我的请求
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
    <section>
        <mt-search v-model="filters.search_key" cancel-text="取消" placeholder="请输入关键信息"></mt-search>
        <ul class="tabslider yb-ul" 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50">
        <li class="clearfix" v-for="props in todo" @click="orderClick(props)">
            <div class="yb-ul-title clearfix">
                <h1 class="zq-name fL"><i class="iconfont icon-dingdan"></i>{{ props.name }}</h1>
                <span class="pro-name fL cles">{{ props.candidateUsers }}</span>
                <span class="hy-b fR">{{ props.flowData.corpname }}</i></span>
            </div>
            <div class="yb-ul-inf clearfix">
                <a href="javascript:void(0);">
                    <template v-if="props.flowData.proc_desc">
                        <template v-if="props.flowData.proc_desc.indexOf('#') != -1">
                            <span>{{ props.flowData.proc_desc.split('#')[0] }}</span>
                            <span class="color_rgba1" :style="{background:props.flowData.proc_desc.substr(props.flowData.proc_desc.indexOf('#'),7)}"></span>
                        </template>
                        <template v-else>
                            {{ props.flowData.proc_desc }}
                        </template>
                    </template>
                </a>
                <span class="yb-time cles" v-if="props.createTime">{{ util.formatDate.format(new Date(props.createTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
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
    import util from '../../../common/js/util';
    import {getTodoInfoList} from '../../../api/api';
    export default {
        data() {
            return {
                loading: false,
                util:util,
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
            //点击订单跳转到对应派单界面
            orderClick(row){
                this.$store.dispatch("orderRowInfo",row);
                if(row.taskDefinitionKey.indexOf("verify") != -1 && row.taskDefinitionKey.indexOf("service_verify") == -1){
                    this.$router.push('/serviceDistributeLeaflets');
                }
                if(row.taskDefinitionKey.indexOf("service_verify") != -1){
                    this.$router.push('/serviceToExamine');
                }
            },
            //滚动到底部加载更多列表信息
            loadMore(){
                if(this.filters.search_key || this.loading || this.loadError) return;
                this.currentPage++;
                this.pageTodo();
            },
            //获取我的待办列表列表
            getTodo() {
                let para = {
                    currentPage   : this.currentPage,
                    showCount     : this.pageSize,
                    ownername: this.filters.search_key,
                    type:3
                };
                this.currentPage = 0;
                this.loading = true
                getTodoInfoList(para).then((res) => {
                    this.loading = false;
                    if(res.data.result.code == 0){
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
                    showCount     : this.pageSize,
                    ownername: this.filters.search_key,
                    type:3
                };
                this.loading = true
                getTodoInfoList(para).then((res) => {
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
        }
    }
</script>
