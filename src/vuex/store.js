import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 应用初始状态
const state = {
    orderRowInfo:'',
    tabbarType:'1',
    // IMG_URL:'https://wanwangblob.blob.core.chinacloudapi.cn/image-test/',
    IMG_URL:'/img/'
}

// 定义所需的 mutations
const mutations = {
    //记录我的待办点击一行 的数据
    ORDER_ROWINFO(state,row){
        state.orderRowInfo = row;
    },
    //记录我的待办tab类型值
    TABBAR_TYPE(state,number){
        state.tabbarType = number;
    },
}

// 定义所需的 actions
const actions = {
    orderRowInfo({commit},row){
        commit('ORDER_ROWINFO',row)
    },
    tabbarType({commit},number){
        commit('TABBAR_TYPE',number)
    }
}

// 定义所需的 getters
const getters = {
    orderRowInfo: state => state.orderRowInfo,
    tabbarType: state => state.tabbarType
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});

// 创建 store 实例
export default store;