<template>
  <v-app>
    <div id="app">
      <AppBar></AppBar>

      <v-container class="mt-16 d-container" style='padding-bottom : 1rem'>
        <router-view></router-view>
      </v-container>
    </div>

    <Footer id="footer"></Footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    AppBar: () => import("@/components/layout/appbar.vue"),
    Footer: () => import("@/components/layout/footer.vue"),
  },
  data: () => ({}),
};
</script>

<style>
#app{
  height: auto;
  min-height: 100%;
}
#footer{
  position: relative;
  transform: translateY(-100%);
}
.d-container{
  width: 100vw;
  display:flex;
  justify-content: center;
}
</style>