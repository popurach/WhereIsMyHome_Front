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
                등록
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
            writer:this.$store.state.userId,
            title:"",
            content:""
        }
    },
    methods:{
        submit(){
            http.post("/qna",{
                writer:this.writer,
                title:this.title,
                content:this.content
            })
                .then(()=>{
                    alert("QnA를 등록했습니다!");
                    this.$router.push("/qna");
                })
                .catch(()=>{
                    alert("QnA 등록에 실패했습니다!");
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