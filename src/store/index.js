import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cururl:'',
    cursong:{},
    playlist:[],
    playFlag:false
  },
  mutations: {
    changecur(state,song){
      state.cursong = song
    },
    changeurl(state,url){
      state.cururl= url;
    },

    changeplaylist(state,list){
      state.cursong = list[0];
      state.playlist = list;
    },
    changeflag(state,flag){
      state.playFlag = flag;
    },
    delone(state,song){
      let index = state.playlist.indexOf(song)
      // console.log(state.cursong.id)
      // console.log(song.id)
    
      state.playlist.splice(index,1)

      if(state.cursong.id == song.id){
        state.cursong = state.playlist[0]
      }
    },
    addlist(state,song){
      let index = state.playlist.indexOf(song);
      state.playFlag = true;
      if(index==-1){
        state.playlist.push(song);
        state.cursong = song;
      }else{
        state.cursong = song;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
