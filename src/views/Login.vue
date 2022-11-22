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
    }
  },
  mounted(){
    // const script = document.createElement("script");
    // script.src = "https://apis.google.com/js/platform.js";
    // document.head.appendChild(script);
    // const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // script.onload = () => {
    //   const gapi = window.gapi;
    //   console.log(gapi);
    //   const temp = gapi.load('auth2', () => {//auth2 모듈을 다운 받는다
    //     gapi.auth2.init({
    //         client_id: clientId,
    //         scope : 'https://www.googleapis.com/auth/userinfo.profile'
    //     })
    //   })
    // }
    // this.initgapi();

    
    // const temp = gapi.load('auth2', () => {
    //   gapi.auth2.init({
    //       client_id: clientId,
    //       scope : 'https://www.googleapis.com/auth/userinfo.profile'
    //   })//.then(
    //     async function onSuccess (res){
    //       const gAuthInstance = gapi.auth2.getAuthInstance();
    //       const userInfo = await gAuthInstance.signIn().catch(e => {
    //           throw e;
    //       })
    //       const userProfile = userInfo.getBasicProfile();
    //       const email = userProfile.getEmail();
    //       const profileImg = userProfile.getImageUrl();
    //       const name = userProfile.getName();
    //       console.log(email, name);
    //       gAuthInstance.signOut();
    //     },
    //     function onFailure(e){
    //         console.log(e)
    //         throw e
    //     }
    // )
    // const authInstance
    // })
  },
  async initgapi(){
    const gAuthInstance = gapi.auth2.getAuthInstance();
    const userInfo = await gAuthInstance.signIn().catch(e => {
        throw e;
    })

    const userProfile = userInfo.getBasicProfile();

    const email = userProfile.getEmail();
    const profileImg = userProfile.getImageUrl();
    const name = userProfile.getName();

    console.log(email, name);
    gAuthInstance.signOut();
  }
}
</script>