<template>
  <div class="playbox">  <!--:style='bg+this.$store.state.cursong.al.picUrl+")"'-->
     <!-- 头部开始 -->
  <div class="head">
    <div class="hContent">
      <img id="img1" src="../assets/img/back.png" @click="back()">
      <div class="img2">
        <div>
          {{$store.state.cursong.name}}
        </div>
        <small>
          {{$store.state.cursong.ar[0].name}}
        </small>
      </div>
      <img id="img3" src="../assets/img/song2.png" alt="">
    </div>
  </div>
  <!-- 头部结束 -->
  <!-- 主体开始 -->
  <div class="main">
    <div class="mContent">
      <div class="border">
        <img  class="run" :class="{stop:!flag}" src="../assets/img/cd.png">
        <img  class="run" :class="{stop:!flag}" :src="$store.state.cursong.al.picUrl">
      </div>
    </div>
  </div>
  <!-- 主体结束 -->
  <!-- 底部开始 -->
  <div class="foot">
    <div class="foot1"> <!--  -->
      <i><img src="../assets/img/unlike.png" alt=""></i>
      <i><img src="../assets/img/mn3.png" alt=""></i>
      <i><img src="../assets/img/fish.png" alt=""></i>
      <i><img src="../assets/img/plun.png" alt=""></i>
      <i><img src="../assets/img/more.png" alt=""></i>
    </div>
    <div class="foot2"> <!-- 这是播放进度条 -->
      <!-- <audio src="https://music.163.com/song/media/outer/url?id=1331819951.mp3" controls >
      </audio> -->
      <div class="box">
        <span class="s1">00:00</span>
        <div class="length">
          <div class="d"></div>
          <div class="dot"></div>
        </div>
        <span class="s2">05:20</span>
      </div>
      

    </div>
    <div class="foot3">
      <i><img src="../assets/img/xh.png"></i>
      <i @click="pre()"><img src="../assets/img/left.png"></i>
      <i v-if="flag" @click="play(false)"><img class="play" src="../assets/img/pause.png"></i>
      <i v-else @click="play(true)"><img class="play" src="../assets/img/play.png"></i>
      <i @click="next()"><img src="../assets/img/right.png"></i>
      <i @click="a()"><img src="../assets/img/list.png"></i>
    </div>
  </div>
  <!-- 底部结束 -->
  <div class="listArea" v-show="h">
    <div class="listContent">
      <!-- listHead Start -->
      <div class="listHead">
        <div class="listLeft">
          <img src="../assets/img/xh.png" alt="">
          <span>列表循环</span>
          <span>(99)</span>
        </div>
        <div style="flex:.6;"></div>
        <div class="listRight">
          <img src="../assets/img/collectAll.png" alt="">
          <span>收藏全部</span>
          <span>&nbsp;|&nbsp;</span>
          <img src="../assets/img/deleteAll.png" alt="">&nbsp;&nbsp;
          <img src="../assets/img/delete.png" @click="a()">
        </div>
      </div>
      <div style="height:40px"></div>
      <!-- listHead End -->
      <hr style="border:.4px solid #eee;">
      <!-- listBody Start -->
     <div class="listBody">
        <div class="listList" :class="{cur:getcurindex()==index}"  v-for="(item,index) in list" :key="index" @click="playcur(item)">
          <span>{{item.name}}</span>
          <span> - </span>
          <span v-for="(singer,index) in item.ar" :key="index">{{singer.name}}</span>
          <img src="../assets/img/delete.png" @click.stop="del(item)">
        </div>
      </div>
      <!-- listBody End -->
    </div>
  </div>
  <div class="over"></div>
    
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Play",
  data() {
    return {
      h:false,
      bg:'background-image: url('
    }
  },
  methods:{
    getcurindex(){
      let cur = this.$store.state.cursong;
      // console.log(cur)
      let list = this.$store.state.playlist;
      let index = 0;
      for(let i=0;i<list.length;i++){
        if(list[i].id==cur.id){
          index = i;
          break;
        } 
      }
      return index
    },
    back(){
      this.$router.history.go(-1);
    },
    a(){
     this.h=!this.h
    },
    play(flag){
      console.log(this.$store.state.cursong)
      this.$store.commit('changeflag',flag);
    },
    playcur(song){
      this.$store.commit('changecur',song)
    },
    del(song){
      this.$store.commit('delone',song);
    },
    pre(){
      let cur = this.$store.state.cursong;
      let list = this.$store.state.playlist;
      let index = 0;
      for(let i=0;i<list.length;i++){
        if(list[i].id==cur.id){
          index = i;
          break;
        } 
      }
      if(index==0){
        index=list.length;
      }
      this.$store.commit('changecur',this.$store.state.playlist[index-1]);
    },
    next(){
      let cur = this.$store.state.cursong;
      let list = this.$store.state.playlist;

      // let index = list.indexOf(cur);
      // console.log(cur) 
      // 因为indexof后面可能会自带不属于列表的信息所以一般不采用该方法

      let index = 0;
      for(let i=0;i<list.length;i++){
        if(list[i].id===cur.id){
          index=i;
          break;
        }
      }
      if(index==list.length-1){
        index=-1;
      }
      this.$store.commit('changecur',this.$store.state.playlist[index+1]);
    }
  },
  computed:{
    flag(){
      // console.log(this.$store.state.playFlag)
      return this.$store.state.playFlag;
    },
    list(){
      return this.$store.state.playlist;
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
   .playbox{
      position: fixed;
      width: 100%;
      height: 100%;
      background-image: url(../assets/img/bg2.jpeg);
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      background-size: auto 100%;
    }

    .head {
      width: 100%;
      padding: 10px 0;
      color: #fff;
      font-size: 18px;
    }

    .hContent {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translate(-50%,0);
      width: 95%;
      border: 1px solid #ddd;
      border-radius: 50px;
      height: 60px;
    }

    .head #img1 {
      width: 20px;
      margin: 20px 10px;
    }

    .head .img2 {
      width: 70%;
      height: 60px;
      margin: -65px auto;
    }
    
    .head .img2 span:nth-child(1){
      display: inline-block;
      font-size: 18px;
      width: 100px;
      line-height: 30px;
    }

    .head .img2 span:nth-child(3){
      display: inline-block;
      font-size: 13px;
      width: 100px;
      color: #bbb;
      line-height: 30px;
    }

    .head #img3 {
      width: 20px;
      margin: 25px 10px;
      float: right;
    }

    .main{
      position: relative;
      width: 100%;
      /* border: 1px solid ; */
    }

    .main .mContent{
      position: relative;
      width: 90%;
      margin: 100px auto;
    }

    .main .mContent .border{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      max-width: 300px;
      min-width: 300px;
      height: 50%;
      z-index: 99;
     
    }
    .main .mContent .border img{
      width: 100%;
      position: absolute;
    }

    .main .mContent .border img.run{
      animation: a 5s linear infinite;
    }

    .main .mContent .border img.stop{
      /* animation: a 5s linear infinite; */
      animation-play-state:paused;
    }
    .main .mContent .border img:nth-child(1){
      width: 100%;
      position: absolute;
      z-index: 99;
    }
    .main .mContent .border img:nth-child(2){
      width: 80%;
      position: absolute;
      z-index: 90;
      border-radius: 50%;
      top: 10%;
      left: 10%;
    }

    .main .mContent .border .img{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      max-width: 300px;
      min-width: 300px;
      border-radius: 50%;
      /* height: 50%; */
      z-index: 98;
      
    }

    @keyframes a {
      from{
        transform: rotate(0deg);
      }
      to{
        transform: rotate(360deg);
      }
    }
    /*---------------------------*/

    .foot{
      width: 100%;
      position: fixed;
      z-index: 99;
      bottom: 0;
    }
    .foot1, .foot3{
      display: flex;
      width: 90%;
      margin: 20px auto;
    }
    .foot1 i, .foot3 i {
      flex: 1;
      text-align: center;
      height: 30px;
    } 
    .foot3 .play{
      width: 45px;
      margin: -7px 0;
    }
    .foot1 i img, .foot3 i img {
      width: 30px;
    }
    .foot2{
      width: 100%;
      height: 20px;
    }
    .foot2 audio{
      width: 100%;
      height: 20px;
    }
    .foot2 .box{
      width: 100%;
      /* border: 1px solid springgreen; */
      height: 24px;
      display: flex;
    }
    .foot2 .box .s1, .foot2 .box .s2{
      flex: 1;
      font-size: 12px;
      color: #fff;
      text-align: center;
      line-height: 24px;
    }
    .foot2 .box .length{
      flex: 7;
      background-color: #ee1;
      border-radius: 20px;
      height: 7px;
      margin-top: 8px;
      overflow: hidden;
    }
    .foot2 .box .length .d{
      width: 50%;
      background-color: #e34;
      height: 7px;
    }
    .foot2 .box .length .dot{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-45%);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #eee;
    }
    /* -------这是歌单列表的样式------- */
    .over{
      position: fixed;
      bottom: 0;
      z-index: 199;
      width: 100%;
      height: 100%;
      background: #aaa;
      opacity: .4;
      display: none;
    }
    .listArea{
      position: fixed;
      bottom: 0;
      z-index: 299;
      width: 100%;
      height: 45%;
      box-sizing: border-box;
      display: block;
    }
    .listArea .listContent{
      width: 97%;
      height: 100%;
      background-color: #e22;
      margin: 0 auto;
      border-radius: 20px 20px 0 0;
    }
    .listArea .listContent .listHead{
      position: fixed;
      width: 97%;
      display: flex;
      height: 40px;
    }
    .listArea .listContent .listHead .listLeft,
    .listArea .listContent .listHead .listRight{
      display: inline-block;
      margin: 5px auto;
      flex: 1;
      line-height: 40px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .listArea .listContent .listHead .listLeft img,
    .listArea .listContent .listHead .listRight img,
    .listArea .listContent .listBody .listList img{
      width: 18px;
      vertical-align: middle;
    }
    .listArea .listContent .listBody{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 60px;
      overflow: auto;
    }
    .listArea .listContent .listBody .listList{
      width: 94%;
      margin: 10px auto;
      line-height: 18px;
      height: 18px;
    }
    .listArea .listContent .listBody .listList span{
      display: inline-block;
      font-size: 12px;
      color: #eee;
      height: 18px;
    }
    .listArea .listContent .listBody .listList.cur span{
      color:black;
    }
    .listArea .listContent .listBody .listList img{
      float: right;
    } 
    

</style>