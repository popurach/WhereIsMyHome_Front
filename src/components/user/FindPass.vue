<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            비밀번호 찾기
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="유저 id"
              v-model="id"
              required
              outlined
          ></v-text-field>
          <v-text-field
              label="안내받을 이메일"
              v-model="email"
              type="email"
              required
              outlined
              @keyup.enter="submit"
          ></v-text-field>
          <div class="text-right">
            <v-btn color="accent" @click="submit">
              확인
            </v-btn>
            <v-btn color="primary" @click="cancel">
              취소
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import http from "@/api/http";

export default {
    data(){
        return{
            id:"",
            email:""
        }
    },
    methods:{
        submit(){
            http.get(`/find/pass/${this.id}/${this.email}`)
                .then(({data})=>{
                    if(data==="success"){
                        alert("메일을 전송했습니다.!\n 비밀번호를 꼭 변경해주세요.");
                        this.$router.push("/login");
                    }else{
                        alert("존재하지 않는 아이디입니다.");
                        this.$router.go();
                    }
                }).catch(()=>{
                    alert("존재하지 않는 아이디입니다.");
                    this.$router.go();
                })
        },
        cancel(){
            this.$router.push("/login");
        }
    }
}
</script>

<style>

</style>