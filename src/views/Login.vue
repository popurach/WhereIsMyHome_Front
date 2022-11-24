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
              label="id"
              v-model="id"
              outlined
          ></v-text-field>
          <v-text-field
              label="Password"
              v-model="pass"
              type="password"
              outlined
              @keyup.enter="login"
          ></v-text-field>
          <div class="text-right">
            <v-btn color="accent" @click="findPass">
              비밀번호 찾기
            </v-btn>
            <v-btn color="accent" @click="login">
              로그인
            </v-btn>
            <v-btn color="primary" @click="google">
              구글로그인
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Login",
  data(){
    return{
      id:"",
      pass:""
    }
  },
  methods:{
    ...mapActions(["loginAction","getUserInfo"]),
    findPass(){
      this.$router.push("/findPass");
    },
    login(){
      this.loginAction({id:this.id,pass:this.pass});
    },
    google(){
      const protocol = window.location.protocol;
      const hostName = window.location.hostname;
      const port = window.location.port;
      let url =
          protocol + "//" + hostName + (port ? ":" + port : "") + "/oauth/google";
      window.location.href =
          `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=` +
          "http://localhost:8080/oauth/google"+
          "&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    }
  },
}
</script>

<style>
button{
  margin-left: 3%;
}
</style>