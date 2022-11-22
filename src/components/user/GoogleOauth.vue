<template>
    <div>
        GoogleOAuth
    </div>
</template>

<script>
import http from "@/api/http";

export default {
    name:"GoogleOauth",
    created(){
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = parsedHash.get("access_token");
        try {
            const { data } = http.post("/oauth/google", { accessToken });
            // const jwtToken = data.token;
            // sessionStorage.setItem("userToken", jwtToken);
            // dispatch(loginUser(data));
            // navigate("/", { replace: true });
        } catch (e) {
            console.log("OAuth 에러", e);
        }
    }
}
</script>

<style>

</style>