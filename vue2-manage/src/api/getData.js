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


















































/**
* 	公证员信息修改
*/
export const notarregist = data => fetch('/notar/regist',data, 'POST');
/**
* 	公证员信息修改
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
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');









/**
 * 获取用户分布信息
 */

 export const addEvidence = () => fetch('/user/addEvidence');

