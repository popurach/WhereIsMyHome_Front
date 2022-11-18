<template>
    <div>
        <h1>아파트 위치 정보</h1>
        <div id = "map"></div>
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
            markers: [],
            markerPos : [this.selectedItems.lat, this.selectedItems.lng],
            centerPos : [this.selectedItems.lat, this.selectedItems.lng],
            tmp  : false,
            map : null,
            icon : null
        }
    }, 
    props:{
        selectedItems: Object,
    },
    watch:{
        'selectedItems': 'moveCenter', 
    },
    methods: {
        initMap(){
            const container = document.getElementById("map");

            const options = {
                center: new kakao.maps.LatLng(this.centerPos[0],this.centerPos[1]),
                level: 5,
                keyboardShortcuts:true,
            };
            var map = new kakao.maps.Map(container, options);
            this.map = map
            
            var icon = new kakao.maps.MarkerImage(
                '../../../images/marker.png',
                new kakao.maps.Size(40, 50),

            )
            console.log('selectedItems', this.selectedItems)
            console.log('마커위치', this.markerPos)
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(this.markerPos[0],this.markerPos[1]),
                image: icon,
            });
            this.marker= marker



            marker.setMap(map);

        },
        displayMarker(markerPositions) {
            if (this.markers.length > 0) {
                this.markers.forEach((marker) => marker.setMap(null));
            }

            const positions = markerPositions.map(
                (position) => new kakao.maps.LatLng(...position)
            );

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
        moveCenter(){
        this.markerPos = [this.selectedItems.lat, this.selectedItems.lng];
        this.centerPos = [this.selectedItems.lat, this.selectedItems.lng];

        this.marker.setPosition( new kakao.maps.LatLng(...this.markerPos))
        this.map.setCenter(  new kakao.maps.LatLng(...this.centerPos))

        console.log('hit')
        console.log('marker pos:' , this.marker.getPosition());
        console.log('center pos:' , this.map.getCenter())
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