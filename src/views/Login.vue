<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            로그인
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="Email"
              v-model="id"
              outlined
          ></v-text-field>
          <v-text-field
              label="Password"
              v-model="pass"
              type="password"
              outlined
          ></v-text-field>
          <div class="text-right">
            <v-btn color="primary" @click="login">
              로그인
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    return{
      id:"",
      pass:""
    }
  },
  methods:{
    login(){
      axios.post("http://localhost/login",{
        id:this.id,
        pass:this.pass
      }).then(()=>{
        alert("로그인 성공");
        this.$store.dispatch("loginAction",{id:this.id,pass:this.pass});
        this.$router.push("/");
      }).catch(()=>{
        alert("로그인 실패~!~!!!");
      })
    }
  }
}
</script>