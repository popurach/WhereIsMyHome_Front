<template>
    <div>
        로딩중...
    </div>
</template>

<script>
import http from "@/api/http";
import { mapActions } from 'vuex';

export default {
    name:"GoogleOauth",
    methods:{
        ...mapActions(["googleLoginAction"])
    },
    created(){
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = parsedHash.get("access_token");
        try {
            http.post("/oauth/google", { accessToken })
                .then(({data})=>{
                    console.log(data);
                    if(data.message==="success"){
                        let access = data["access-token"];
                        let refresh = data["refresh-token"];
                        console.log(2222222);
                        this.googleLoginAction({access,refresh});
                        console.log(333333333);
                    }
                    console.log(4444444);
                }).catch((error)=>{
                    alert(error);
                })
        } catch (e) {
            console.log("OAuth 에러", e);
        }
    }
}
</script>

<style>

</style>