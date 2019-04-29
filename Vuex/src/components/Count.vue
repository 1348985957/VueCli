<template>
    <div>
        <h2>{{msg}}</h2>
        <h3>{{$store.state.a.count}}--{{count}}</h3>
        <p>
            <button @click="$store.commit('add',2)">+</button>
            <button @click="reduce">-</button>
        </p>
        <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p>
    </div>
</template>

<script>
import store from '@/vuex/store';
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
    data(){
        return{
            msg:'Hello Vuex'
        }
    },
    computed:{
        ...mapState(['count']),
        // count(){
        //     return this.$store.getters.count;
        // }
        ...mapGetters(['count'])
    },
    methods:{
        ...mapMutations(['add','reduce']),
        ...mapActions(['addAction','reduceAction'])
    },
    store
}
</script>
