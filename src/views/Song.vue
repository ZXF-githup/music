<template>
  <div>
    <div class="body">
      <div>
        <div class="tp">
          <i class="el-icon-arrow-left" @click="back()"></i>
          <h3>歌单</h3>
          <i class="el-icon-s-data"></i>
        </div>
        <div class="head">
          <img :src="info.playlist.coverImgUrl">
          <p>{{info.playlist.name}}</p>
        </div>
        <ul class="list">
          <span style="color:white">
            <li @click="goComment">
            <i class="el-icon-chat-dot-round"></i>
            </li>评论({{info.playlist.commentCount}})
          </span>
          <span style="color:white"><li><i class="el-icon-share"></i></li>分享({{info.playlist.shareCount}})</span>
          <span style="color:white"><li><i class="el-icon-download"></i></li>下载</span>
          <span style="color:white"><li><i class="el-icon-circle-check"></i></li>多选</span>
        </ul>
      </div>

      <div class="box">
        <div>
          <ul class="many">
            <li style="padding-top:15px;">
              <i class="el-icon-video-play" @click="playall()" ></i>播放全部(共{{info.playlist.trackCount}}首)
            </li>
            <li v-for="(item,index) in listAll" :key="index">
              <div class="list-left">{{index+1}}</div>
              <div class="list-right">
                <p class="top">{{item.name}}</p>
                <p class="bot">
                  <span v-for="(singer,index) in item.ar" :key="index">{{singer.name}}</span>
                  -{{item.name}}</p>
              </div>
              <div class="more"><i class="el-icon-video-play" @click="play(item)"></i><i class="el-icon-more"></i></div>
            </li>
          </ul>
        </div>
        <div style="height:60px"></div>
        <ul class="bottom">
          <a href=":;"><li><img src="../assets/img/4_01.jpg"></li>发现</a>
          <a href=""><li><img src="../assets/img/4_03.jpg"></li>视频</a>
          <a href=""><li><img src="../assets/img/4_13.jpg"></li>我的</a>
          <a href=""><li><img src="../assets/img/4_07.jpg"></li>云村</a>
          <a href=""><li><img src="../assets/img/4_09.jpg"></li>账号</a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Song",
  data() {
    return {
      info: {},
      listAll:[]
    };
  },
  methods:{
    back(){
      this.$router.push({name:'Home'})
    },
    goComment(id){
      this.$router.push({name:'Comment',params:{id:this.$route.params.id}})
    },
    play(song){
      this.$store.commit('addlist',song);
      this.$router.push('/play');
    },
    playall(){
      this.$store.commit('changeflag',true);
      this.$store.commit('changeplaylist',this.listAll);
      this.$router.push('/play');
    }
  },
  mounted() {
    this.$nextTick(()=>{
      //如何获取路由中的id   router(改变路由)  route（获取信息）
      let id = this.$route.params.id;
      this.$axios.post('/playlist/detail',{id:id}).then((res)=>{
        // console.log(res);获取整个歌单信息
        this.info = res.data;
        // console.log(this.info)

        // console.log(res.data.playlist.trackIds)//当前歌单的所有ID
        let idss = res.data.playlist.trackIds;
        let ids = [];
        for(let i=0;i<idss.length;i++){
          ids.push(idss[i].id);
        }
        // console.log(ids)获取所得的数据格式是数组的形式，
        // 而我们所需要的格式为字符串，所以得采用某些方法进行转化  
        // console.log(ids.join(','))
        this.$axios.post('/song/detail',{ids:ids.join(',')}).then(res2=>{
          // console.log(res2)
          this.listAll = res2.data.songs;
        }).catch(err2=>{
          console.log(err2)
        })

      }).catch((err)=>{
        console.log(err);
      }) 
    })

  }
};
</script>

<style scoped>
  .body{
    background-image: url(../assets/img/bg3.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    /* background-position: center; */
    background-size:150% ;
    text-align:center;
  }
  ul li{list-style: none;}
  a{text-decoration: none;  color:white;}
  i{font-size: 26px;}

  .tp{
    color:white;
    display: flex;
    align-items: center;
    padding:23px;
    justify-content: space-between;
  }
  .head{
    padding:25px;
    color:white;
    text-align: left;
    display: flex;
    /* align-items: center; */
  }
  .head img{
    width:36%;
    height: 36%;
    border-radius: 25px;
  }
  .head p{
    margin-left:30px;
    font-size:22px;
  }
  .box{
    background-color: white;
    margin:0 auto;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .list{
    display:flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom: 15px;
    margin: 20px 20px 0 20px;
  }
  .list li{
    padding-left:5px;
    padding-right:10px;
    padding-bottom: 10px; 
    color:white;}
  .many li{
    display:flex;
    align-items: center;
    margin-left:15px;
    position: relative;
  }

  .list-left{
    font-size: 20px;
    color: #888888;
    box-sizing: border-box;
    padding-left:10px;
  }

  .list-right{
    margin-left:15px;
    text-align: left;
  }
  .top{
    font-weight: bold;
    font-size: 20px;
    margin-bottom:10px;
  }
  .bot{
    font-size: 16px;
    color:#999999;
  }

  .more{position: absolute;right: 15px;}
  .more i:last-child{
    transform:rotate(90deg);
  }
  .bottom{
    box-sizing: border-box;
    padding:10px 15px 0px;
    height:80px;
    background-color: #e9e9eb;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
  }
  .bottom img{width:60%;}
</style>