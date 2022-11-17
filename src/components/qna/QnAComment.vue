<template>
  <div>
    <v-row>
        <v-col md="11">
            <v-text-field placeholder="댓글을 등록하세요" filled rounded dense v-model.trim="text"></v-text-field>
        </v-col>
        <v-col md="1">
            <v-btn rounded color="primary" @click="insertComment(text)">댓글 등록</v-btn>
        </v-col>
    </v-row>
    <v-list>
        <v-list-item v-for="i in comments" :key="i.num">
            <v-list-item-title v-text="i.comment"></v-list-item-title>
            <v-btn v-if="i.writer===user">
                삭제
            </v-btn>
        </v-list-item>
    </v-list>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
    created(){
        this.detail=this.$store.state.detailqna;
        //게시글에 따른 댓글 목록 뜨게
        http.get(`/comment/${this.detail.num}`)
            .then((response)=>{
                console.log(response.data);
                this.comments=response.data;
            });
    },
    data(){
        return{
            user:this.$store.state.userId,
            text:"",
            detail:{},
            comments:[],
        }
    },
    methods:{
        // TODO: bnum props 받기
        insertComment(){
            console.log(this.detail);
            http.post("/comment",{
                bnum:this.detail.num,
                writer:this.$store.state.userId,
                comment:this.text
            }).then(()=>{
                alert("댓글이 등록되었습니다.");
                this.$router.go();
            })
        },
        // TODO: bnum, num props 받기
        deleteComment(){
            http.delete(`/comment/${this.detail.bnum}/${this.detail.num}`)
            .then(()=>{
                alert("댓글이 삭제되었습니다.");
                this.$router.go();
            })
        }
    }
}
</script>

<style>

</style>