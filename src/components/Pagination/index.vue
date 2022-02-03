<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="getPageNo(pageNo-1)">上一页</button>
    <button v-if="startAndEndNum.start>1" @click="getPageNo(1)">1</button>
    <button v-if="startAndEndNum.start>2">···</button>
    <button v-for="(page,index) in startAndEndNum.end" :key="index" v-show="page>=startAndEndNum.start" @click="getPageNo(page)" :class="{active:page==pageNo}">{{page}}</button>
    <button v-if="startAndEndNum.end<totalPage-1">···</button>
    <button v-if="startAndEndNum.end<totalPage" @click="getPageNo(totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="getPageNo(pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed: {
        // 总页数
        totalPage(){
            return Math.ceil(this.total/this.pageSize);
        },
        // 连续页码起始数字和结束数字（连续页码数不定死）
        startAndEndNum(){
            // 结构赋值
            const {pageNo,continues,totalPage}=this;
            // 定义起始数字和结束数字变量
            let start,end;
            // 判断总页数是否大于连续页码数，处理不正常现象
            if(continues>totalPage){
                // 如果大于，则起始数字为1，结束数字为总页数
                start=1;
                end=totalPage;
            }else{
                // 总页数比连续页码数大
                // 正常现象
                start=pageNo-parseInt(continues/2);
                end=pageNo+parseInt(continues/2);
                // 不正常现象（起始数字小于1）
                if(start<1){
                    start=1;
                    end=continues;
                }
                // 不正常现象（结束数字大于总页数）
                if(end>totalPage){
                    start=totalPage-continues+1;
                    end=totalPage;
                }
            }
            return {start,end};
        }
    },
    methods: {
        getPageNo(page){
            console.log(page);
            this.$emit('getPageNo',page);
        }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .avtive{
      background-color: skyblue;
  }
</style>