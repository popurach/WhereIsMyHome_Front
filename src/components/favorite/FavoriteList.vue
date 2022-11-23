<template>
  <div style="padding-bottom: 200px">
    <div>
      <!-- <v-data-table
        :headers="headers"
        :items="favorites"
        :items-per-page="10"
        @click:row="displayMarker"
      >
      </v-data-table> -->
      <v-row align="center" class="list px-3 mx-auto">
        <!-- <v-col cols="12" md="8">
          <v-text-field v-model="title" label="관심 지역 목록"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn small @click="searchTitle">
            Search
          </v-btn>
        </v-col> -->
  
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" tile>

          <v-card-title>관심 지역 목록</v-card-title> 
            <v-data-table
              :headers="headers"
              :items="favorites"
              :items-per-page="10"
              @click:row="displayMarker"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="deleteTutorial(item.num)">mdi-delete</v-icon>
              </template>
            </v-data-table>

            <v-card-actions v-if="favorites.length > 0">
              <v-btn small color="error">
                Remove All
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row> 
    </div>
    <!-- <div v-if="this.markerPositions.length != 0"> -->
    <div style='margin:30px'>
      <div id = "map" style="width:100%; height:470px;"></div>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name:"FavoriteList",
  created(){
    this.CLEAR_FAVORITE_LIST();
    console.log('11111111111');
    console.log(this.$store.state.userId);
    this.userId = this.$store.state.userId;
    this.getFavoriteList(this.userId);
  },
  //favorite 정보 리스트 state에서 가져오기
  computed:{
    ...mapState (['houses', 'favorites']),
    ...mapGetters({userId:'loginGetter', favlist:'FavoriteListGetter'}),
  },
  watch:{
    markerPositions: function(){
      var icon = new kakao.maps.MarkerImage(
          '../../../images/marker.png',
          new kakao.maps.Size(40, 50),
      )
      if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = this.markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      if (positions.length > 0) {
          this.markers = positions.map(
          (position) =>
              new kakao.maps.Marker({
              map: this.map,
              position,
              image:icon,
              })
          );
          const bounds = positions.reduce(
              (bounds, latlng) => bounds.extend(latlng),
              new kakao.maps.LatLngBounds()
          );
          this.map.setBounds(bounds);
      }
    }
  },
  data(){
    return{
      sidoName: null,
      gugunName: null,
      dongName: null,
      userId:null,
      map : null,
      marker:{},
      markers: [],
      // markerPositions:[],
      markerPositions:[],
      headers:[
        {
          text:"번호",
          value:"num",
          width:"10%",
          align:"center"
        },
        {
          text:"시",
          value:"sidoName",
          width:"40%",
          align:"center"
        },
        {
          text:"군/구",
          value:"gugunName",
          width:"20%",
          align:"center"
        },
        {
          text:"동",
          value:"dongName",
          width:"20%",
          align:"center"
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  methods:{
    ...mapActions(["getFavoriteList", "getApt"]),
    ...mapMutations(["CLEAR_FAVORITE_LIST", "CLEAR_APT_LIST", "CLEAR_HOUSE_LIST"]),
    initMap(){
      const container = document.getElementById("map");
      const options = {
          center: new kakao.maps.LatLng(33.450705, 126.570677),
          level: 5,
          keyboardShortcuts:true,
      };
      this.map = new kakao.maps.Map(container, options);
      console.log('map임 ',this.map)
    },
    displayMarker(row) {
      console.log(row);//시 군/구 동
      // this.CLEAR_APT_LIST();
      // this.CLEAR_HOUSE_LIST();
      this.sidoName = row.sidoName;
      this.gugunName = row.gugunName;
      this.dongName = row.dongName;

      console.log(this.sidoName, this.gugunName, this.dongName);

      this.getApt({sidoName: row.sidoName, gugunName: row.gugunName, dongName: row.dongName});
      
      if(this.markerPositions.length != 0){
        this.markerPositions = [];
      }
      // console.log(this.$store.state);
      console.log(this.$store.state.houses);
      const LatLng = this.$store.state.houses.map((item,idx) => {
        return {
          id: idx,
          lat : item.lat,
          lng : item.lng
        }
      })
      const map = {};

      //중복된 아파트 위도, 경도 처리
      LatLng.forEach((latlng) => {
        if(!map[latlng.lat + '+' + latlng.lng]){
          map[latlng.lat + '+' + latlng.lng] = [latlng.lat , latlng.lng]
        }
      })
    
      for(const idx in map){
        this.markerPositions.push(map[idx]);
      }
      // var icon = new kakao.maps.MarkerImage(
      //     '../../../images/marker.png',
      //     new kakao.maps.Size(40, 50),
      // )
      // if (this.markers.length > 0) {
      //     this.markers.forEach((marker) => marker.setMap(null));
      // }
      // const positions = this.markerPositions.map(
      //     (position) => new kakao.maps.LatLng(...position)
      // );
      // if (positions.length > 0) {
      //     this.markers = positions.map(
      //     (position) =>
      //         new kakao.maps.Marker({
      //         map: this.map,
      //         position,
      //         image:icon,
      //         })
      //     );
      //     const bounds = positions.reduce(
      //         (bounds, latlng) => bounds.extend(latlng),
      //         new kakao.maps.LatLngBounds()
      //     );
      //     this.map.setBounds(bounds);
      // }
    },
    deleteTutorial(num){ 
      if(confirm('관심지역을 삭제하시겠습니까?')){
        http.delete(`/favorite/${num}`)
          .then(()=>{
              alert("삭제를 완료했습니다!");
              // this.$router.push("/qna");
              this.$router.go();
          })
          .catch(()=>{
              alert("삭제를 실패했습니다!");
              this.$router.go();
          })
      }else{
        return;
      }
    }
  },
  mounted() {
    if(!window.kakao || !window.kakao.maps){
        const script = document.createElement("script");

        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        const appKey = import.meta.env.VITE_KAKAOMAP_KEY;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}`;
        document.head.appendChild(script);
    }else{
        this.initMap();
    }
  },
}
</script>

<style>

</style>