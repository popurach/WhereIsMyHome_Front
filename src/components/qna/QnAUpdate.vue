<template>
<div class="col-10" style="display:grid; place-items:center">
    <form @submit.prevent="submit" class="col-12">
            <v-text-field
            v-model="writer"
            label="작성자"
            class="col-6"
            readonly
            ></v-text-field>
            <v-text-field
            v-model="title"
            label="제목"
            class="col-6"
            required
            ></v-text-field>
            <v-textarea
            v-model="content"
            class="col-12"
            label="내용"
            required
            ></v-textarea>
        <div class="float-right">
            <v-btn
                class="mr-4"
                type="submit"
            >
                수정
            </v-btn>
            <v-btn @click="cancel">
                취소
            </v-btn>
        </div>
        </form>
</div>
</template>

<script>
import http from "@/api/http";

export default {
    data(){
        return{
            num:this.$store.state.detailqna.num,
            writer:this.$store.state.detailqna.userId,
            title:this.$store.state.detailqna.title,
            content:this.$store.state.detailqna.content
        }
    },
    methods:{
        submit(){
            http.put(`/qna/${this.num}`,{
                writer:this.writer,
                title:this.title,
                content:this.content
            })
                .then(()=>{
                    alert("QnA를 수정했습니다!");
                    this.$router.push("/qna");
                })
                .catch(()=>{
                    alert("QnA 수정 실패했습니다!");
                    this.$router.go();
                })
        },
        cancel(){
            this.$router.push("/qna");
        }
    }
}
</script>

<style>
</style>