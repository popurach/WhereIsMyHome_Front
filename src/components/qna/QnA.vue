<template>
  <div>
    <QnASearch></QnASearch>
    <hr>
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