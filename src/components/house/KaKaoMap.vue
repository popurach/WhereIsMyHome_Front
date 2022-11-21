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
        <button @click="displayMarker(markerPositions)">display마커</button>
    </div>
</template>

<script>
export default {
    name: "KaKaoMap",
    data() {
        return {
            markerPositions:[
                [33.450705, 126.570677], 
                [33.450936, 126.569477]
            ],
            marker:{},
            markers: [],
            markerPos : [this.selectedItems.lat, this.selectedItems.lng],
            centerPos : [this.selectedItems.lat, this.selectedItems.lng],
            tmp  : false,
            map : null,
            icon : null,

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
            
            console.log(this.map);
            // this.$store.state.map = this.map;
            var icon = new kakao.maps.MarkerImage(
                '../../../images/marker.png',
                new kakao.maps.Size(40, 50),

            )
            console.log('selectedItems', this.selectedItems)
            console.log('마커위치', this.markerPos)
            this.marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(this.markerPos[0],this.markerPos[1]),
                image: icon,
            });
            this.marker.setMap(this.map);

            //로드 뷰 생성
            this.roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(this.roadviewContainer); //로드뷰 객체
            this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

            var position = new kakao.maps.LatLng(this.selectedItems.lat, this.selectedItems.lng);
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            this.roadviewClient.getNearestPanoId(position, 50, function(panoId) {
                console.log('panoid', panoId)
                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
            

        },
        displayMarker(markerPositions) {
            if (this.markers.length > 0) {
                this.markers.forEach((marker) => marker.setMap(null));
            }

            const positions = markerPositions.map(
                (position) => new kakao.maps.LatLng(...position)
            );
            console.log('포지션임',positions);
            if (positions.length > 0) {
                this.markers = positions.map(
                (position) =>
                    new kakao.maps.Marker({
                    map: this.map,
                    position,
                    })
                );

                const bounds = positions.reduce(
                    (bounds, latlng) => bounds.extend(latlng),
                    new kakao.maps.LatLngBounds()
                );
                console.log(this.map);

                this.map.setBounds(bounds);
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
#map {
    width: 400px;
    height: 400px;        
    }
</style>