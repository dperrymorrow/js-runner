

const listeners = [];
const notify = () => listeners.forEach(cb => cb($dom.input.value));
const highlight = () => {
  $dom.preview.innerHTML = Prism.highlight(
    $dom.input.value,
    Prism.languages.javascript,
    "javascript"
  );
  window.requestAnimationFrame(highlight);
};

const $dom = {
  input: document.getElementById("editor-input"),
  preview: document.getElementById("editor-preview")
};

$dom.input.addEventListener("keyup", notify);
window.requestAnimationFrame(highlight);

export default {
  $dom,
  subscribe: cb => {
    listeners.push(cb);
    cb($dom.input.value);
  }
};
