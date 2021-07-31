import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 用户

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');//登入
const manage = r => require.ensure([], () => r(require('@/page/user/manage')), 'manage');//首页
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');//统计
const explain = r => require.ensure([], () => r(require('@/page/user/explain')), 'explain');//说明
const addEvidence = r => require.ensure([], () => r(require('@/page/user/addEvidence')), 'addEvidence'); //存证服务-新增存证
const infoReset = r => require.ensure([], () => r(require('@/page/user/infoReset')), 'infoReset');//个人中心-信息修改
const infoShow = r => require.ensure([], () => r(require('@/page/user/infoShow')), 'infoShow');//个人中心-个人信息（首页）
const moneyList = r => require.ensure([], () => r(require('@/page/user/moneyList')), 'moneyList');//个人中心-收支记录
const integralShop = r => require.ensure([], () => r(require('@/page/user/integralShop')), 'integralShop');//个人中心-积分商城

const notarizationListCopy = r => require.ensure([], () => r(require('@/page/user/notarizationListCopy')), 'notarizationListCopy');//公证服务-我的申办
const moneyListCopy = r => require.ensure([], () => r(require('@/page/user/moneyListCopy')), 'moneyListCopy');//个人中心-交易记录
const evidenceListCopy2 = r => require.ensure([], () => r(require('@/page/user/evidenceListCopy2')), 'evidenceListCopy2');//存证服务-存证列表

// 公证员
const manageNotarization = r => require.ensure([], () => r(require('@/page/notary/manageNotarization')), 'manageNotarization'); //首页
const haveDeal = r => require.ensure([], () => r(require('@/page//notary/haveDeal')), 'haveDeal');//公证中心-已处理列表
const myInfoReset = r => require.ensure([], () => r(require('@/page/notary/myInfoReset')), 'myInfoReset');//个人信息-信息修改
const notDeal2 = r => require.ensure([], () => r(require('@/page/notary/notDeal2')), 'notDeal2');//公证中心-待处理列表

// 公证管理员
const notarizationManage = r => require.ensure([], () => r(require('@/page/notarymanage/notarizationManage')), 'notarizationManage');//首页
const totalNotarization = r => require.ensure([], () => r(require('@/page/notarymanage/totalNotarization')), 'totalNotarization');//公证事项列表(空白)
const totalNotarizationApply = r => require.ensure([], () => r(require('@/page/notarymanage/totalNotarizationApply')), 'totalNotarizationApply');//公证申办记录
const totalFee = r => require.ensure([], () => r(require('@/page/notarymanage/totalFee')), 'totalFee');//公证缴费记录
const totalUser = r => require.ensure([], () => r(require('@/page/notarymanage/totalUser')), 'totalUser');//公证员列表（空白）
const totalEvidenceList = r => require.ensure([], () => r(require('@/page/notarymanage/totalEvidenceList')), 'totalEvidenceList');//证据列表


// 系统管理员



const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/evidenceListCopy2',
			component: evidenceListCopy2,
			meta: ['存证中心', '存证列表'],
		},{
			path: '/addEvidence',
			component: addEvidence,
			meta: ['存证中心', '新增存证'],
		},{
			path: '/notarizationListCopy',
			component: notarizationListCopy,
			meta: ['公证服务', '公证列表'],
		},{
			path: '/infoReset',
			component: infoReset,
			meta: ['个人中心', '信息修改'],
		},{
			path: '/infoShow',
			component: infoShow,
			meta: ['个人中心', '个人信息'],
		},{
			path: '/moneyList',
			component: moneyList,
			meta: ['个人中心', '收支记录'],
		},{
			path: '/moneyListCopy',
			component: moneyListCopy,
			meta: ['个人中心', '交易记录'],
		},{
			path: '/integralShop',
			component: integralShop,
			meta: ['个人中心', '积分商店'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		},]
	},
	{
		path: '/manageNotarization',
		component: manageNotarization,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/haveDeal',
			component: haveDeal,
			meta: ['公证中心', '已处理列表'],
		},{
			path: '/myInfoReset',
			component: myInfoReset,
			meta: ['个人中心', '信息修改'],
		},{
			path: '/notDeal2',
			component: notDeal2,
			meta: ['公证中心', '待处理列表'],
		}]
	},
	{
		path: '/notarizationManage',
		component: notarizationManage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/totalNotarization',
			component: totalNotarization,
			meta: ['公证管理', '公证事项列表'],
		},{
			path: '/totalNotarizationApply',
			component: totalNotarizationApply,
			meta: ['公证管理', '公证申请列表'],
		},{
			path: '/totalUser',
			component: totalUser,
			meta: ['人员管理', '公证员列表'],
		},{
			path: '/totalEvidenceList',
			component: totalEvidenceList,
			meta: ['证据管理', '证据列表'],
		}]
	},
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
