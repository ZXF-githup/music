<template>
  <div class="body">
      <!-- 头部开始 -->
  <div class="head">
    <div class="hctx">
      <img src="../assets/img/back.png" @click="back">
      <span>评论</span>
      <img src="../assets/img/song2.png">
    </div>
  </div>
  <div style="width:100%;height:60px"></div> <!-- 用来撑开头部 -->
  <!-- 头部结束 -->

  <!-- 主体开始 -->
  <div class="main">
    <div class="mctx">

      <div class="mHead">
        <div class="mHctx">
          <img style="width:100px;border-radius:5px;" src="../assets/img/build3.jpg">
          <span>愿你</span>
          <span>by</span>
          <span>愿你</span>
        </div>
      </div>

      <div class="good">
        <p>精彩评论</p>
      </div>

      <div class="mBody" v-for="(item,index) in commentList" :key="index">
        <div class="list">
          <div class="list1">
            <div class="img">
              <img style="width:50px;border-radius:50%" :src="item.user.avatarUrl">
            </div>
            <div>
              <span class="s1">{{item.user.nickname}}</span><br>
              <span class="s2">2019年11月14日20:44:32</span>
            </div>
            <div class="img">
              <span style="font-size:12px;color:#fff;">{{item.likedCount}}</span>
              <img style="width:20px" src="../assets/img/con1.png">
            </div>
          </div>
          <div class="list2">
            <div style="flex:1;"></div>
            <div class="lctx">
              {{item.content}}
            </div>
          </div>
        </div>   
      </div>

    </div>
  </div>
  <!-- 主体结束 -->

  <!-- 底部开始 -->
  <div class="foot">
    <div class="fctx">
      <div class="fctx1">
        <input type="text" placeholder="听了这么多，可能你有话想说">
      </div>
      <div class="fctx2">
        <img src="../assets/img/con2.png">
        <img src="../assets/img/con3.png">
      </div>
      <span>发送</span>
    </div>
  </div>
  <div style="width:100%;height:40px;"></div>
  <!-- 底部结束 -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Comment",
  data() {
    return {
      commentList:[]
      
    }
    
  },
  methods:{
    back(){
      this.$router.history.go(-1);
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.$axios.post('/comment/playlist',{id:id}).then(res=>{
      // console.log(res)//将当前专辑的所有与相关的评论信息打印出来
      this.commentList = res.data.comments;//将评论内容赋值给评论列表
      // console.log(this.commentList)
    }).catch(err=>{
      console.log(err)
    })
  }  
};
</script>

<style scoped>
    .body {
      background: linear-gradient(120deg, #79ce0a, #ff7300);
      margin: 0;
      padding: 0;
    }
    .head {
      position: fixed;
      z-index: 99;
      top: 0;
      left: 0;
      width: 100%;
      padding: 10px 0;
      color: #fff;
      background: linear-gradient(90deg, #f7a841,#74a00d);
      font-size: 18px;
    }
    .hctx {
      width: 96%;
      height: 40px;
    }
    .head img:nth-child(1) {
      width: 20px;
      margin: -3px 15px;
    }
    .head img:nth-child(3) {
      width: 20px;
      margin: 10px 0;
      float: right;
    }
    .head span {
      line-height: 40px;
    }
    /*---------------------------*/
    .main{
      width: 100%;
    }
    .mctx{
      width: 90%;
      margin: 10px auto;
    }
    .mHead{
      width: 100%;
      position: relative;
    }
    .mHctx span:nth-child(2){
      position: absolute;
      margin: 20px 0 0 20px;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 20px;
      color: #fff;
    }
    .mHctx span:nth-child(3){
      position: absolute;
      margin: 50px 0 0 20px;
      font-size: 12px;
      color: #fff;
    }
    .mHctx span:nth-child(4){
      position: absolute;
      margin: 50px 0 0 40px;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      color: #031a80
    }
    /*---------------------------*/
    .good{
      color: #fff;
      font-weight: bold;
    }
    /*---------------------------*/
    .list{
      margin-top: 10px;
      width: 100%;
      position: relative;
    }
    .list1{
      width: 100%;
      height: 40px;
      display: flex;
    }
    .list1 .img{
      flex: 1;
      text-align: center;
    }
    .list1 div{
      flex: 6;
      height: 40px;
      line-height: 20px;
    }
    .list1 div .s1{
      margin-left: 10px;
      font-size: 16px;
      color: #eee;
    }
    .list1 div .s2{
      margin-left: 10px;
      font-size: 12px;
      color: #ddd;
    }
    /*---------------------------*/
    .list2{
      width: 100%;
      display: flex;
    }
    .list2 .lctx{
      margin: 0 10px;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      flex: 7;
      border-bottom: 1px solid;
    }
    /*---------------------------*/
    .foot{
      width: 100%;
    }
    .fctx{
      position: fixed;
      z-index: 99;
      background: linear-gradient(120deg,#f7a841,#74a00d);
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      display: flex;
    }
    .fctx1{
      flex: 6;
      line-height: 40px;
    }
    .fctx1 input{
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      background-color: transparent;
      padding-left: 10px;
    }
    .fctx1 input::placeholder{
      padding-left: 12px;
      color: #eee;
    }
    .fctx2{
      flex: 2;
      text-align: center;
      line-height: 40px;
    }
    .fctx2 img{
      width: 25px;
      vertical-align: middle;
      margin: 0 5px;
    }
    .fctx span{
      text-align: center;
      flex: 1;
      color: #eee;
      font-size: 14px;
      line-height: 40px;
      padding-right: 10px;
    }
    
</style>