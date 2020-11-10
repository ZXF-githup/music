<template>
  <div>
    <div class="box">
      <ul>
        <li class="top">手机号登录</li>
        <li class="text">未注册手机号登录后将自动创建账号</li>
        <li>+86<input type="text" class="tel" v-model="tel"></li>
        <li><input type="password" class="tel" v-model="pw"></li>
        <li><input type="submit" value="下一步" class="post" @click="login"></li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  data(){
    return {
      tel:'13723723393',
      pw:'yy12345678'
    }
  },
  methods:{
    login(){
      this.$axios.post('/login/cellphone',{phone:this.tel,password:this.pw}).then((res)=>{
        // console.log(res);
        this.$router.replace('/');
      }).catch((err)=>{
        console.log(err);
      }) 
    }
  }
};
</script>

<style scoped>
  ul {
    margin-top: 20px;
    text-align: center;
  }
  ul li {
    list-style: none;
    height: 60px;
    line-height: 60px;
  }
  .box {
    /* width:540px;
        height:960px; */
    /* border:1px solid red; */
    margin: 0 auto;
  }

  .top {
    font-weight: bold;
    font-size: 20px;
    position: relative;
  }
  .top::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    position: absolute;
    left: 30px;
    top: 20px;
  }
  .text {
    font-size: 17px;
    color: #919191;
    text-align: left;
    box-sizing: border-box;
    padding-left: 25px;
  }
  .tel {
    width: 80%;
    outline: none;
    border: 0;
    border-bottom: 1px solid #999999;
    font-size: 18px;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .post {
    width: 80%;
    height: 32px;
    border-radius: 10px;
    outline: none;
    border: 0;
    background-color: #fb574b;
    margin-top: 25px;
  }
</style>