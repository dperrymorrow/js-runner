<template>
  <div
    ref="container"
    class="mirror-container"
  >
    <div
      ref="preview"
      class="mirror-preview"
    >
      <slot>
        <div v-html="preview"/>
      </slot>
    </div>

    <textarea
      ref="input"
      :spellcheck="spellcheck"
      v-model="internalValue"
      :disabled="disabled"
      class="mirror-input"
      @keydown.tab="tab"
      @scroll="scroll"
    />
  </div>
</template>


<script>
export default {
  name: "Mirror",
  props: {
    value: { type: String, note: "the string to v-model", required: false, default: "" },
    preview: {
      type: String,
      note: "the html rendered in the preview div",
      required: false,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: Boolean,
      note: "allow resizing of the textarea",
      required: false,
      default: true,
    },
    allowTab: {
      type: Boolean,
      note: "Allow tabbing in the textarea",
      required: false,
      default: false,
    },
    defaultHeight: { type: Number, note: "height of the textarea", required: false, default: 200 },
    monospace: {
      type: Boolean,
      note: "use a monospace font or default",
      required: false,
      default: true,
    },
    spellcheck: {
      type: Boolean,
      note: "this will enable/disable browser spellchecking",
      required: false,
      default: false,
    },
  },

  computed: {
    internalValue: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      },
    },
  },

  async updated() {
    await this.$nextTick();
    this.scroll();
  },

  mounted() {
    if (this.monospace) {
      this.$refs.input.style.fontFamily = this.$refs.preview.style.fontFamily = "Monaco, Monospace";
    }

    this.$refs.input.style.height = `${this.defaultHeight}px`;
    if (this.resize) this.$refs.input.style.resize = "vertical";
  },

  methods: {
    tab($event) {
      if (!this.allowTab) return;
      $event.stopPropagation();
      $event.preventDefault();
      document.execCommand("insertHTML", true, "  ");
    },
    scroll() {
      Array.from(this.$refs.preview.childNodes).forEach(
        $child => ($child.scrollTop = this.$refs.input.scrollTop)
      );
    },
  },
};
</script>

<style lang="stylus">
.mirror-container
  display: flex
  position: relative
  width: 100%

  textarea.mirror-input, .mirror-preview, .mirror-preview > *
    background: transparent !important
    font-size: 16px !important
    font-weight: normal
    letter-spacing: .01em
    line-height: 20px
    box-sizing: border-box

  textarea.mirror-input, .mirror-preview
    background: transparent !important
    border: none !important
    caret-color: orange
    margin: 0 !important
    outline: none
    resize: none
    text-transform: none
    white-space: pre-wrap
    width: 100%
    word-break: break-all

  .mirror-preview
    height: 100%
    overflow: hidden
    padding: 0
    position: absolute
    top: 0
    z-index: 3

    > *
      height: 100%
      left: 0
      overflow: hidden
      padding: 20px
      position: absolute
      top: 0
      width: 100%

  textarea.mirror-input, .mirror-preview > *
    padding: 20px

  textarea.mirror-input
    caret-color: orange
    color: rgba(white, 0) !important
    display: inline-flex
    min-height: 100%
    position: relative
    z-index: 4

    &::selection
      background-color: rgba(orange, .3)
</style>
