<template>
  <div id="app">
    <view-box>


      <x-header slot="header" class="header"
      :left-options="{showBack:false,backText:'Back'}"
      >
      <div slot="left">直播</div>
      <div>网易</div>
      <div slot="right">搜索</div>
      </x-header>

      <sc :lock-y="true">
        <div class="tab">
            <tab>
                <tab-item selected>
                  推荐
                </tab-item>
                <tab-item>
                  要闻
                </tab-item>
                <tab-item>
                  游戏
                </tab-item>
                <tab-item>
                  科技
                </tab-item>
                <tab-item>
                  娱乐
                </tab-item>
                <tab-item>
                  体育
                </tab-item>


            </tab>
        </div>
      </sc>
<!-- scroller -->
<scroller class="my-scroller"
:on-refresh="refresh"
refresh-text="loading"
:on-infinite="infinite"
ref="myRef"
>
      <swiper
        :list="swiperList"
        v-model="swiperIndex"
        :loop="true"
      >

      </swiper>
      <marquee class="marquee">
        <marquee-item v-for="item in marqueelist" :key="item.title">{{item.title}}</marquee-item>
      </marquee>


      <panel :list="dataList"></panel>
      <panel :list="moreDatalist"></panel>
</scroller>


      <!-- 底部组件 -->
         <tabbar slot="bottom" class="tabbarr">
            <tabbar-item>
              <img slot="icon" src="./assets/icon_nav_button.png" alt="" srcset="">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item>
              <img slot="icon" src="./assets/icon_nav_article.png" alt="" srcset="">
                <span slot="label">推荐</span>
            </tabbar-item>
            <tabbar-item>
              <img slot="icon" src="./assets/icon_nav_cell.png" alt="" srcset="">
                <span slot="label">我的</span>
            </tabbar-item>
   
    </tabbar>

    </view-box>
    <router-view/>
  </div>
</template>

<script>
import {
  ViewBox,
  XHeader,
  Tabbar,
  TabbarItem,
  Tab,
  TabItem,
  Scroller as sc,
  Swiper,
  Marquee, MarqueeItem,
  Panel
} from "vux";
var refreshs=['A','B01','B02','B03','B04','B05','B06','B07','B08','B09','B010'];
var key=0;
var start=0;

var end=start+9;
var keyValue='A';

var initloaded=false;//初始化数据是否加载完成
function getRefreshKey(){
  key++;
  if(key==refreshs.length){
    key=0;
  }
  keyValue=refreshs[key];
}

export default {
  name: "app",
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Tab,
    TabItem,
    sc,
    Swiper,
    Marquee, MarqueeItem,
    Panel
  },
  created(){
  

/*     {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          title: '送你一次旅行',
          fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }
*/

    // 轮播图数据
    this.$jsonp('https://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then(data=>{
      console.log(data)
      this.swiperList=data.focus.filter(item=>{
        return item.addata===null&&item.picInfo[0]
      }).map(item=>{
        return {
          url:item.link,
          img:item.picInfo[0].url,
          title:item.title
        }
      })
    })


 // marquee数据
    this.$jsonp('https://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then(data=>{
      // console.log(data)
      this.marqueelist=data.live.filter(item=>{
        return item.addata===null&&item.picInfo[0]
      }).map(item=>{
        return {
        
          title:item.title
        
        }
      })
    })


 // 首屏列表数据
    this.$jsonp('https://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then(data=>{
      // console.log(data)
      this.dataList=data.list.filter(item=>{
        return item.addata===null&&item.picInfo[0]
      }).map(item=>{
        return {
          src:item.picInfo[0].url,
          title:item.title,
          desc:item.digest,
          url:item.link
        }
      })
      initloaded=true;
    })



  },
  data(){
/*     let datalist=[];
    for(var i=0;i<10;i++){
      datalist.push(
            {
              src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
              title: '标题二',
              desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
              url: {
                path: '/component/radio',
                replace: false
              }
            }

      )
    } */
    return {
      swiperList:[],
      swiperIndex:0,
      marqueelist:[], 
      dataList:[],
      moreDatalist:[]
    }
  },
  methods:{
    refresh(){
      // console.log("1")
      getRefreshKey();
      this.$jsonp('https://3g.163.com/touch/jsonp/sy/recommend/0-9.html',{
        miss:"00",
        refresh:keyValue
      }).then(data=>{
        console.log(data)
        // console.log(this.$refs.myRef)
        this.dataList=data.list.filter(item=>{
          return item.addata===null&&item.picInfo[0];
          }).map(item=>{
            return {
              src:item.picInfo[0].url,
              title:item.title,
              desc:item.digest,
              url:item.link
              
            }
          })
          this.$refs.myRef.finishPullToRefresh();
          // console.log(this.datalist.length)
          this.$vux.toast.text("当前一共刷新了"+this.dataList.length+"条数据","top")

      })

    },
    infinite(){
      
      // http://3g.163.com/touch/jsonp/sy/recommend/'+start+'-'+end+'.html 

      if(!initloaded){
        this.$refs.myRef.finishInfinite();
        return;
      }
      console.log("2")
      this.$jsonp('https://3g.163.com/touch/jsonp/sy/recommend/'+start+'-'+end+'.html',{
        miss:"00",
        refresh:keyValue
      }).then(data=>{
          // 上啦加载更多
            setTimeout(()=>{
                  this.moreDatalist=data.list.filter(item=>{
                    return item.addata===null&&item.picInfo[0];
                  }).map(item=>{
                    return {
                      src:item.picInfo[0].url,
                      title:item.title,
                      desc:item.digest,
                      url:item.link
                    }
                  })
                  this.moreDatalist=this.moreDatalist.concat(this.dataList)
                  console.log(this.moreDatalist)
                  start+=10;
                  end=start+9;
                  this.$refs.myRef.finishInfinite();

            },1000)

      })


    }
  }



};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
}
#app {
  height: 100%;
  .header{position: absolute;left: 0px;top: 0px;width: 100%;z-index: 9}
  .my-scroller{top:90px}
  .tab {
    margin-top: 46px;
    width: 1200px;
  }
  .loading-layer{margin-bottom: 90px;}
  .marquee{margin:10px;}
  .weui-media-box_appmsg .weui-media-box__hd{width: 102px;height: 92px;}
  .weui-media-box__bd{height: 92px}
  #app .weui-media-box__hd img{height: auto}
  .tabbarr{position: fixed;bottom: 0px;left: 0px;}
}
</style>
