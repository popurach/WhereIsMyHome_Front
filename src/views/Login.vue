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
import axios from "axios";
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
    ...mapActions(["loginAction"]),
    login(){
      // TODO: 로그인 정보 있는지 확인 후 accessToken, refreshToken 받아오기
      this.loginAction({id:this.id,pass:this.pass});

      // TODO: session에 저장된 토큰 값 가져오기
      let token=sessionStorage.getItem("accessToken");

      // TODO: 로그인된 정보인지 확인 -> 세션 만료됐다면 accessToken 재발급 -> 만료됐다면 refreshToken 재발급
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