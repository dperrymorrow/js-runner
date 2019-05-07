<template>

  <div class="log">

    <span
      v-for="(item, index) in log"
      :key="index"
      :class="determineType(item)"
      class="log-item">{{ item }}</span>

  </div>

</template>

<script>
export default {
  name: "Log",

  props: {
    log: { type: Array, required: true }
  },

  methods: {
    determineType(item) {
      return typeof item === "object" ? "object" : null;
    }
  }
};
</script>


<style lang="stylus">
@require "../../vars.styl"

.log
  background-color: lighten($bg-color, 10%)
  padding: ($padding/2) $padding
  color: darken($white, 10%)
  
  .log-item

    &.object
      display: block
      white-space: pre-wrap

    &:after
      content: ", "

    &:last-child
      &:after
        content: ""

</style>
