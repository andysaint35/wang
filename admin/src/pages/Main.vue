<template>
  <v-app
    :dark="dark"
    standalone="standalone"
  >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      persistent="persistent"
      enable-resize-watcher="enable-resize-watcher"
      :dark="dark"
    >
      <div
        class="pa-3 text-xs-center"
        v-show="!mini"
      >
        <div class="display-2 py-4">{{ $t('Admin Page') }}</div>
        <p>{{$t('Created by Andy')}}</p>
        <div style="padding-left:5em">
          <v-switch
            :label="(!dark ? '亮' : '暗') + ' 主题'"
            v-model="dark"
            :dark="dark"
            hide-details="hide-details"
          ></v-switch>
        </div>

      </div>
      <div
        class="pa-3 text-xs-center"
        v-show="mini"
      >
        <div class="display-2">A</div>
      </div>
      <v-divider></v-divider>
      <v-list dense="dense">
        <template v-for="item in menu">
          <v-list-group
            v-if="item.items"
            v-bind:group="item.group"
          >
            <v-list-tile
              :to="item.href"
              slot="item"
              :title="item.title"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.href"
              :to="subItem.href"
              v-bind:router="!subItem.target"
              ripple="ripple"
              v-bind:disabled="subItem.disabled"
              v-bind:target="subItem.target"
            >
              <v-list-tile-action v-if="subItem.icon">
                <v-icon class="success--text">{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ $t(subItem.title) }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-subheader v-else-if="item.header">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider"></v-divider>
          <v-list-tile
            v-else="v-else"
            :to="item.href"
            router="router"
            ripple="ripple"
            v-bind:disabled="item.disabled"
            :title="item.title"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      class="darken-1"
      fixed="fixed"
      dark="dark"
      :class="theme"
    >
      <v-toolbar-side-icon
        dark="dark"
        @click.native.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>{{$t(pageTitle)}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y="offset-y">
        <v-btn
          icon="icon"
          dark="dark"
          slot="activator"
        >
          <v-icon dark="dark">language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="lang in locales"
            :key="lang"
            @mouseover.native="changeLocale(lang)"
          >
            <v-list-tile-title>{{lang}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y="offset-y">
        <v-btn
          icon="icon"
          dark="dark"
          slot="activator"
        >
          <v-icon dark="dark">format_paint</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="n in colors"
            :key="n"
            :class="n"
            @mouseover.native="theme = n"
          ></v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <v-container
        class="pa-4"
        fluid="fluid"
      >
        <v-alert
          v-bind="message"
          v-model="message.body"
          dismissible="dismissible"
        >{{message.body}}</v-alert>
        <div class="py-2">
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </div>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dark: false,
      theme: "primary",
      mini: false,
      drawer: true,
      locales: ["en-US", "zh-CN"],
      colors: ["blue", "green", "purple", "red"]
    };
  },
  computed: {
    ...mapState(["message", "menu", "pageTitle"])
  },
  methods: {
    changeLocale(to) {
      global.helper.ls.set("locale", to);
      this.$i18n.locale = to;
    },
    fetchMenu() {
      // fetch menu from server
      // this.$http.get('menu').then(({data}) => this.$store.commit('setMenu', data))
    }
  },
  created() {
    this.fetchMenu();
  }
};
</script>

