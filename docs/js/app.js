

import editor from "./editor.js";
import runner from "./runner.js";

let timerId;

export default function() {
  editor.subscribe(code => {

    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      runner.run(code);
      timerId = null;
    }, 300);

  });
}
