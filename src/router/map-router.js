export default (component) => {
  if (component === "baseLayout") {
    component = "layout/index.vue";
  } else {
    component = `views/${component}`;
  }
  return () => import(`@/${component}`);
};
