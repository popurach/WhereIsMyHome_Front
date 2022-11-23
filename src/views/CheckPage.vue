<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            비밀번호 확인
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="Password"
              v-model="pass"
              type="password"
              outlined
              @keyup.enter="check"
          ></v-text-field>
          <div class="text-right">
            <v-btn color="primary" @click="check">
              확인
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
import { mapActions } from 'vuex';

export default {
  data(){
    return{
      pass:""
    }
  },
  methods:{
    ...mapActions(["checkPass"]),
    check(){
        this.checkPass(this.pass);
    },
    cancel(){
        this.$router.push("/");
    }
  },
}
</script>