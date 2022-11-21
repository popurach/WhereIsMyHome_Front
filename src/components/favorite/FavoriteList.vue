<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="favlist"
      :items-per-page="10"
      @click:row="displayMarker"
    ></v-data-table>
    <v-btn style="margin-top:2%" class="float-right" @click="input">글 등록</v-btn>
    <div v-if="markerPositions.length != 0">
      <div id = "map" style="width:500px; height:470px;"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name:"FavoriteList",
  created(){
    this.CLEAR_FAVORITE_LIST();
    this.getFavoriteList(this.$store.state.userId);
  },
  //favorite 정보 리스트 state에서 가져오기
  computed:{
    ...mapState (['houses']),
    ...mapGetters({userId:'loginGetter', favlist:'FavoriteListGetter'}),
  },
  data(){
    return{
      userId:null,
      map : null,
      marker:{},
      markers: [],
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
          width:"50%",
          align:"center"
        },
        {
          text:"군/구",
          value:"gugunName",
          width:"10%",
          align:"center"
        },
        {
          text:"동",
          value:"dongName",
          width:"30%",
          align:"center"
        },
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
      
      this.CLEAR_APT_LIST();
      this.CLEAR_HOUSE_LIST();
      
      this.getApt({sidoName: row.sidoName, gugunName: row.gugunName, dongName: row.dongName});
      
      if(this.markerPositions.length != 0){
        this.markerPositions = [];
      }
      
      // console.log('333',this.$store.state)
      let tmp = this.$store.state.houses;
      console.log(tmp);
      
      console.log('출력')
      console.log(this.$store.state.houses);
      console.log('출력2')
      const LatLng = this.$store.state.houses.value.map((item) => {
          return {
          lat : item.lat,
          long : item.long
        }
      })
      console.log(LatLng.length)
      console.log(this.markerPositions.length)
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
    },
    input(){
      this.$router.push({name:"QnAInput"});
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