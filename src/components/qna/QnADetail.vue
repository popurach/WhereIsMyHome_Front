<template >
    <div class='d-layout col-12' style="padding-bottom : 230px">
		<h1 class='content-title'>QnA 게시판 상세보기</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="30%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td>{{detailqna.title}}</td>
					</tr>
                    <tr>
                        <th>작성자</th>
                        <td>{{detailqna.writer}}</td>
                    </tr>
                    <tr>
                        <th>작성일자</th>
                        <td>{{detailqna.date}}</td>
                    </tr>
					<tr >
						<th class='last_tr'>내용</th>
						<td class="txt_cont last_tr description">{{detailqna.content}}</td>
					</tr>
				</table>
			</form>
		</div>
        <div style="margin-bottom:4%;" align="center">
            <v-btn class="mr-4" @click="update">
                수정
            </v-btn>
            <v-btn class="mr-4" @click="remove">
                삭제
            </v-btn>
            <v-btn @click="fnList">
                목록
            </v-btn>
        </div>
		<qn-a-comment></qn-a-comment>	
        
	</div>
</template>

<script>
import QnAComment from "./QnAComment.vue";
import http from "@/api/http";

export default {
    name:"QnADetail",
    data() {
        return {
            detailqna:this.$store.state.detailqna,
        }
    },
    methods: {
        fnList(){
            this.$router.push({path:'./QnA'});
        },
        update(){
            this.$router.push({path:"./qnaupdate"});
        },
        remove(){
            http.delete(`/qna/${this.detailqna.num}`)
                .then(()=>{
                    alert("글을 삭제했습니다!");
                    this.$router.push({path:'./QnA'});
                })
                .catch(()=>{
                    alert("글 삭제에 실패했습니다.");
                })
        }
    },
	components:{
		QnAComment
	}
}
</script>

<style>
    .AddWrap{width: 100%; margin-bottom: 40px;}
    .tbAdd{border:1px solid #888; width : 100%; border-radius: 10px;}
	.tbAdd th{border:1px solid rgba(0,0,0,0.1); padding:1rem 0; border-top : none;border-left: none }
	.tbAdd td{border-bottom:1px solid rgba(0,0,0,0.1); padding:1rem 0; padding-left: 1rem;}
	.tbAdd td.txt_cont{height:200px; vertical-align:top;}

    .last_tr{
        border-bottom : none !important;
    }
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
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