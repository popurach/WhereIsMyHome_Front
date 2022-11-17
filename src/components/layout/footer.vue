<template>
  <div >
    <v-card fixed app color="footer" dark flat>
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <h4 class="text-h5 font-weight-bold">
              SSAFY 8기
            </h4>
            <p class="text-body-1">
              서울 14반
            </p>
          </v-col>

          <v-col cols="9" md="3">
            <v-list color="transparent" flat>
              <v-subheader class="text-h6">Vue</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                    v-for="(item, i) in vue"
                    :key="i"
                    :href="item.href"
                    dense
                    target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                        class="text-body-1"
                        v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col cols="9" md="3">
            <v-list color="transparent" flat>
              <v-subheader class="text-h6">Spring</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                    v-for="(item, i) in spring"
                    :key="i"
                    :href="item.href"
                    dense
                    target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                        class="text-body-1"
                        v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>

        <div class="text-center mt-6">
          Copyright &copy;
          누리, 호준
          {{ new Date().getFullYear() }}. All rights reserved.
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    vue: [
      {
        text: "노누리",
        href: "https://github.com/AGDholo",
      },
      {
        text: "이호준",
        href: "https://heroui.net/",
      },
    ],
    spring: [
      {
        text: "노누리",
        href: "https://github.com/AGDholo/giraffe",
      },
      {
        text: "이호준",
        href: "https://github.com/AGDholo/giraffe/issues",
      }
    ],
  }),
};
</script>
