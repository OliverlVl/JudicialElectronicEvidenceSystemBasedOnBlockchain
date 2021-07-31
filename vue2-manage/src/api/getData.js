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
 * 新增存证
 */
export const addStorageEvidence = data => fetch('/storageEvidence', data, 'POST');

/**
 * 存证列表
 */
export const storageEvidenceList = data => fetch('/storageEvidenceList', data);

/**
 * 取证列表
 */
export const getEvidenceList = data => fetch('/getEvidenceList', data);


/**
 * 申请公证
 */

export const notarizationStatus = data => fetch('/notarizationStatus',data,'POST');

/**
 * 证据共享
 */

export const evidenceShare = data => fetch('/evidenceShare',data,'POST');

/**
 * 证据共享详情
 */
export const evidenceShareDetail = data => fetch('/evidenceShareDetail',data);


/**
 * 公证事项选择列表
 */
export const notarizationList = data => fetch('/notarizationList',data);

/**
 * 我的预约列表
 */
export const reservationList = data => fetch('/reservationList',data);

/**
 * 我的预约-撤销
 */
export const delReservation = data => fetch('/delReservation',data, 'POST');


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
