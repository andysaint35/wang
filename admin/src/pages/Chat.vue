<template>
  <v-container>
    <v-alert
      warning="warning"
      v-model="showWarning"
    >tips: A Socket Server is needed.</v-alert>
    <v-list two-line="two-line">
      <template v-for="item in list">
        <v-subheader
          v-if="item.header"
          v-text="item.header"
        ></v-subheader>
        <v-divider
          v-else-if="item.divider"
          v-bind:inset="item.inset"
        ></v-divider>
        <v-list-tile
          v-else
          v-bind:key="item.title"
        >
          <v-list-tile-avatar><img v-bind:src="item.avatar" /></v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle">

            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <timeago
                :since="item.time"
                :auto-update="10"
              ></timeago>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-layout>
      <v-flex
        xs12="xs12"
        xl6="xl6"
      >
        <v-text-field
          v-model="message"
          label="Type your message and press Enter to send..."
          @keyup.enter.native="send"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import ws from 'adonis-websocket-client'
// const io = ws(global.config.url, {})
// const client = io.channel('chat')

export default {
  data() {
    return {
      list: [
        {
          header: "title1"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "2425",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          time: "2018-04-05"
        },
        { divider: true, inset: true }
      ],
      message: "",
      showWarning: false,
      maxLength: 6
    };
  },

  methods: {
    send() {
      if (this.message.length < 1) {
        return false;
      }
      this.$socket.emit("fromClient", this.message);
      this.message = "";
    }
  },
  mounted() {},
  sockets: {
    connect() {},
    fromService(data) {
      console.log(data);
    }
  }
};
</script>
