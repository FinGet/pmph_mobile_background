<template>
  <div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="个人资料">
        <div slot="right" class="">
          <div class="header-right-btn top-header-button">
            <ul>
              <li id="save" @click="toSaveUserInfo">
                保存
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
    <group>
      <x-input title="姓名：" type="text" v-model="userInfo.realname" ref="usernameInput" />
      <x-input title="手机号：" type="text" v-model="userInfo.handphone" />
      <x-input title="邮箱：" type="text" v-model="userInfo.email" />
    </group>
  </div>
</template>
<script>
import { Group } from 'vux';
import Header from 'components/header';
import XInput from "../../../../node_modules/vux/src/components/x-input/index";
    export default{
        data(){
            return{
              api_get_userInfo:'/pmpheep/users/pmph/getInfo',
              api_save_userInfo:'/pmpheep/users/pmph/updatePersonalData',
              group_image_upload:'/pmpheep/group/files',
              userInfo:{},
              uploading:false
            }
        },
        components: {
          Group,Header,XInput
        },
        created(){
          this.getUserInfo();
        },
        computed:{
        },
        methods:{
            /**
             * 获取当前用户信息
             */
            getUserInfo(){
              this.$axios.get(this.api_get_userInfo,{params:{
                id:this.userInfo.id
              }})
                .then(response=>{
                  let res = response.data;
                  if (res.code === 1) {
                    this.userInfo = res.data;
                    this.$refs.usernameInput.focus();
                  }
                })
                .catch(function (error) {});
           },
           /**
            * 保存当前用户信息
            */
           toSaveUserInfo(){
             this.saveUserInfo();
           },
           /**
            * 保存当前用户信息
            */
           saveUserInfo(){
             this.$axios({
               method:'PUT',
               url:this.api_save_userInfo,
               data:this.$commonFun.initPostData({
                 id:this.userInfo.id,
                 realname:this.userInfo.realname,
                 handphone:this.userInfo.handphone,
                 email:this.userInfo.email,
                 sessionId:this.$getUserData().sessionId,
               })
             }).then((res)=>{
               if(res.data.code==1){
                 // 修改 sessionStorage 里面的用户姓名
                 var currentUser = this.$commonFun.mySessionStorage.get('currentUser','json');
                 currentUser.sessionPmphUser.realname = this.userInfo.realname;
                 this.$commonFun.mySessionStorage.set('currentUser',currentUser,'json');
                 // 操作提示
                 this.$vux.toast.show({
                   text: '保存成功！'
                 });
                 // 跳转
                 this.$router.push({name:'个人资料'});
               }else{
                 this.$vux.toast.show({
                   text:res.data.data,
                   type:'cancel'
                 });
               }
             })
               .catch((error) => {
                 this.$vux.toast.show({
                   text:error,
                   type:'cancel'
                 });
               });
           },
        }
    }
</script>
<style lang="less"  scoped >
  /* 覆盖x-input的默认样式 */
  .vux-x-input /deep/ input.weui-input {
    text-align: left;
  }
</style>
