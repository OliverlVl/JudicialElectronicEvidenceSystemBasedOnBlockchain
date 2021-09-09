import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 用户

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');//登入
const manage = r => require.ensure([], () => r(require('@/page/user/manage')), 'manage');//首页
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');//统计
const explain = r => require.ensure([], () => r(require('@/page/user/explain')), 'explain');//说明
const addEvidence = r => require.ensure([], () => r(require('@/page/user/addEvidence')), 'addEvidence'); //存证服务-新增存证
const userInfoReset = r => require.ensure([], () => r(require('@/page/user/userInfoReset')), 'userInfoReset');//个人中心-信息修改
const capacityPackage = r => require.ensure([], () => r(require('@/page/user/capacityPackage')), 'capacityPackage');//个人中心-容量套餐
const wallet = r => require.ensure([], () => r(require('@/page/user/wallet')), 'wallet');//个人中心-钱包
const notarizationListCopy = r => require.ensure([], () => r(require('@/page/user/notarizationListCopy')), 'notarizationListCopy');//公证服务-我的申办
const moneyListCopy = r => require.ensure([], () => r(require('@/page/user/moneyListCopy')), 'moneyListCopy');//个人中心-交易记录
const evidenceListCopy2 = r => require.ensure([], () => r(require('@/page/user/evidenceListCopy2')), 'evidenceListCopy2');//存证服务-存证列表
const userIndex = r => require.ensure([], () => r(require('@/page/user/userIndex')), 'userIndex');//个人信息
// 公证员
const manageNotarization = r => require.ensure([], () => r(require('@/page/notary/manageNotarization')), 'manageNotarization'); //首页
const haveDeal = r => require.ensure([], () => r(require('@/page//notary/haveDeal')), 'haveDeal');//公证中心-已处理列表
const myInfoReset = r => require.ensure([], () => r(require('@/page/notary/myInfoReset')), 'myInfoReset');//个人信息-信息修改
const notDeal2 = r => require.ensure([], () => r(require('@/page/notary/notDeal2')), 'notDeal2');//公证中心-待处理列表
const bookDeal = r => require.ensure([], () => r(require('@/page/notary/bookDeal')), 'bookDeal');
const notaryIndex = r => require.ensure([], () => r(require('@/page/notary/notaryIndex')), 'notaryIndex');

// 公证管理员
const notarizationManage = r => require.ensure([], () => r(require('@/page/notarymanage/notarizationManage')), 'notarizationManage');//首页
const totalNotarization = r => require.ensure([], () => r(require('@/page/notarymanage/totalNotarization')), 'totalNotarization');//公证事项列表(空白)
const totalNotarizationApply = r => require.ensure([], () => r(require('@/page/notarymanage/totalNotarizationApply')), 'totalNotarizationApply');//公证申办记录
// const totalFee = r => require.ensure([], () => r(require('@/page/notarymanage/totalFee')), 'totalFee');//公证缴费记录
const totalUser = r => require.ensure([], () => r(require('@/page/notarymanage/totalUser')), 'totalUser');//公证员列表（空白）
const totalNotary = r => require.ensure([], () => r(require('@/page/notarymanage/totalNotary')), 'totalNotary');//公证员列表（空白）
const totalEvidenceList = r => require.ensure([], () => r(require('@/page/notarymanage/totalEvidenceList')), 'totalEvidenceList');//证据列表
const NMIndex = r => require.ensure([], () => r(require('@/page/notarymanage/NMIndex')), 'NMIndex');//公证员列表（空白）
const notaryManageInfo = r => require.ensure([], () => r(require('@/page/notarymanage/notaryManageInfo')), 'notaryManageInfo');

// 系统管理员
const systemManage = r => require.ensure([], () => r(require('@/page/system/systemManage')), 'systemManage');//首页
const systemUser = r => require.ensure([], () => r(require('@/page/system/systemUser')), 'systemUser');//用户列表
const systemNotary = r => require.ensure([], () => r(require('@/page/system/systemNotary')), 'systemNotary');//公证员列表
const systemNotaryManager = r => require.ensure([], () => r(require('@/page/system/systemNotaryManager')), 'systemNotaryManager');//公证管理员列表
const systemNotarization = r => require.ensure([], () => r(require('@/page/system/systemNotarization')), 'systemNotarization');//公证记录
const systemEvidence = r => require.ensure([], () => r(require('@/page/system/systemEvidence')), 'systemEvidence');//存证记录
const systemTrace = r => require.ensure([], () => r(require('@/page/system/systemTrace')), 'systemTrace');//交易记录
const systemManageInfo = r => require.ensure([], () => r(require('@/page/system/systemManageInfo')), 'systemManageInfo');//个人信息
const systemIndex = r => require.ensure([], () => r(require('@/page/system/systemIndex')), 'systemIndex');//个人信息

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
		}, {
			path: '/evidenceListCopy2',
			component: evidenceListCopy2,
			meta: ['存证服务', '存证列表'],
		}, {
			path: '/addEvidence',
			component: addEvidence,
			meta: ['存证服务', '新增存证'],
		}, {
			path: '/notarizationListCopy',
			component: notarizationListCopy,
			meta: ['公证服务', '公证列表'],
		}, {
			path: '/capacityPackage',
			component: capacityPackage,
			meta: ['个人中心', '容量套餐'],
		}, {
			path: '/wallet',
			component: wallet,
			meta: ['个人中心', '钱包'],
		}, {
			path: '/moneyListCopy',
			component: moneyListCopy,
			meta: ['个人中心', '交易记录'],
		}, {
			path: '/userInfoReset',
			component: userInfoReset,
			meta: ['个人中心', '信息修改'],
		}, {
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		},{
			path: '/userIndex',
			component: userIndex,
			meta: ['首页'],
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
		}, {
			path: '/haveDeal',
			component: haveDeal,
			meta: ['公证中心', '个人已完成列表'],
		}, {
			path: '/myInfoReset',
			component: myInfoReset,
			meta: ['信息管理', '个人信息'],
		}, {
			path: '/notDeal2',
			component: notDeal2,
			meta: ['公证中心', '个人待处理列表'],
		}, {
			path: '/bookDeal',
			component: bookDeal,
			meta: ['公证中心', '可公证列表'],
		}, {
			path: '/notaryIndex',
			component: notaryIndex,
			meta: ['首页'],
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
		}, {
			path: '/totalNotarization',
			component: totalNotarization,
			meta: ['公证管理', '待处理列表'],
		}, {
			path: '/totalNotarizationApply',
			component: totalNotarizationApply,
			meta: ['公证管理', '已处理列表'],
		}, {
			path: '/totalUser',
			component: totalUser,
			meta: ['人员管理', '用户列表'],
		},
		{
			path: '/totalNotary',
			component: totalNotary,
			meta: ['人员管理', '公证员列表'],
		}, {
			path: '/totalEvidenceList',
			component: totalEvidenceList,
			meta: ['证据管理', '证据列表'],
		},{
			path: '/NMIndex',
			component: NMIndex,
			meta: ['首页'],
		},{
			path: '/notaryManageInfo',
			component: notaryManageInfo,
			meta: ['信息管理','个人信息'],
		},]
	},{
	path: '/systemManage',
	component: systemManage,
	name: '',
	children: [{
		path: '',
		component: home,
		meta: [],
	}, {
		path: '/systemUser',
		component: systemUser,
		meta: ['成员管理', '用户列表'],
	}, {
		path: '/systemNotary',
		component: systemNotary,
		meta: ['成员管理', '公证员列表'],
	}, {
		path: '/systemNotaryManager',
		component: systemNotaryManager,
		meta: ['成员管理', '机构管理员列表'],
	}, {
		path: '/systemNotarization',
		component: systemNotarization,
		meta: ['记录查询', '公证记录'],
	},{
		path: '/systemEvidence',
		component: systemEvidence,
		meta: ['记录查询', '存证记录'],
	}, {
		path: '/systemManageInfo',
		component: systemManageInfo,
		meta: ['个人中心', '个人信息'],
	},, {
		path: '/systemTrace',
		component: systemTrace,
		meta: ['记录查询', '交易记录'],
	},{
		path: '/systemIndex',
		component: systemIndex,
		meta: ['首页'],
	},
	]
	},
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
