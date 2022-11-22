<template>
    <div>
        <h1>아파트 이름 : {{selectedItems.aptName}}</h1> 
        <h1>가격 : {{selectedItems.dealAmount}}(만원)</h1>
        <h1>거래 날짜 : {{selectedItems.dealYear}}년 {{selectedItems.dealMonth}}월 {{selectedItems.dealDay}}일</h1>
        <h1>층 : {{selectedItems.floor}}</h1>
        <h1>전용 면적 : {{selectedItems.area}}</h1>
    </div>
</template>

<script>
export default {
    name: "HouseDetail",
    props:{
        selectedItems: Object,
    },
}
</script>

<style>

</style>