<template>

  <v-layout>
    <v-flex md8="md8">
      <v-form v-model="model" v-bind="$data" method="patch" action="settings" @success="onSuccess">
        <div class="my-4" slot="buttons">
          <v-btn class="grey" dark="dark" @click.native="$root.back()">
            <v-icon dark="dark" left="left">chevron_left</v-icon><span>Back</span>
          </v-btn>
          <v-btn primary="primary" dark="dark" type="submit">Submit
            <v-icon right="right" dark="dark">send</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-flex>
    <v-flex md4="md4">
      <h5>{{$t('Result:')}}</h5>
      <p>{{model}}</p>
    </v-flex>
  </v-layout>
</template>

<script>

export default {

  data () {
    return {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    }
  },
  computed: {

    isEdit () {
      return !!this.id
    }

  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
    },
    updateFields () {

    },
    fetch () {
      this.$http.get(`settings/form`, {
        params: {id: this.id}
      }).then(({data}) => {
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    onSubmit () {

    },
    onSuccess (data) {

    }
  },
  created () {

  },
  mounted () {
    this.fetch()
  }
}
</script>
