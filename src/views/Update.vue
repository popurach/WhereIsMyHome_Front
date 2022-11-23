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
            <v-btn color="accent" @click="update">
              수정
            </v-btn>
            <v-btn color="error" @click.stop="dialog=true">
              탈퇴
            </v-btn>
            <v-btn color="primary" @click="cancel">
              취소
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          정말 탈퇴하시겠습니까?
        </v-card-title>

        <v-card-text>
          탈퇴하면 더이상 QnA와 관심목록을 이용할 수 없습니다.
          그래도 탈퇴하시겠습니까?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            취소
          </v-btn>

          <v-btn
            color="error"
            text
            @click="remove"
          >
            탈퇴
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import http from "@/api/http";
import { mapActions } from 'vuex';

export default {
  name: "Update",
  data(){
    return{
      id:this.$store.state.userId,
      name:this.$store.state.userName,
      address:this.$store.state.userAddress,
      tel:this.$store.state.userTel,
      dialog:false
    }
  },
  methods:{
    ...mapActions(["logoutAction"]),
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
    remove(){
      this.dialog=false;
      // 확인창 띄우기
      console.log("탈퇴!!");
      http.delete(`/user/${this.id}`)
        .then(()=>{
          alert("탈퇴되었습니다.");
          this.logoutAction();
          this.$router.push("/");
        })
    },
    cancel(){
      this.$router.push("/");
    }
  },
}
</script>
<style scoped>
button{
  margin-left: 3%;
}
</style>