<template>
  <div>
    <audio id="audio" src="./static/audio/634.wav"/>
        
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              tooltip-effect="dark"
              style="width: 100%"
              border stripe class="order">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机" width="150" align="center"></el-table-column>
        <el-table-column prop="day" label="日期" width="150" align="center"></el-table-column>
        <el-table-column prop="time" label="时间" width="150" align="center"></el-table-column>
        <el-table-column prop="detail" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
            <template slot-scope="scope">
                <el-button  v-show="scope.row.state == 0" type="success" size="mini" @click="delSingleInfo(scope.row)" class="btn-handle">处理</el-button>
                <el-tag v-show="scope.row.state == 1" :type="scope.row.state | statusFilter">{{scope.row.state | formatStata}}</el-tag>
                
            </template>
        </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"> 
      </el-pagination> 
    </div>

    <div class="div-btn">
        <el-input v-model="val" placeholder="请输入搜索内容" style="width:200px" id="inputVal"></el-input>
        <el-button type="success" @click="select()" id="btn-select">搜索</el-button>
        <el-button type="success" @click="refresh()">全部</el-button>
    </div>
    
      
  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    name: 'manage',
    data () {
        return {
            tableData: [],
            len: -1,
            siez: 0,
            pagesize: 10,
            currentPage:1,
            interval: 0,
            val: ''
        }
    },
    filters: {
        // el-tag类型转换
        statusFilter(status) {
        const statusMap = {
            0: 'info',
            1: 'success'
        }
        return statusMap[status]
        },
        // 状态显示转换
        formatStata(status) {
        const statusMap = {
            //0: '未处理',
            1: '已处理',
        }
        return statusMap[status]
        }
    },
    created: function(){
        axios.get("http://119.23.241.220/orderManage/getOrder.php")
        .then(response=>{
            //console.log(response);
            if (!response.data.err) {
                this.tableData = response.data;
                this.len = this.tableData.length;
            }
        })
        .catch(error=>{
            //console.log(error);
            alert('网络错误，获取信息失败');
        });
        
        this.interval = setInterval(this.selectAll, 5000);
    },
    mounted: function(){
        
    },
    methods:{
        handleSizeChange: function (size) { 
            this.pagesize = size; 
        }, 
        handleCurrentChange: function(currentPage){ 
            this.currentPage = currentPage; 
        },
        select: function (){
            var selectVal = this.val;
            if(selectVal == null){
                alert("请输入搜索内容");
                return ;
            }
            axios.get("http://119.23.241.220/orderManage/getOrder.php?searchVal=" + selectVal)
            .then(response=>{
                //console.log(response);
                if (!response.data.err) {
                    this.tableData = response.data;
                }
            })
            .catch(error=>{
                //console.log(error);
                alert('网络错误，获取信息失败');
            });
            clearInterval(this.interval);
        },
        selectAll: function(){
            axios.get("http://119.23.241.220/orderManage/getOrder.php")
            .then(response=>{
                //console.log(response);
                if (!response.data.err) {
                    this.tableData = response.data;
                    if(this.len != this.tableData.length){
                        this.play();
                        this.len = this.tableData.length;
                    }
                }
            })
            .catch(error=>{
                //console.log(error);
                alert('网络错误，获取信息失败');
            });
            
        },
        refresh: function() {
            this.$router.go(0);
        },
        play: function() {    
            document.getElementById('audio').play();

        },
        delSingleInfo: function(item) {
            if(confirm("确定处理么?")){
                axios.get("http://119.23.241.220/orderManage/setOrderState.php?id=" + item.id)
                .then(response=>{
                    this.selectAll();
                })
                .catch(error=>{
                    //console.log(error);
                    alert('网络错误，修改信息失败');
                });   
            }
        }
    }
  }
 
</script>
<style scoped>
    .order{
        background-color: #F9FAFC;
        border-right: 1px solid #C0CCDA;
        height: 100%;
    }
    .div-btn{
        margin-top: 20px;
    }
  
    #btn-select{
        margin-left: 40px;
    }
</style>