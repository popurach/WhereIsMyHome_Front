<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            비밀번호 변경
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="새로운 비밀번호"
              v-model="newPass"
              type="password"
              required
              outlined
          ></v-text-field>
          <v-text-field
              label="비밀번호 확인"
              v-model="newPassCheck"
              type="password"
              :rules="pass_rule"
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
            newPass:"",
            newPassCheck:"",
            pass_rule: [
                v => !!v || '비밀번호는 필수 입력사항입니다.',
                v => v===this.newPassCheck || '비밀번호가 일치하지 않습니다.'
            ],
        }
    },
    methods:{
      submit(){
          http.put(`/reset/pass`,{
            id:this.$store.state.userId,
            pass:this.newPass
          }).then(()=>{
            alert("비밀번호 변경을 완료했습니다.");
          }).catch(()=>{
            alert("비밀번호 변경에 실패했습니다.");
          })
          this.$router.push("/mypage");
      },
      cancel(){
          this.$router.push("/mypage");
      }
    }
}
</script>

<style>

</style>