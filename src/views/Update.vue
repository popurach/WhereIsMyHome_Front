<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            회원 정보 수정
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="id"
              v-model="id"
              outlined
              readonly
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
          ></v-text-field>
          <div class="text-right">
            <v-btn color="primary" @click="update">
              수정
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
  name: "Update",
  data(){
    return{
      id:this.$store.state.userId,
      name:this.$store.state.userName,
      address:this.$store.state.userAddress,
      tel:this.$store.state.userTel
    }
  },
  methods:{
    update(){
      http.put(`/user`,{
        id:this.id,
        name:this.name,
        address:this.address,
        tel:this.tel
      }).then(()=>{
        alert("정보를 수정했습니다.");
        this.$router.push("/mypage");
      })
    },
    cancel(){
      this.$router.push("/");
    }
  },
}
</script>