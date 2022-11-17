<template>
  <div>
    <v-row>
        <v-col md="11">
            <v-text-field placeholder="제목을 검색하세요" filled rounded dense v-model.trim="text"></v-text-field>
        </v-col>
        <v-col md="1">
            <v-btn rounded color="primary" @click="QnASearchAction(text)">검색</v-btn>
        </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:"QnASearch",
    data(){
        return{
            text:""
        }
    },
    methods:{
        //qna 제목 검색
        ...mapActions(["QnASearchAction"])
    }
}
</script>

<style>

</style>