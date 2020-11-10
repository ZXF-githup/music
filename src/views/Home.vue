<template>
  <div class="home">
    <div class="box">
      <ul class="head">
        <li>
          <a href="#">
            <i class="el-icon-microphone"></i>
          </a>
        </li>
        <li class="li2">
          <input type="text" class="text" />
          <a href="#" class="search">
            <i class="el-icon-search"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="el-icon-magic-stick"></i>
          </a>
        </li>
      </ul>
      <div class="banner">
        <img src="../assets/img/1_03.jpg" />
      </div>
      <ul class="list">
        <a href>
          <li>
            <img src="../assets/img/2_03.jpg" />
          </li>每日推荐
        </a>
        <a href>
          <li>
            <img src="../assets/img/2_05.jpg" />
          </li>歌单
        </a>
        <a href>
          <li>
            <img src="../assets/img/2_07.jpg" />
          </li>排行榜
        </a>
        <a href>
          <li>
            <img src="../assets/img/2_09.jpg" />
          </li>电台
        </a>
        <a href>
          <li>
            <img src="../assets/img/2_11.jpg" />
          </li>直播
        </a>
      </ul>
      <hr />
      <ul class="nav">
        <li>
          <h3>推荐歌曲</h3>
        </li>
        <li>
          <a href>歌单广场</a>
        </li>
      </ul>

      <!-- <ul class="kind" v-for="(item,index) in list" :key="index" v-if="(index+1)%3==0">
        <a href="">
          <li>
            <img :src="item.picUrl" />
          </li>{{list[index-2].name}}
        </a>
        <a href="">
          <li>
            <img src="../assets/img/3_03.jpg" />
          </li>{{list[index-1].name}}
        </a>
        <a href="">
          <li>
            <img src="../assets/img/3_03.jpg" />
          </li>{{list[index].name}}
        </a>
      </ul> -->

      <ul class="kind">
        <li v-for="(item,index) in list" :key="index" @click="jump(item.id)">
          <img :src="item.picUrl+'?param=106y106'" />
          <div>{{item.name}}</div>
        </li>
      </ul>

      
      <ul class="bottom">
        <a href>
          <li>
            <img src="../assets/img/4_01.jpg" />
          </li>发现
        </a>
        <a href>
          <li>
            <img src="../assets/img/4_03.jpg" />
          </li>视频
        </a>
        <a href>
          <li>
            <img src="../assets/img/4_05.jpg" />
          </li>我的
        </a>
        <a href>
          <li>
            <img src="../assets/img/4_07.jpg" />
          </li>云村
        </a>
        <a href>
          <li>
            <img src="../assets/img/4_09.jpg" />
          </li>账号
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data(){
    return{
      list:[],
      searchlist:[]
    }
  },
  methods:{
      jump(id){
        this.$router.push({name:'Song',params:{id:id}})
      },
      search(){  //点击搜索框，传入关键字调用搜索接口
        
      }
  },
  mounted(){
    this.$axios.post('/personalized').then((res)=>{
      // console.log(res.data.result)
      this.list = res.data.result;
    }).catch((err)=>{
      console.log(err)
    })
  }
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  .box {
    /* border:1px solid red; */
    margin: 0 auto;
    text-align: center;
  }
  .head {
    margin-top: 15px;
    text-align: center;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .head a i {
    font-size: 25px;
  }
  .li2 {
    width: 85%;
  }
  .search {
    position: relative;
  }
  .search i {
    position: absolute;
    right: 60%;
    top: 0px;
    opacity: 0.2;
  }
  .text {
    width: 90%;
    height: 30px;
    background-color: #f7f7f7;
    outline: none;
    border: none;
    border-radius: 25px;
    text-align: center;
  }
  .banner {
    margin-top: 27px;
  }
  .banner > img {
    width: 95%;
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 27px 0;
  }
  .list img {
    border-radius: 50%;
    width: 80%;
  }
  .nav {
    margin: 18px;
    display: flex;
    justify-content: space-between;
  }

  .kind {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }
  .kind li{
    width:33.3%;
    margin-bottom:10px;
  }
  .kind img {
    width: 85%;
    border-radius: 10px;
  }
  .kind li div{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .bottom {
    box-sizing: border-box;
    padding: 10px 15px 0px;
    height: 80px;
    background-color: #e9e9eb;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .bottom img {
    width: 60%;
  }
</style>