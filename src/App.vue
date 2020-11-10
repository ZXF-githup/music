<template>
  <div id="app">
    <router-view/>
    <audio class="au" id="audi" autoplay ref="mp3" controls :src="musicurl"></audio>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        musicurl:''
      } 
    },
    methods:{
      
    },
  
    computed:{
      cursong(){
        // console.log('a88888888888')
        return this.$store.state.cursong 
      },
      cururl(){
        return this.$store.state.cururl
      },
      flag(){
        
        return this.$store.state.playFlag
      }
    },
    mounted(){
      // console.log(this.$route)
      // this.$axios.post('/login/status').then((res)=>{  
      // }).catch(err=>{
      //   this.$router.replace('/login')
      // })

    },
    watch:{
      '$route':function(e){
        // console.log(e)
      },
      cursong(e){
        this.$axios.post('/song/url',{
          id:this.$store.state.cursong.id
        }).then(res=>{ 
          this.musicurl = res.data.data[0].url;
        }).catch(err=>{
          console.log(err)
        })
      },
      musicurl(){
        // console.log(audi.duration)
        setInterval(()=>{
          let audi = document.getElementById('audi');
          if(audi.ended){
            let cur = this.$store.state.cursong;
            let list = this.$store.state.playlist;
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
        },1000)
      },
      
      flag(v){
        // console.log(this.$refs.mp3)
        var au = document.getElementById('audi');
        // console.log(au)
        if(v){
          au.play();
        }else{
          au.pause();
        }
      }
    }
  }
</script>


  



<style>
  *{
    margin:0;
    padding:0;
  }
  .au{
    width: 0;
    height:0;
  }
  /* 
   https://github.com/Tencent/weui.js */
</style>
