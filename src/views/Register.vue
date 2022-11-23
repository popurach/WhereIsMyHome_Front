<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            회원가입
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="id"
              v-model="id"
              outlined
          ></v-text-field>
          <v-text-field
              label="Password"
              v-model="pass"
              type="password"
              outlined
          ></v-text-field>
          <v-text-field
              label="Name"
              v-model="name"
              outlined
          ></v-text-field>
          <v-text-field
              label="주소"
              v-model="address"
              outlined
          ></v-text-field>
          <v-text-field
              label="전화번호"
              v-model="tel"
              outlined
              @keyup.enter="register"
          ></v-text-field>
          <div class="text-right">
            <v-btn color="accent" @click="register">
              회원가입
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
  name: "Register",
  data(){
    return{
      id:"",
      pass:"",
      name:"",
      address:"",
      tel:""
    }
  },
  methods:{
    register(){
      http.post(`/user`,{
        id:this.id,
        pass:this.pass,
        name:this.name,
        address:this.address,
        tel:this.tel
      }).then(()=>{
        alert("회원가입이 성공했습니다.");
        this.$router.push("/login");
      }).catch(()=>{
        alert("회원가입에 실패했습니다.");
        this.$router.push("/");
      })
    },
    cancel(){
      this.$router.push("/");
    }
  },
}
</script>

<style>
button{
  margin-left: 3%;
}
</style>