export default (component) => {
  return () => import(`@/views${component}.vue`);
};
