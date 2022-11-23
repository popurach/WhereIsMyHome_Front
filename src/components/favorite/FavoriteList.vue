<template>
  <div style="padding-bottom: 200px">
    <div>
      <v-row align="center" class="list px-3 mx-auto">
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
          this.markers.forEach((marker) => {
            marker.setMap(null)
          });
      }
      if(this.mapCustomOverlays.length > 0){
        console.log('삭제', this.mapCustomOverlays.length);
        this.mapCustomOverlays.forEach((mapCustomOverlay) => mapCustomOverlay.setMap(null));
      }
      const positions = this.markerPositions.map(
          (position) => new kakao.maps.LatLng(position[0], position[1])
      );
      if (positions.length > 0) {
          this.markers = positions.map(
            (position) =>
                this.marker = new kakao.maps.Marker({
                  map: this.map,
                  position,
                  image:icon,
                }),
          );
          // this.markers.forEach((marker) => {
          //   // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          //     kakao.maps.event.addListener(marker, 'click', function() {overlay.setMap(map);})
          // })
          const bounds = positions.reduce(
              (bounds, latlng) => bounds.extend(latlng),
              new kakao.maps.LatLngBounds()
          );
          this.map.setBounds(bounds); 

          this.markerPositions.map(
            (position, idx) => {
              this.aptSearch = position[3] + " " + position[2];

              // 커스텀 오버레이
              var content = document.createElement('div');
              content.classList.add('overlay_info');

              var aTag = document.createElement('a');
              aTag.setAttribute('href', `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${this.aptSearch}`);
              aTag.appendChild(document.createTextNode(`${position[2]}`));
              // aTag.innerText = `${position[2]}`;
              content.appendChild(aTag);

              var closeBtn = document.createElement('button');
                  closeBtn.appendChild(document.createTextNode('닫기'));
                  // 닫기 이벤트 추가
                  closeBtn.onclick = function() {
                      mapCustomOverlay.setMap(null);
                  };
              closeBtn.style.float = 'right';
              content.appendChild(closeBtn);


              var content2 = document.createElement('div');
              content2.classList.add('desc');
              var img = new Image();
              img.src = "../../../images/apt_test.jpg";
              content2.appendChild(img);

              var content3 = document.createElement('div');
              content3.classList.add('innerdesc');

              var span = document.createElement('span');
              span.classList.add('address');
              span.innerHTML=`${position[4]}㎡`;
              var br = document.createElement("br");
              span.appendChild(br);
              content3.appendChild(span);

              var span = document.createElement('span');
              span.classList.add('address');
              span.innerHTML=`${position[6]}만원`;
              var br = document.createElement("br");
              span.appendChild(br);
              content3.appendChild(span);

              var span = document.createElement('span');
              span.classList.add('address');
              span.innerHTML=`${position[5]}층`;
              var br = document.createElement("br");
              span.appendChild(br);
              content3.appendChild(span);

              content2.appendChild(content3);
              content.appendChild(content2);

              var custom_position = new kakao.maps.LatLng(position[0],position[1]);

              var mapCustomOverlay = new kakao.maps.CustomOverlay({
                  position: custom_position,
                  content: content,
                  // xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
                  yAnchor: 1.5 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
              });
              console.log('aaaaa');
              let m=this.markers[idx];
              let tmp_map=this.map;
              this.mapCustomOverlays.push(mapCustomOverlay);
              kakao.maps.event.addListener(m, 'click', function() {
                mapCustomOverlay.setMap(tmp_map);
              })
              // mapCustomOverlay.setMap(this.map);
            }
          );
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
      mapCustomOverlay: null,
      mapCustomOverlays: [],
      aptSearch : null,
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
      // this.CLEAR_APT_LIST();
      // this.CLEAR_HOUSE_LIST();
      this.sidoName = row.sidoName;
      this.gugunName = row.gugunName;
      this.dongName = row.dongName;

      this.getApt({sidoName: row.sidoName, gugunName: row.gugunName, dongName: row.dongName});
      
      if(this.markerPositions.length != 0){
        this.markerPositions = [];
      }
      const LatLng = this.$store.state.houses.map((item,idx) => {
        return {
          id: idx,
          lat : item.lat,
          lng : item.lng,
          aptName : item.aptName,
          dongName : item.dongName,
          area  : item.area,
          floor : item.floor,
          dealAmount : item.dealAmount
        }
      })
      const map = {};
      //중복된 아파트 위도, 경도 처리
      LatLng.forEach((latlng) => {
        if(!map[latlng.lat + '+' + latlng.lng]){
          map[latlng.lat + '+' + latlng.lng] = [latlng.lat , latlng.lng, latlng.aptName, latlng.dongName, latlng.area, latlng.floor, latlng.dealAmount]
        }
      })
    
      for(const idx in map){
        this.markerPositions.push([map[idx][0], map[idx][1], map[idx][2], map[idx][3], map[idx][4], map[idx][5], map[idx][6]]);
      }
      // this.markerPositions = map;
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
    },
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