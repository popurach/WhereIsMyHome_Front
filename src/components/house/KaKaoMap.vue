<template>
    <div style='display:flex; align-items:center;'>
        <div style='margin:30px'>
            <h1>아파트 위치 정보</h1>
            <div id = "map" style="width:500px; height:470px;"></div>
        </div>
        <div>
            <h1>아파트 로드뷰</h1>
            <div id="roadview" style="width:500px; height:470px;"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "KaKaoMap",
    data() {
        return {
            marker:{},
            markers: [],
            markerPos : [this.selectedItems.lat, this.selectedItems.lng],
            centerPos : [this.selectedItems.lat, this.selectedItems.lng],
            mapCustomOverlay: null,
            tmp  : false,
            map : null,
            icon : null,
            aptSearch : this.selectedItems.dongName + ' ' + this.selectedItems.aptName,
            //로드 뷰 데이터
            roadviewPosition : [this.selectedItems.lat, this.selectedItems.lng],
        }
    }, 
    props:{
        selectedItems: Object,
    },
    watch:{
        selectedItems: function(){
            this.markerPos = [this.selectedItems.lat, this.selectedItems.lng];
            this.centerPos = [this.selectedItems.lat, this.selectedItems.lng];
            this.roadviewPosition = [this.selectedItems.lat, this.selectedItems.lng];
            console.log('watch 호출')
        
            this.marker.setPosition(new kakao.maps.LatLng(...this.markerPos))
            this.map.setCenter( new kakao.maps.LatLng(...this.centerPos))

            this.aptSearch = this.selectedItems.dongName + ' ' + this.selectedItems.aptName;

            //커스텀 오버레이
            this.mapCustomOverlay.setMap(null);
            console.log('커스텀 오버레이 설정');
            console.log(this.selectedItems);

            var content = '<div class="overlay_info">';
            content += `    <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${this.aptSearch}" target="_blank"><strong> ${this.selectedItems.aptName} </strong></a>`;
            content += '    <div class="desc">';
            content += '        <img src="../../../images/apt_test.jpg" alt="">';
            content += '        <div class="innerdesc">';
            content += `            <span class="address">${this.selectedItems.area}㎡</span><br>`;
            content += `            <span class="address">${this.selectedItems.dealAmount}만원</span><br>`;
            content += `            <span class="address">${this.selectedItems.floor}층</span>`;
            content += '        </div>';
            content += '    </div>';
            content += '</div>';

            var custom_position = new kakao.maps.LatLng(this.selectedItems.lat,this.selectedItems.lng);
            
            this.mapCustomOverlay = new kakao.maps.CustomOverlay({
                position: custom_position,
                content: content,
                // xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
                yAnchor: 1.5 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
            });
            this.mapCustomOverlay.setMap(this.map);
            
            //로드뷰
            
            var roadview = new kakao.maps.Roadview(this.roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            var position = new kakao.maps.LatLng(...this.roadviewPosition);
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            roadviewClient.getNearestPanoId(position, 50, function(panoId) {
                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
        }, 
    },
    methods: {
        initMap(){
            const container = document.getElementById("map");

            const options = {
                center: new kakao.maps.LatLng(this.centerPos[0],this.centerPos[1]),
                level: 5,
                keyboardShortcuts:true,
            };
            this.map = new kakao.maps.Map(container, options);
            
            // this.$store.state.map = this.map;
            var icon = new kakao.maps.MarkerImage(
                '../../../images/marker.png',
                new kakao.maps.Size(40, 50),

            )
            
            this.marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(this.markerPos[0],this.markerPos[1]),
                image: icon,
            });
            this.marker.setMap(this.map);

            //커스텀 오버레이
            var content = '<div class="overlay_info">';
            content += `    <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${this.aptSearch}" target="_blank"><strong> ${this.selectedItems.aptName} </strong></a>`;
            content += '    <div class="desc">';
            content += '        <img src="../../../images/apt_test.jpg" alt="">';
            content += '        <div class="innerdesc">';
            content += `            <span class="address">${this.selectedItems.area}㎡</span><br>`;
            content += `            <span class="address">${this.selectedItems.dealAmount}만원</span><br>`;
            content += `            <span class="address">${this.selectedItems.floor}층</span>`;
            content += '        </div>';
            content += '    </div>';
            content += '</div>';

            var custom_position = new kakao.maps.LatLng(this.markerPos[0],this.markerPos[1]);
            
            this. mapCustomOverlay = new kakao.maps.CustomOverlay({
                position: custom_position,
                content: content,
                // xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
                yAnchor: 1.5 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
            });
            this.mapCustomOverlay.setMap(this.map);

    
            //로드 뷰 생성
            this.roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(this.roadviewContainer); //로드뷰 객체
            this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

            var position = new kakao.maps.LatLng(this.selectedItems.lat, this.selectedItems.lng);
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            this.roadviewClient.getNearestPanoId(position, 50, function(panoId) {
                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
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
.overlay_info{
    /* white-space: pre-wrap; */
    position: relative;
    display: inline-block;
    min-width: 200px;
    min-height: 50px;
    border-radius: 10px;
    padding: 10px;
    background-color: darksalmon;
    width: auto;
}
.overlay_info:after{
    content: '';
    position: absolute;
    display:flex;
    left: 50%;
    bottom: -20px;  /** 아래 top의 두께와 같다 **/
    border-top: 20px solid red;
    border-right: 20px solid transparent;
}
.desc{
    word-break: break-all;
    display:flex; 
    align-items:center;
    width:100%
}
.innerdesc{
    padding-left: 10px;
    width:100%;
}
.overlay_info img{
    position: relative;
    display:block;
    height:100%;
    width:50%;
}
#map {
    width: 400px;
    height: 400px;        
    }
</style>