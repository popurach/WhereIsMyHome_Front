<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="qnalist"
      :items-per-page="10"
      @click:row="detailQnA"
    ></v-data-table>
    <v-btn style="margin-top:2%" class="float-right" @click="input">글 등록</v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name:"QnAList",
  created(){
    this.$store.dispatch("QnAListAction");
  },
  //qna 게시글 정보 state 가져오기
  computed:{
    ...mapGetters({qnalist:'QnAListGetter'})
  },
  data(){
    return{
      headers:[
        {
          text:"번호",
          value:"num",
          width:"10%",
          align:"center"
        },
        {
          text:"제목",
          value:"title",
          width:"50%",
          align:"center"
        },
        {
          text:"작성자",
          value:"writer",
          width:"10%",
          align:"center"
        },
        {
          text:"작성일자",
          value:"date",
          width:"30%",
          align:"center"
        },
      ],
    }
  },
  methods:{
    ...mapActions(["QnAListAction"]),
    detailQnA(row){
      // this.$store.dispatch("detailQnA", {num: row.num, writer: row.writer, title: row.title, content: row.content, date: row.date});
      // this.$router.push({path:'/qnadetail'});
      this.$store.dispatch("detailQnA", {num: row.num, writer: row.writer, title: row.title, content: row.content, date: row.date})
          .then(res => this.$router.push({path:'/qnadetail'}))
    },
    input(){
      this.$router.push({name:"QnAInput"});
    }
    
  }
}
</script>

<style>

</style>