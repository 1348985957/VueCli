<template>
  <div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },

    mounted: function(){
        // 打开一个 web socket
        this.ws = new WebSocket("ws://192.168.1.101:9502");
        this.ws.onopen = ()=>
        {
            //向后端定时发送数据
            setInterval(()=>{
                this.ws.send(this.$store.getters.userInfo.id)
            },1000)
        };
        //接收后端请求回调
        this.ws.onmessage = (evt)=> 
        {
            var noticeCategory=JSON.parse(evt.data); 
            if(noticeCategory!=[]){
                for(var key in noticeCategory){
                    switch(key){
                        case "followMy":
                        var index=1
                        break;
                        case "reply":
                        var index=2
                        break;
                        case "good":
                        var index=3
                        break;
                    }
                    this.$store.commit('setNoticeCategory',{index:index,num:noticeCategory[key]})              
                }
            }
        };
    },
  }

</script>
<style scoped>
</style>