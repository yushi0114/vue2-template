import { useStyleTag } from "@vueuse/core";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const cacheOption = {
  color: "var(--sjc-primary-color)",
  spinner: false,
};

export function useNProgress(option) {
  const opt = Object.assign(cacheOption, option);

  NProgress.configure({
    showSpinner: opt.spinner,
  });

  const { load } = useStyleTag(`
#nprogress {
    pointer-events: none;
}

#nprogress .bar {
    z-index: 3000;
    position: fixed;
    background: ${opt.color} !important;
}
    `);

  load();

  return NProgress;
}
