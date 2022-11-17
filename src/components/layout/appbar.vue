<template>
  <div>
    <v-navigation-drawer
        v-if="!$vuetify.breakpoint.smAndUp"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        color="primary"
        dark
    >
      <v-list color="primary" nav>
        <v-list-item
            v-for="(item, i) in btnItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-for="(item, i) in barItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="white"
        elevate-on-scroll
        flat
    >
      <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon
                v-if="!$vuetify.breakpoint.mdAndUp"
                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title
                class="font-weight-bold text-h5 primary--text"
                style="cursor: pointer"
                @click="$router.push('/')"
            >
              <v-icon color="primary" large>mdi-feather</v-icon>
              구해줘
              <span class="accent--text">홈즈</span>
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3">
            <v-btn
                v-for="(item, i) in barItems"
                :key="i"
                :to="item.to"
                class="text-capitalize"
                exact
                exact-active-class="accent--text"
                text
            >{{ item.title }}
            </v-btn
            >
          </v-col>

          <v-col v-if="userId!=''" cols="2">
            <v-btn
                class="text-capitalize"
                to="/comment"
                exact
                exact-active-class="accent--text"
                text
            >관심지역
            </v-btn
            >
            <v-btn
                class="text-capitalize"
                @click="logout"
                exact
                exact-active-class="accent--text"
                text
            >로그아웃
            </v-btn
            >
          </v-col>
          <v-col v-if="userId===''" cols="2">
            <v-btn
                class="text-capitalize"
                to="/login"
                exact
                exact-active-class="accent--text"
                text
            >로그인
            </v-btn
            >
          </v-col>

          <!-- <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-right">
            <v-btn
                v-for="(item, i) in btnItems"
                :key="i"
                :color="item.color"
                :href="item.href"
                :outlined="item.outlined"
                :target="item.target"
                :to="item.to"
                class="ml-3 text-capitalize"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-btn>
          </v-col> -->
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data: () => ({
    drawer: null,
    barItems: [
      {
        title: "아파트매매정보",
        to: "/detail",
      },
      {
        title: "QnA",
        to: "/qna",
      },
    ],
  }),
  computed:{...mapGetters({userId:"loginGetter"})},
  methods:{
    logout(){
      this.$store.dispatch("logoutAction");
    }
  }
};
</script>
