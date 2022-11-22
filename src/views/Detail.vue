<template>
  <div>
    <v-row style="padding-bottom: 200px">
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
                  @click:row="handleClick"
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
                  <v-btn v-if="userId!='' && this.dongName != null" color="accent" 
                  @click.prevent='registerFavorite'>관심지역 등록하기</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div v-if="selectedItems != null">
            <ka-kao-map :selectedItems = "selectedItems"></ka-kao-map>
            <!-- <div v-if="this.$store.state.map != null" style='margin-leftt:10px'>
              <ka-kao-road-view :selectedItems = "selectedItems"></ka-kao-road-view>
            </div> -->
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from "@/api/http";
import KaKaoMap from "@/components/house/KaKaoMap";
import KaKaoRoadView from "@/components/house/KaKaoRoadView";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "AptList",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
    KaKaoMap,
    KaKaoRoadView
  },
  data() {
    return {
      sidoName: null,
      gugunName: null,
      dongName: null,
      aptName: null,
      selectedItems: null,
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
    ...mapGetters({userId:"loginGetter"}),
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
      ...mapActions(["getSido", "getGugun", "getDong", "getApt", "getHouseList", "registerFavorite"]),
      ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST", "CLEAR_APT_LIST", "CLEAR_HOUSE_LIST"]),
      gugunList() {
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
        console.log(this.houses);
      },
      handleClick(item){
        console.log(item);
        this.selectedItems = item;
      },
      registerFavorite(){
        console.log(this.userId);
        console.log(this.sidoName);
        console.log(this.gugunName);
        console.log(this.dongName);
        if(confirm('관심지역으로 등록하시겠습니까?')){
          http.post("/favorite",{
                  userId:this.userId,
                  sidoName: this.sidoName, 
                  gugunName: this.gugunName, 
                  dongName: this.dongName
              })
                  .then(()=>{
                      alert("관심지역을 등록했습니다!");
                      // this.$router.push("/qna");
                  })
                  .catch(()=>{
                      alert("관심지역 등록에 실패했습니다!");
                      this.$router.go();
                  })
          }else{
            return;
          }
      }
    },
};
</script>
