<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            마이페이지
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="id"
              v-model="userInfo.userId"
              outlined
              readonly
          ></v-text-field>
          <v-text-field
              label="Name"
              v-model="userInfo.userName"
              outlined
              readonly
          ></v-text-field>
          <v-text-field
              label="주소"
              v-model="userInfo.userAddress"
              outlined
              readonly
          ></v-text-field>
          <v-text-field
              label="전화번호"
              v-model="userInfo.userTel"
              outlined
              readonly
          ></v-text-field>
          <div class="text-right">
            <v-btn color="accent" @click="resetPass">
              비밀번호 변경
            </v-btn>
            <v-btn color="accent" @click="update">
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
import { mapActions,mapGetters } from 'vuex';

export default {
  name: "MyPage",
  created(){
    this.getUserInfoAction(this.id);
  },
  data(){
    return{
      id:this.$store.state.userId
    }
  },
  computed:{...mapGetters({userInfo:"UserInfoGetter"})},
  methods:{
    ...mapActions(["getUserInfoAction"]),
    resetPass(){
      this.$router.push("/resetPass");
    },
    update(){
        this.$router.push("/update");
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