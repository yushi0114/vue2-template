export default (component) => {
  if (component === "/empty") {
    component = "layout/index.vue";
  } else {
    component = `views${component}`;
  }
  return () => import(`@/${component}`);
};
