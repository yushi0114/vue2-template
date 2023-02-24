export function withInstall(options) {
  options.install = (Vue) => {
    const { name } = options;
    if (name) {
      Vue.component(name, options);
      Vue.component(camelize(`-${name}`), options);
    }
  };

  return options;
}

const camelizeRE = /-(\w)/g;
const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
