// 自定义 urlchange 事件（用来监听 URL 变化）
export function addUrlChangeEvent() {
  history.pushState = ((f) =>
    function pushState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("urlchange"));
      return ret;
    })(history.pushState);

  history.replaceState = ((f) =>
    function replaceState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("urlchange"));
      return ret;
    })(history.replaceState);

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("urlchange"));
  });
}
