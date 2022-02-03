<template>
<div>
<TypeNav/>
  <ListContainer/>
  <Recommend/>
  <Rank/>
  <Like/>
  <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
  <Brand/>

</div>
  
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import {mapState} from 'vuex'
export default {
  name:'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted () {
    // 楼层数据action派发
        this.$store.dispatch('home/getFloorList');
        // 用户信息action派发
        if(localStorage.getItem("TOKEN"))
        this.$store.dispatch('user/getUserInfo');
    },
    computed: {
        ...mapState('home',['floorList'])
    }
}
</script>

<style>

</style>