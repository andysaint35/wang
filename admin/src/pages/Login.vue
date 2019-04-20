<template>
  <div>

    <v-dialog
      :value="true"
      persistent=""
    >

      <v-card style="background:#fff">
        <!-- <v-card-row class="deep-purple darken-1"> -->
        <v-card-title class="white--text deep-purple darken-1">
          <div class="text-xs-center"> {{$t("Login")}}</div>
        </v-card-title>
        <!-- </v-card-row> -->
        <!-- <v-card-row> -->
        <v-card-text class="pt-4">
          <v-form
            v-model="model"
            action="/0/login"
            :fields="fields"
            @success="onSuccess"
            submitButtonText="Login"
            urlResource="login"
          >

          </v-form>
          <v-alert
            error="error"
            v-model="loginFail.show"
          >{{loginFail.message}}</v-alert>

        </v-card-text>
        <!-- </v-card-row> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
body {
  background: #666 !important;
}
</style>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      fields: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },
      show: true,
      loginFail: {
        show: false,
        message: ""
      }
    };
  },
  methods: {
    onSuccess(res) {
      this.loginFail.show = false;
      console.log("res", res);
      if (res.succeed && res.data.length > 0) {
        sessionStorage.setItem("setAuth", res.data[0]);
        this.$store.commit("setAuth", res.data[0]);
        this.$router.replace("/");
      } else {
        this.loginFail = {
          show: true,
          message: "用户名或密码不正确"
        };
      }
      //this.$store.commit('setAuth', data)
      //this.$router.replace('/')
    }
  },

  mounted() {}
};
</script>
