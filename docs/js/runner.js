

let lastRun = "";
const pattern = /(["'])(.*?[^\\])\1/g;
const $dom = {
  result: document.getElementById("runner-result"),
  logs: document.getElementById("runner-logs"),
  clear: document.getElementById("clear"),
  depContainer: document.getElementById("script-container")
};

$dom.clear.addEventListener("click", () => {
  $dom.logs.innerHTML = "";
});

const gatherImports = (code) => {
  return code.split("\n").filter(line => line.startsWith("import")).map(line => {
    return pattern.test(line) ? line.match(pattern).pop().replace(/['"]+/g, "") : null;
  }).filter(lib => lib);
};

const loadDeps = (code) => {
  const deps = gatherImports(code);
  $dom.depContainer.innerHTML = "";

  return Promise.all(deps.map(dep => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", `https://unpkg.com/${dep}`);
      script.addEventListener("load", () => resolve());
      $dom.depContainer.appendChild(script);
    });
  }));
};

const parseLogArg = arg => {
  if (typeof arg === "object") return Prism.highlight(
    JSON.stringify(arg, null, 2),
    Prism.languages.javascript,
    "javascript"
  );
  return arg;
};


const onlyJs = (code) => code.split("\n").filter(line => !line.startsWith("import ") && !line.startsWith("//")).join("\n");

export default {
  $dom,
  async run(code) {
    "use strict";

    if (code.trim() == lastRun.trim()) return;
    lastRun = code;
    $dom.result.classList.remove("error");
    $dom.result.innerHTML = "";

    try {
      await loadDeps(code);

      const orgLog = console.log;
      console.log = function () {
        Array.from(arguments).forEach(arg => {
          $dom.logs.innerHTML += `<li>${parseLogArg(arg)}</li>`;
        });
        orgLog(...arguments);
      };

      $dom.result.innerText = eval(onlyJs(code));
      console.log = orgLog;

      $dom.logs.scrollTop = $dom.logs.querySelector("li:last-child").scrollIntoView({
        behavior: "smooth"
      });

    } catch(err) {
      $dom.result.classList.add("error");
      $dom.result.innerText = err;
    }
  }
};
