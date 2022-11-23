<template>
    <div>
        <table class="tbAdd">
            <colgroup>
                <col width="20%" />
                <col width="*" />
            </colgroup>
            <tr>
                <th>아파트 이름</th>
                <td>{{selectedItems.aptName}}</td>
            </tr>
            <tr>
                <th>가격</th>
                <td>{{selectedItems.dealAmount}}(만원)</td>
            </tr>
            <tr>
                <th>거래 날짜</th>
                <td>{{selectedItems.dealYear}}년 {{selectedItems.dealMonth}}월 {{selectedItems.dealDay}}일</td>
            </tr>
            <tr>
                <th>층</th>
                <td>{{selectedItems.floor}}층</td>
            </tr>
            <tr >
                <th>전용 면적</th>
                <td>{{selectedItems.area}}㎡</td>
            </tr>
        </table>
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
    .tbAdd{border:1px solid #888; width : 100%; border-radius: 10px;}
	.tbAdd th{border:1px solid rgba(0,0,0,0.1); padding:1rem 0; border-top : none;border-left: none }
	.tbAdd td{border-bottom:1px solid rgba(0,0,0,0.1); padding:1rem 0; padding-left: 1rem;}
	.tbAdd td.txt_cont{height:200px; vertical-align:top;}

    .description{
        overflow: scroll;
        overflow-x: hidden;
        letter-spacing: 0.5px;
        line-height: 200%;
    }
    .content-title{
        margin-bottom : 40px;
        margin-top:30px;
    }
    .d-layout{
        max-width: 1200px;
    }
    .container{
        width: 100vw;
        display: flex;
        align-items: center;
    }
</style>