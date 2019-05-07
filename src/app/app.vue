<template>
  <div class="container">
    <div class="app">
      <editor class="pane" />
      <runner class="pane" />
    </div>
    <pre>
      {{ $store.state }}
    </pre>
  </div>
</template>

<script>
import editor from "./editor.js";
import runner from "./runner.js";

export default {
  name: "App",
  components: { editor, runner }
};
</script>

<style lang="stylus">

body, html
  padding: 0
  margin: 0

.container
  display: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0

.app
  display: flex
  height: 100vh

  &.debug
    height: 50vh

  .pane
    width: 50%
    height: 100%
    overflow: auto

</style>
