<template>
    <div class="fillcontain">
        <!--个人信息栏-->
        <head-top></head-top>
        <div class="info_container" style="margin-top: 30px">
        <el-row class="info_row" :gutter="10">


                <el-col :span="9">
                <div class="area">
                    <div class="moneyarea">
                        <p class="title">可用余额:</p>
                        <p class="title"><span class="money">1000.00</span><span class="yuan">元</span></p>
                    </div>
                    <div class="chongzhiarea">
                        <!-- <img :src="toMPicimg"/> -->
                        <p class="chongzhi">
                            <el-button type="success" size="">我要转赠</el-button>
                            <el-button type="warning" size="">充值</el-button>
                            <el-button type="danger" size="">提现</el-button>
                        </p>
                    </div>
                    <div class="tipsarea">
                        <p><el-checkbox v-model="checked"></el-checkbox>我已阅读并同意以下<a href="http://www.baidu.com" target="_blank">《用户须知》</a>的内容</p>
                    </div>
                </div>
                </el-col>
                <el-col :span="10">
                <div class="area" style="width:760px">
                    <div class="moneyarea">
                        <p class="title">支付方式</p>
                    </div>
                    <div class="chongzhiarea">
                        <img :src="aliPayImg"/>
                        <img :src="weChatPayImg"/>
                    </div>
                    <div class="tipsarea">
                        <p>您的每笔交易资金，都将接受银行全程存管   <a href="http://www.baidu.com" target="_blank">了解资金存管 》</a></p>
                    </div>
                </div>
                </el-col>
                
        </el-row>
        <!--套餐信息栏-->
        <el-row class="data_row row" :gutter="10">
            <p class="title" style="padding-left:10px;padding-bottom:10px">套餐购买</p>
                <el-col :span="6">
                <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />兑换200公证币</p> 
                    <p class="num"><span class="symbol">￥</span>20.00</p>
                    <a class="detail dbgcolor">确认购买&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />兑换500公证币</p>
                    <p class="num"><span class="symbol">￥</span>50.00</p>
                    <a class="detail zbgcolor">确认购买&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />兑换1000公证币</p>
                    <p class="num"><span class="symbol">￥</span>100.00</p>
                    <a class="detail dbgcolor">确认购买&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
                <el-col :span="6">
                <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />兑换2000公证币</p>
                    <p class="num"><span class="symbol">￥</span>200.00</p>
                    <a class="detail zbgcolor">确认购买&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
    export default {
        data(){
            return {
               bandata:[
                   {url:'http://www.baidu.com',data:300},
                   {url:'http://www.sina.com',data:200},
                   {url:'http://www.360.com',data:100},
                   {url:'http://www.weibo.com',data:0},
                   {url:'http://www.hao123.com',data:100},
               ],
              avatarImg: require('@/assets/img/avatar-2.jpg'),
              toMPicimg: require('@/assets/img/toMPic02.png'),
              aliPayImg: require('@/assets/img/alipay.png'),
              weChatPayImg: require('@/assets/img/weichatpay.png'),
              checked: true,
            }
        },
      	mounted() {
         
        },
        components: {
    		headTop,
    	},
        methods: {
        },
    }
</script>

<style lang="less" scoped>
    .info_container{
       padding: 20px;
       background: #fff;
       box-sizing: border-box;
       overflow: auto;
    }
    .row{
        margin:20px;
    }
   .info_row{
        .area{
           border:1px solid #dfdfdf;
           height:178px;
           overflow:hidden;
            .imgarea{
                text-align:center;
                padding:10px;
                img {
                    width:120px;
                    height:120px;
                    border-radius: 50%;
                }
            }
            .namearea{
                padding:10px;
                font-size:14px;
                p{
                    line-height:24px;
                }
                .awards{
                    text-align:center;
                    width:100%;
                    height:30px;
                    line-height:30px;
                    cursor: pointer;
                    background-color: #3bc5ff;
                    border:1px solid #3bc5ff;
                    color: white;
                    display: block;
                }
                .awards:hover{
                    background-color: #f9c855;
                    border:1px solid #f9c855;
                }
            }
            .moneyarea{
                padding:10px;
                float:left;
                .title{
                    font-size:15px;
                    font-weight:bolder;
                    line-height:50px;
                    .money{
                        color:#c10000;
                        margin-right:5px;
                    }
                    .yuan{
                            font-weight:100;
                            font-size:13px;
                    }
                }
                
            }
            .chongzhiarea{
                    padding:10px;
                    text-align:center;
                    img{
                        width: 240px;
                        height: 110px;
                    }
                    .chongzhi{
                        margin-top:10px;
                    }
            }
            .tipsarea{
                clear:both;
                font-size:14px;
                padding:10px;
                padding-top:15px;
                a{
                    color:#3bc5ff;
                }
            }
            .dataarea{
                 padding:10px;
                 text-align:center;
                 font-size:14px;
                .gtitle{
                    width:100%;
                    height:30px;
                    line-height:30px;
                    cursor: pointer;
                    background-color: #3bc5ff;
                    color: white;
                    display: block;
                }
                .gdataarea{
                    padding-left: 25px;
                    p{
                        line-height:38px;
                    }
                    .num{
                        font-weight:bolder;
                        color:#c10000;
                    }
                    .title{
                        color:#3bc5ff;
                    }
                    .gdata{
                        margin:10px;
                    }
                }
                .morearea{
                    a{
                        color:#3bc5ff;
                    }
                }
            }
        }
   } 
   .data_row{
       font-size:18px;
       .area{
           border:1px solid #dfdfdf;
           height:200px;
           overflow:hidden;
           padding:10px;
           text-align:center;
           font-weight:bolder;
            .symbol{
                font-size: 16px;
                font-style: italic;
                font-family: "microsoft yahei";
                margin-right: 10px;
                color:#232323;
                font-weight:100;
            }
           p{
               line-height:70px;
           }
           .num{
               color:#c10000;
           }
           .detail{
               margin-top:5px;
               font-size:14px;
               text-align: center;
               width: 100%;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                color: white;
                display: block;
                border:1px solid #3bc5ff;
           }
           .dbgcolor{
              background-color: #3bc5ff;
           }
           .zbgcolor{
               color:#3bc5ff;
           }
           .dbgcolor:hover{
                background-color: #fff;
                color:#3bc5ff
           }
           .zbgcolor:hover{
                background-color: #3bc5ff;
                color:#fff;
           }
       }
   }

</style>


