<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8"> 
        <div>
          <div>
            <v-card flat color="transparent">
              <div>
                <h2>아파트 매물 검색</h2>
                <v-row dense>
                  <v-col cols="2">
                    <v-autocomplete
                      v-model="sidoName"
                      :items="sidos"
                      label="시"
                      dense
                      outlined
                      @change="gugunList"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="2">
                    <v-autocomplete
                      v-model="gugunName"
                      :items="guguns"
                      label="군/구"
                      dense
                      outlined
                      @change="dongList"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="2">
                    <v-autocomplete
                      v-model="dongName"
                      :items="dongs"
                      label="동"
                      dense
                      outlined
                      @change="aptList"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="aptName"
                      :items="apts"
                      label="아파트"
                      dense
                      outlined
                      @change="houseList"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-data-table 
                  dense
                  :headers="headers"
                  :items="houses"
                  :items-per-page="10"
                  class="elevation-1"
                  style="width: 100%">
                    <thead>
                      <tr>
                          <td>아파트명</td>
                          <td>법정동</td>
                          <td>매매년도</td>
                          <td>매매가격</td>
                      </tr>
                    </thead>
                </v-data-table>
              </div>
              
              <v-card-text>
                <div>
                  <v-btn color="accent">관심지역 등록하기</v-btn>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="my-4">
                  <v-row>
                    <v-col cols="6">
                      <v-card>
                        <v-img
                          src="https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        ></v-img>
                      </v-card>
                    </v-col>

                    <v-col cols="6">
                      <v-card>
                        <v-img
                          src="https://cdn.pixabay.com/photo/2019/11/01/11/08/landscape-4593909_1280.jpg"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        ></v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>

                <div class="text-h5 primary--text font-weight-bold">
                  
                </div>

                <div class="d-flex align-center justify-space-between mt-8">
                  
                </div>

                <v-divider class="my-8"></v-divider>

                <div class="my-8">
                  
                </div>

                <div>
                  <v-row justify="space-between">
                    <v-col cols="12" md="6" lg="4">
                      <div class="d-flex align-center">
                        <div>
                          <v-icon>mdi-arrow-left</v-icon>
                        </div>

                        <div class="text-h6 primary--text pl-2">
                          <div class="text-subtitle-1">Previous Post</div>Photos of Jeep models that will change
                          your mood
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6" lg="4">
                      <div class="d-flex align-center text-right">
                        <div class="text-h6 primary--text pr-2">
                          <div class="text-subtitle-1">Next Post</div>What do I need to know to start learning
                          JavaScript?
                        </div>

                        <div>
                          <v-icon>mdi-arrow-right</v-icon>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "AptList",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
  data() {
    return {
      sidoName: null,
      gugunName: null,
      dongName: null,
      aptName: null,
      headers: [
      {
        text: '아파트명',
        align: 'start',
        sortable: false,
        value: 'aptName',
      },
      { text: '법정동', value: 'dongName' },
      { text: '매매년도', value: 'dealYear' },
      { text: '매매가격', value: 'dealAmount' },
    ]
    }
  },
  computed:{
    ...mapState(["sidos", "guguns", "dongs", "apts", "houses"]),
  },
  created() {
    this.CLEAR_SIDO_LIST(); 
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_APT_LIST();
    this.CLEAR_HOUSE_LIST();
    this.getSido();
  },
  methods: {
      ...mapActions(["getSido", "getGugun", "getDong", "getApt", "getHouseList"]),
      ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST", "CLEAR_APT_LIST", "CLEAR_HOUSE_LIST"]),
      gugunList() {
        // console.log(this.sidoCode);
        this.CLEAR_GUGUN_LIST();
        this.gugunName = null;
        console.log(this.sidoName);
        if (this.sidoName) this.getGugun(this.sidoName);
      },
      dongList(){
        this.CLEAR_DONG_LIST();
        this.dongName = null;
        console.log(this.gugunName);
        if (this.gugunName) this.getDong({sidoName: this.sidoName, gugunName: this.gugunName});
      },
      aptList(){
        this.CLEAR_APT_LIST();
        this.aptName = null;
        if (this.dongName) this.getApt({sidoName: this.sidoName, gugunName: this.gugunName, dongName: this.dongName});
      },
      houseList() {
        this.CLEAR_HOUSE_LIST();
        if (this.aptName) this.getHouseList({sidoName: this.sidoName, gugunName: this.gugunName, dongName: this.dongName, aptName: this.aptName});
      },
    },
};
</script>
