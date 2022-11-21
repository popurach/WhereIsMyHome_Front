<template>
    <div>
        <h1>아파트 로드뷰</h1>
        <div id="roadview" style="width:500px; height:470px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roadviewPosition : [this.selectedItems.lat, this.selectedItems.lng],
            map: null,
        }
    },
    props:{
        selectedItems: Object,
    },
    watch: {
        selectedItems: function(){
            this.roadviewPosition = [this.selectedItems.lat, this.selectedItems.lng];
            console.log('watch 호출')
        
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
    mounted() {
        this.$nextTick(function () {
        // 모든 화면이 렌더링된 후 실행합니다.
            console.log('props', this.selectedItems);
            
            this.map = this.$store.state.map;
            if(this.map!=null){
                console.log('props', this.map);
                var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
                var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
                var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
                
                var position = new kakao.maps.LatLng(this.selectedItems.lat, this.selectedItems.lng);
                // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
                roadviewClient.getNearestPanoId(position, 50, function(panoId) {
                    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
                });
            }
        })
        
    },
}
</script>

<style>

</style>