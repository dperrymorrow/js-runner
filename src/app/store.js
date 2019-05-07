const store = new Vuex.Store({
  state: {
    javascript: "",
    raw: "import \"moment\";\n\n\"date was \" + moment('2018-11-23').fromNow();",
    imports: [],
    logs: [],

  },
  mutations: {
    clearLogs: state => (state.logs =  []),
    addLog: (state, log) => state.logs.push(log),
    setRaw(state, raw){
      const pattern = /(["'])(.*?[^\\])\1/g;

      state.imports = raw.split("\n").filter(line => line.startsWith("import")).map(line => {
        return pattern.test(line) ? line.match(pattern).pop().replace(/['"]+/g, "") : null;
      }).filter(lib => lib);

      state.javascript = raw.split("\n").filter(line => !line.startsWith("import ") && !line.startsWith("//")).join("\n");

      state.raw = raw;
    },
  },
});

const org = console.log;
console.log = function() {
  org(...arguments);
  store.commit("addLog", Array.from(arguments));
};

export default store;
