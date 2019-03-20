/* 
* @description: vas平台路由管理控制中心，组件关系配置 
* @author: wp 
* @update: 2017-05-2
*/ 
//懒加载首页图表区
const Main = resolve => require(['components/main'], resolve);

/* 业务管理 start*/

//新建安装单
import formProcess from 'components/businessManage/formProcess'
//新建安装单-单独用
import formProcessCorp from 'components/businessManage/formProcessCorp'
//新装派单
import distributeLeaflets from 'components/businessManage/declarationFormProcess/distributeLeaflets'
//新装审核
import toExamine from 'components/businessManage/declarationFormProcess/toExamine'
//我的待办
import formMain from 'components/businessManage/formMain'

//我的已办
import myHandle from 'components/businessManage/myHandle'
//我的请求
import myRequest from 'components/businessManage/myRequest'

//拆除报单
import dismantleCustomerDeclaration from 'components/businessManage/dismantleFormProcess/customerDismantle'
//拆除派单
import dismantleDistributeLeaflets from 'components/businessManage/dismantleFormProcess/distributeLeaflets'
//拆除审核
import dismantleToExamine from 'components/businessManage/dismantleFormProcess/toExamine'


//维修报单
import serviceCustomerDeclaration from 'components/businessManage/customerService/customerService'
//维修派单
import serviceDistributeLeaflets from 'components/businessManage/customerService/distributeLeaflets'
//维修审核
import serviceToExamine from 'components/businessManage/customerService/toExamine'

//新装补登
import newOrderSupplement from 'components/businessManage/declarationFormProcess/newOrderSupplement'
/* 业务管理 end*/


//用户个人信息
import userInfo from 'components/comment/userInfo'


//eacharts图表
import personnelDesk from 'components/desk/personnelDesk'


//历史状态
import pagehistory from 'components/desk/pagehistory'

const routes = [
	{
		path: '/',
		component: Main,
		name: '',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		children: [
			{ path: '/formProcess', component:formProcess ,name: '新建安装单'},
			{ path: '/formProcessCorp', component:formProcessCorp ,name: '外部报单'},
			{ path: '/dismantle', component:dismantleCustomerDeclaration ,name: '新建拆除单'},
			{ path: '/service', component:serviceCustomerDeclaration ,name: '新建维修单'},
			{ path: '/formMain', component:formMain , name: '我的待办'},
			{ path: '/distributeLeaflets', component:distributeLeaflets , name: '新装派单' },
			{ path: '/toExamine', component:toExamine , name: '新装审核' },
			{ path: '/serviceToExamine', component:serviceToExamine , name: '维修审核' },
			{ path: '/serviceDistributeLeaflets', component:serviceDistributeLeaflets , name: '维修派单' },
			{ path: '/dismantleToExamine', component:dismantleToExamine , name: '拆除审核' },
			{ path: '/dismantleDistributeLeaflets', component:dismantleDistributeLeaflets , name: '拆除派单' },
			{ path: '/myHandle', component:myHandle , name: '我的已办' },
			{ path: '/myRequest', component:myRequest , name: '我的请求'},
			{ path: '/userInfo', component:userInfo, name: '我的信息'},
			{ path: '/orderSupplement', component:newOrderSupplement , name: '新装补登'},
			{ path: '/personnelDesk', component:personnelDesk , name: '图表'},
			{ path: '/pagehistory', component:pagehistory , name: '历史状态'},
		]
	},
];
export default routes;