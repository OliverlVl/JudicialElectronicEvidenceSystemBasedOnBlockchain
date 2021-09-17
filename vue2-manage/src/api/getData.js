import fetch from '@/config/fetch'
//import { baseUrl } from '../config/env';


/**
 * 用户登陆
 */

export const userLogin = data => fetch('/user/login', data, 'POST');
/**
 * 公证员登陆
 */

 export const notaryLogin = data => fetch('/notar/login', data, 'POST');
/**
 * 机构管理员登陆
 */

 export const autManagerLogin = data => fetch('/aut/login', data, 'POST');
 /**
 * 系统管理员登陆
 */

export const sysManagerLogin = data => fetch('/sys/login', data, 'POST');

/**
 * 用户注册
 */

export const regist = data => fetch('/user/regist', data, 'POST');
/**
 * 公证员注册
 */

 export const notaryRegist = data => fetch('/notar/regist', data, 'POST');

 /**
 * 机构管理员注册
 */

  export const autManagerRegist = data => fetch('/aut/regist', data, 'POST');

  /**
 * 系统管理员注册
 */
 export const sysManagerRegist = data => fetch('/sys/regist', data, 'POST');

/**
 * 获取存证类型
 */
export const getEvidenceType = data => fetch('/eviTypeQuery',data,'POST');

/**
 * 新增存证
 */
export const addStorageEvidence = data => fetch('/user/storageEvidence', data, 'POST');

/**
 * 存证列表查询
 */
export const userEvidenceQuery = data => fetch('/user/evidenceQuery', data, 'POST');

/**
 * 公证机构查询
 */
 export const orgaQuery = data => fetch('/aut/orgaQuery', data, 'POST');

 /**
 * 公证类型查询
 */
export const noTypeQuery = data => fetch('/noTypeQuery', data, 'POST');

/**
 * 公证请求
 */
 export const notarReq = data => fetch('/user/notarReq', data, 'POST');

 /**
 * 公证缴费
 */
export const notarPay = data => fetch('/user/notarPay', data, 'POST');

 /**
 * 用户公证申请记录查询
 */
  export const userNotarRecord = data => fetch('/user/notarRecord', data, 'POST');

 /**
 * 用户公证申请记录查询
 */
  export const downloadUserFile = data => fetch('/downloadUserFile', data, 'POST');
  


/**
 * 我的公证材料
 */
export const materialList = data => fetch('/materialList',data);

/**
 * 公证事项详情
 */
export const notarizationDetail = data => fetch('/notarizationDetail',data);


/**
 * 公证申请列表
 */
export const notarizationApplyList = data => fetch('/notarizationApplyList',data);


/**
 * 交易记录列表（加密）
 */
export const tradeList = data => fetch('/tradeList',data);


/**
 * 公证申请记录列表（加密）
 */
export const notarizationApplyListEncrypt = data => fetch('/notarizationApplyListEncrypt',data);

/*
 * 	公证员查询公证列表
 */
export const notarRecord = data => fetch('/notar/notarRecord',data, 'POST');
/*
 * 	预约公证
 */
export const appoint = data => fetch('/notar/appoint',data, 'POST');
/*
 * 	审核结果申请
 */
export const audit = data => fetch('/notar/audit',data, 'POST');
/*
 * 	公证管理员查询公证列表
 */
export const notarmanageRecord = data => fetch('/aut/notarRecord',data, 'POST');
/*
 * 	查询证据列表
 */
export const evidenceQuery = data => fetch('/evidenceQuery',data, 'POST');
/**
* 	存证类型查询
*/
export const eviTypeQuery = data => fetch('/eviTypeQuery',data, 'POST');
/**

/**
* 	公证机构查询
*/
export const orgQuery = data => fetch('/orgQuery',data, 'POST');
/**
* 	交易记录查询
*/
export const transQuery = data => fetch('/user/transQuery',data, 'POST');

/**
* 	机构统计生成
*/
export const orgStasGen = data => fetch('/aut/orgStasGen',data, 'POST');
/**
* 	机构统计查询
*/
export const orgStasQue = data => fetch('/aut/orgStasQue',data, 'POST');
/**
* 	公证员统计生成
*/
export const notaStasGen = data => fetch('/aut/notaStasGen',data, 'POST');
/**
* 	公证员统计查询
*/
export const notaStasQue = data => fetch('/aut/notaStasQue',data, 'POST');
/**
* 	公证员排名查询
*/
export const rankStasQue = data => fetch('/aut/rankStasQue',data, 'POST');
/**
* 	公证费用查询
*/
export const notPayQuery = data => fetch('/notPayQuery',data, 'POST');







/**
* 	新增公证类型
*/
export const createType = data => fetch('/aut/createType',data, 'POST');
/**
* 	修改公证类型
*/
export const updateType = data => fetch('/aut/updateType',data, 'POST');
/**
* 	修改公证金额
*/
export const updateMoney = data => fetch('/aut/updateMoney',data, 'POST');









/**
* 	查看证据文件
*/
export const watchFile = data => fetch('/user/watchFile',data, 'POST');
/**
* 	用户信息查询
*/
export const userQuery = data => fetch('/aut/userQuery',data, 'POST');
/**
* 	公证员信息查询
*/
export const notaQuery = data => fetch('/aut/notaQuery',data, 'POST');
/**
* 	机构管理员信息查询
*/
export const autmanQuery = data => fetch('/aut/autmanQuery',data, 'POST');
/**
* 	公证总数查询
*/
export const noNumQuery = data => fetch('/noNumQuery',data, 'POST');



/**
* 	系统管理员登录
*/
export const sysLogin = data => fetch('/sys/login',data, 'POST');
/**
* 	系统管理员注册
*/
export const sysRegist = data => fetch('/sys/regist',data, 'POST');
/**
* 	系统管理员信息完善
*/
export const sysUpdate = data => fetch('/sys/update',data, 'POST');
/**
* 	机构管理员登录
*/
export const autLogin = data => fetch('/aut/login',data, 'POST');
/**
* 	机构管理员注册
*/
export const autRegist = data => fetch('/aut/regist',data, 'POST');
/**
* 	机构管理员信息完善
*/
export const autUpdate = data => fetch('/aut/update',data, 'POST');
/**
* 	购买存储空间
*/
export const memPay = data => fetch('/user/memPay',data, 'POST');
/**
* 	查询申请资料
*/
export const notarizationMaterial = data => fetch('/notarizationMaterial',data, 'POST');
/**
* 	下载申报资料
*/
export const downloadMaterialFile = data => fetch('/downloadMaterialFile',data, 'POST');

/**
* 	用户信息修改
*/
export const userUpdate = data => fetch('/user/update',data, 'POST');
/**
* 	充值
*/
export const charge = data => fetch('/user/charge',data, 'POST');
/**
* 	充值
*/
export const give = data => fetch('/user/give',data, 'POST');
/**
* 	充值
*/
export const withdraw = data => fetch('/user/withdraw',data, 'POST');
/**
* 	各个类型的数量、成功数和驳回数
*/
export const notarTypeAndNum = data => fetch('/notarTypeAndNum',data, 'POST');






