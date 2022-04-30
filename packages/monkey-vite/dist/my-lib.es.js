function consoleColor() {
  console.log("\u8FD9\u662F\u4E00\u4E2Aconsole");
}
var style = "";
consoleColor();
let reply = "";
fetch("https://bbs-api.mihoyo.com/notification/wapi/getUserGameNotifications?category=reply&gids=2&only_focus=false&page_size=20", {
  credentials: "include"
}).then((json) => {
  return json.json();
}).then((res) => {
  reply = res.data.list;
});
console.log(`%ctamper-weback\u5DF2\u52A0\u8F7D`, `color:red;font-size:16px;background:transparent`);
let getNoticeDom = setInterval(() => {
  let root = document.querySelector("body").querySelector(".root");
  if (root) {
    clearInterval(getNoticeDom);
    let notice = document.querySelector(".header__notification--show");
    let replyDom = "";
    reply.forEach((item) => {
      replyDom += `<li><a href="/ys/article/${item.ext.post_id}"
                             className="mhy-router-link header__notification--message__link" target="_blank"><span
            className="header__notification--message__text">${item.content}</span> </a></li>`;
    });
    notice.innerHTML = replyDom;
  }
}, 1e3);
