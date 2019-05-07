<template>
  <div class="runner">
    <pre
      :class="{ error: hasError }"
      class="result"
      v-html="result" />
    <log
      v-for="(log,index) in $store.state.logs"
      :log="log"
      :key="index"
    />
  </div>
</template>

<script>
import log from "./components/log.js";

export default {
  name: "Runner",
  components: { log },

  data() {
    return {
      result: "",
      hasError: false,
    };
  },

  computed: {
    colored() {
      return this.result && !this.hasError ? Prism.highlight(
        this.result,
        Prism.languages.javascript,
        "javascript"
      ) : this.result;

    },
    code() {
      return this.$store.state.javascript;
    }
  },

  watch: {
    code() {

      this.runCode();

    }
  },

  methods: {
    async runCode() {
      this.hasError = false;
      this.$store.commit("clearLogs");
      try {
        await this.loadDeps();
        this.result = eval(this.$store.state.javascript);
      } catch (err) {
        this.hasError = true;
        return this.result = err;
      }
    },


    loadDeps() {
      const $host = document.getElementById("script-container");
      $host.innerHTML = "";

      return Promise.all(this.$store.state.imports.map(dep => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.setAttribute("src", `https://unpkg.com/${dep}`);
          script.addEventListener("load", () => resolve());
          $host.appendChild(script);
        });
      }));
    }
  },
};
</script>

<style lang="stylus">
@require "../vars.styl"

.runner
  background-color: darken($bg-color, 10%)
  font-size: $font-size

  pre.result
    padding: $padding

    &:empty
      display: none

    &.error
      color: $red
</style>
