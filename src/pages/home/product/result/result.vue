<template>
    <div class="result">

      <!--<div class="search-box">
        <Search
          placeholder="产品名称"
          v-model="searchParams.product_name"
          :autoFixed="false"
          @on-submit="search"
        />
      </div>-->

      <!--<tab :line-width=2 active-color='#0fb295' v-model="index" >
        <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in tablist" @on-item-click="handleClick" :key="index">{{item}}</tab-item>
      </tab>-->
      <div class="list">
        <ul>
          <li class="item" v-for="item in listData" :key="item.id">
            <p class="item-title">{{item.product_name}}</p>
            <div class="founder-line">
              <span style="float: left">创建人: {{item.founder}}</span>
              <span style="float: right;margin-right:5%">创建时间: {{$commonFun.formatDate(item.gmt_create,'yyyy-MM-dd')}}</span>
            </div>
            <div class="clearfix item-bottom">
              <!--<div class="item-result" :class="[(searchParams.is_published=='已结束')? grayClass:redClass]">{{(searchParams.is_published=='已结束') ?'已结束':'未结束' }}</div>-->
              <div class="item-btn">
                <div class="item-stu" :class="item.is_subject_type_used?'':'disabled'" @click="goSubjectCount(item.product_type,item.id,item.is_subject_type_used)">学科分类统计</div>
                <div class="item-pro" :class="item.is_profession_type_used?'':'disabled'" @click="goProfessionCount(item.product_type,item.id,item.is_profession_type_used)">专业分类统计</div>
                <div class="item-res" :class="item.is_content_type_used?'':'disabled'" @click="goContentCount(item.product_type,item.id,item.is_content_type_used)">内容分类统计</div>
              </div>
            </div>
            <div class="border-1px"></div>
          </li>
        </ul>
        <div class="loading-more-box">
          <p class="loading-more" v-if="!hasMore">没有更多</p>
          <LoadMore v-if="hasMore" :loading-fn="loadingMore" :loading="loading"></LoadMore>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem,Search } from 'vux';
  import LoadMore from 'components/loading-more';
  export default {
    props:['product_type_list_str'],
    data(){
      return {
        api_product_list:'/pmpheep/product/list',
        index: 0,
        current: '未结束',
        tablist : ['未结束', '已结束'],
        listData:[],
        searchParams:{

          product_name:'',
          pageSize: 10,
          pageNumber: 1,
          product_type_list_str:-1

        },
        grayClass:'grayClass',
        redClass:'redClass',
        hasMore: true, // 是否还有数据
        loading: false,
      }
    },
    components: {
      Tab,
      TabItem,
      Search,
      LoadMore
    },
    created(){
      this.searchParams.product_type_list_str = this.product_type_list_str;
      this.getData();
    },
    methods:{
      /**
       * 获取数据
       */
      getData(flag){
        this.loading=true;
        this.$axios.post(this.api_product_list,this.$commonFun.initPostData(this.searchParams))
          .then(response=>{
            var res = response.data;
            var temp = flag?[]:this.listData.slice();
            if(res.code==1){
              this.listData = res.data.rows;
              this.hasMore = !res.data.last;
              this.listData = temp.concat(res.data.rows);
              this.searchParams.pageNumber++;
            }
            this.loading=false;
          })
          .catch(e=>{
            console.log(e);
            this.loading=false;
          })
      },
      /**
       * 搜索
       */
      search(){
        this.searchParams.pageNumber=1;
        /*if(this.index == 0) {
          this.searchParams.is_published = '未结束';
        } else {
          this.searchParams.is_published = '已结束';
        }*/
        this.getData(true);
      },
      /** tab切换 */
      handleClick(index){
        console.log(index);
        this.searchParams.pageNumber=1;
        /*if(index == 0) {
          this.searchParams.is_published = '未结束';
        } else {
          this.searchParams.is_published = '已结束';
        }*/
        this.getData(true);
      },
      /**
       * 去申报情况
       */
      goProfessionCount(product_type,id,used){
        if(used){
          this.$router.push({name:'临床决策情况统计',params:{product_type:product_type,index:3,product_id:id}});

        }
      },
      /**
       * 去申报情况
       */
      goSubjectCount(product_type,id,used){
        if(used){
          this.$router.push({name:'临床决策情况统计',params:{product_type:product_type,index:1,product_id:id}});
        }
      },
      /**
       * 去申报结果
       */
      goContentCount(product_type,id,used){
        if(used){
          this.$router.push({name:'临床决策情况统计',params:{product_type:product_type,index:2,product_id:id}});
        }
      },
      /**
       * 加载更多
       */
      loadingMore(){
        this.getData();
      }
    }
  }
</script>

<style>
  .search-box {
    position: relative;
    text-align: center;
  }
  .list{
    margin-top: 10px;
    background: #fff;
  }
  .list ul li{
    padding:5px 10px;
  }
  .item-bottom{
    margin: 8px 0;
  }
  .item-title{
    font-size: 18px;
  }
  .item-result{
    float: left;
    line-height: 28px;
  }
  .item-btn{
    float: right;
  }
  .item-btn div{
    float: left;
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 5px;
  }
  .item-btn .item-stu{
    padding:2px 10px;
    border:1px solid #ff6c00;
    color: #ff6c00;
    border-radius: 15px;
  }
  .item-btn .item-res{
    padding:2px 10px;
    border:1px solid #15b497;
    color: #15b497;
    border-radius: 15px;
  }
  .item-btn .item-pro{
    padding:2px 10px;
    border:1px solid #0078ff;
    color: #0078ff;
    border-radius: 15px;
  }
  .item-btn .disabled{
    border: 1px solid #959595;
    color: #959595;
  }

  .grayClass{
    color: #888888;
  }
  .redClass{
    color: #ff0000;
  }

  .founder-line{
    float: left;
    width: 100%;
    margin: 10px 0px 10px 0px;
    color: #9e9e92;
  }

</style>
