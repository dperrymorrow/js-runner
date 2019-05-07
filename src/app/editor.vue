<template>
  <div class="editor">
    <mirror
      :tabs="true"
      :resize="false"
      :monospace="true"
      :allow-tab="true"
      v-model="raw">
      <div
        class="preview"
        v-html="colored" />
    </mirror>
  </div>
</template>

<script>
import Mirror from "./components/mirror.js";
export default {
  name: "Editor",

  components: { Mirror },

  computed: {
    raw: {
      get() {
        return this.$store.state.raw;
      },
      set(val) {
        this.$store.commit("setRaw", val);
      },
    },

    colored() {
      return `${Prism.highlight(
        this.$store.state.raw,
        Prism.languages.javascript,
        "javascript"
      )}\n\n`;
    }
  },


  mounted() {
    this.$store.commit("setRaw", this.$store.state.raw);
  },
};
</script>

  <style lang="stylus">
  .editor
    padding: $padding

    div
      height: 100%


  </style>
