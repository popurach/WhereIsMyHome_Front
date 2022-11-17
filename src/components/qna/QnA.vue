<template>
  <div class="col-12">
    <QnASearch></QnASearch>
    <hr style="margin-bottom:2%">
    <QnAList></QnAList>
  </div>
</template>

<script>
import QnAList from "./QnAList";
import QnASearch from "./QnASearch";

export default {
    name:"QnA",
    components:{
        QnAList,
        QnASearch
    }

}
</script>