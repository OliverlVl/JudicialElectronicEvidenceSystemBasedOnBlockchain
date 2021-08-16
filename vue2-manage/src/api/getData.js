import fetch from '@/config/fetch'


/**
 * 登陆
 */

export const userLogin = data => fetch('/userLogin', data, 'POST');

/**
 * 注册
 */

export const userRegister = data => fetch('/user', data, 'POST');

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
 export const orgaQuery = data => fetch('/aut /orgaQuery', data, 'POST');

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
 * 我的公证材料
 */
export const materialList = data => fetch('/materialList',data);

/**
 * 公证事项详情
 */
export const notarizationDetail = data => fetch('/notarizationDetail',data);

/**
 * 公证机构列表
 */
export const agentList = data => fetch('/agentList',data);

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
export const evidenceQuery = data => fetch('/aut/evidenceQuery',data, 'POST');
/**
* 	存证类型查询
*/
export const eviTypeQuery = data => fetch('/eviTypeQuery',data, 'POST');
/**

/**
* 	公证机构查询
*/
export const orgQuery = data => fetch('/orgQuery',data, 'POST');
