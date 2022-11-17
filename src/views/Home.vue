<template>
  <div class="col-12">
    <v-card to="detail">
        <v-img
            :aspect-ratio="16 / 9"
            dark
            height="500px"
            src="../images/main.jpg"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
              <v-col>
                <v-btn color="accent" to="detail">SEARCH</v-btn>
              </v-col>
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 py-3" style="line-height: 1.2">
                  아파트 매물 검색
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
};
</script>
