import {
  download_url,
  clone_url,
  clone_ssh_url,
  raw_url,
  svg,
  style,
} from "./constants";

(function () {
  "use strict";
  let vueLib = document.createElement("script");
  vueLib.src = "https://cdn.jsdelivr.net/npm/vue";
  document.head.appendChild(vueLib);
  var backColor = "#ffffff",
    fontColor = "#888888",
    menu_raw_fast = GM_getValue("xiu2_menu_raw_fast"),
    menu_menu_raw_fast_ID,
    menu_feedBack_ID;

  if (menu_raw_fast == null) {
    menu_raw_fast = 1;
    GM_setValue("xiu2_menu_raw_fast", 1);
  }
  registerMenuCommand();
  // 注册脚本菜单
  function registerMenuCommand() {
    if (menu_feedBack_ID) {
      // 如果反馈菜单ID不是 null，则删除所有脚本菜单
      GM_unregisterMenuCommand(menu_menu_raw_fast_ID);
      GM_unregisterMenuCommand(menu_feedBack_ID);
      menu_raw_fast = GM_getValue("xiu2_menu_raw_fast");
    }
    if (menu_raw_fast > raw_url.length - 1) {
      // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
      menu_raw_fast = 0;
    }
    menu_menu_raw_fast_ID = GM_registerMenuCommand(
      `${menu_num(menu_raw_fast)} [ ${
        raw_url[menu_raw_fast][1]
      } ] 加速源 (☁) - 点击切换`,
      menu_toggle_raw_fast
    );
    menu_feedBack_ID = GM_registerMenuCommand(
      "💬 反馈 & 建议 [Github]",
      function () {
        window.GM_openInTab("https://github.com/XIU2/UserScript", {
          active: true,
          insert: true,
          setParent: true,
        });
        window.GM_openInTab(
          "https://greasyfork.org/zh-CN/scripts/412245/feedback",
          { active: true, insert: true, setParent: true }
        );
      }
    );
  }

  // 切换加速源
  function menu_toggle_raw_fast() {
    if (menu_raw_fast >= raw_url.length - 1) {
      // 如果当前加速源位置大于等于加速源总数，则改为第一个加速源，反之递增下一个加速源
      menu_raw_fast = 0;
    } else {
      menu_raw_fast += 1;
    }
    GM_setValue("xiu2_menu_raw_fast", menu_raw_fast);
    delRawDownLink(); // 删除旧加速源
    addRawDownLink(); // 添加新加速源
    GM_notification({
      text: "已切换加速源为：" + raw_url[menu_raw_fast][1],
      timeout: 3000,
    }); // 提示消息
    registerMenuCommand(); // 重新注册脚本菜单
  }

  // 菜单数字图标
  function menu_num(num) {
    return ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"][
      num
    ];
  }

  colorMode();
  addRelease(); //                     Release 加速
  setTimeout(addDownloadZIP, 2000); // Download ZIP 加速
  setTimeout(addGitClone, 2000); //    Git Clone 加速
  setTimeout(addGitCloneSSH, 2000); // Git Clone SSH 加速
  addRawFile(); //                     Raw 加速
  setTimeout(addRawDownLink, 2000); // 添加 Raw 下载链接（☁），延迟 2 秒执行，避免被 pjax 刷掉

  document.addEventListener("pjax:success", function () {
    // pjax 事件发生后
    colorMode();
    addRelease(); //                     Release 加速
    setTimeout(addDownloadZIP, 2000); // Download ZIP 加速
    setTimeout(addGitClone, 2000); //    Git Clone 加速
    setTimeout(addGitCloneSSH, 2000); // Git Clone SSH 加速
    addRawFile(); //                     Raw 加速
    setTimeout(addRawDownLink, 2000); // 添加 Raw 下载链接（☁），延迟 2 秒执行，避免被 pjax 刷掉
  });

  // 在浏览器返回/前进时重新添加 Raw 下载链接（☁）事件
  // Tampermonkey v4.11 版本添加的 onurlchange 事件 grant，可以监控 pjax 等网页的 URL 变化
  if (window.onurlchange === undefined) {
    addUrlChangeEvent();
  }
  window.addEventListener("urlchange", function () {
    addRawDownLink_();
    if (location.pathname.indexOf("/releases")) {
      addRelease();
    }
  });

  // Release
  function addRelease() {
    let html = document.querySelectorAll(".Box-footer");
    if (html.length == 0) return;
    let divDisplay = "";
    if (document.documentElement.clientWidth > 1000) {
      divDisplay = "float: right;margin-top: -3px;margin-left: 8px;";
    } // 调整小屏幕时的样式
    for (const current of html) {
      if (current.querySelector(".XIU2-RS")) continue;
      current.querySelectorAll("li.Box-row > a").forEach(function (_this) {
        let href = _this.href.split(location.host),
          url = "",
          _html = `<div class="XIU2-RS" style="${divDisplay}">`;

        for (let i = 0; i < download_url.length; i++) {
          if (
            download_url[i][3] !== undefined &&
            url.indexOf("/archive/") !== -1
          ) {
            url = download_url[i][3] + href[1];
          } else {
            url = download_url[i][0] + href[1];
          }
          if (location.host === "hub.fastgit.xyz")
            url = url.replace("hub.fastgit.xyz", "github.com");
          _html += `<a style="${style[0]}" class="btn" href="${url}" title="${download_url[i][2]}" rel="noreferrer noopener nofollow">${download_url[i][1]}</a>`;
        }
        _this.insertAdjacentHTML("afterend", _html + "</div>");
      });
    }
  }

  // Download ZIP
  function addDownloadZIP() {
    if (document.querySelector(".XIU2-DZ")) return;
    let html = document.querySelector(
      ".dropdown-menu.dropdown-menu-sw.p-0 ul li:last-child"
    );
    if (!html) return;
    let href = html.getElementsByTagName("a")[0].href,
      url = "",
      _html = "";

    for (let i = 0; i < download_url.length; i++) {
      if (download_url[i][3] === "") continue;
      if (download_url[i][3] !== undefined) {
        url = download_url[i][3] + href.split(location.host)[1];
      } else {
        url = download_url[i][0] + href.split(location.host)[1];
      }
      if (location.host === "hub.fastgit.xyz")
        url = url.replace("hub.fastgit.xyz", "github.com");
      _html += `<li class="Box-row Box-row--hover-gray p-3 mt-0 XIU2-DZ"><a class="d-flex flex-items-center color-fg-default text-bold no-underline" rel="noreferrer noopener nofollow" href="${url}" title="${download_url[i][2]}">${svg[0]}Download ZIP ${download_url[i][1]}</a></li>`;
    }
    html.insertAdjacentHTML("afterend", _html);
  }

  // Git Clone
  function addGitClone() {
    if (document.querySelector(".XIU2-GC")) return;
    let html = document.querySelector(
      '[role="tabpanel"]:nth-child(2) div.input-group'
    );
    if (!html) return;
    let href_split = html
        .getElementsByTagName("input")[0]
        .getAttribute("value")
        .split(location.host),
      url = "",
      _html = "";

    for (let i = 0; i < clone_url.length; i++) {
      if (clone_url[i][0] === "https://gitclone.com") {
        url = clone_url[i][0] + "/github.com" + href_split[1];
      } else {
        url = clone_url[i][0] + href_split[1];
      }
      _html += `<div class="input-group XIU2-GC" style="margin-top: 4px;" title="加速源：${clone_url[i][1]} （点击可直接复制）"><input value="${url}" aria-label="${url}" title="${clone_url[i][2]}" type="text" class="form-control input-monospace input-sm color-bg-subtle" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url}" aria-label="Copy to clipboard" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton" tabindex="0" role="button">${svg[1]}</clipboard-copy></div></div>`;
    }
    html.insertAdjacentHTML("afterend", _html);
  }

  // Git Clone SSH
  function addGitCloneSSH() {
    if (document.querySelector(".XIU2-GCS")) return;
    let html = document.querySelector(
      '[role="tabpanel"]:nth-child(3) div.input-group'
    );
    if (!html) return;
    let href_split = html
        .getElementsByTagName("input")[0]
        .getAttribute("value")
        .split(":"),
      _html = "";

    if (href_split[0] != "git@github.com") return;

    for (let i = 0; i < clone_ssh_url.length; i++) {
      _html += `<div class="input-group XIU2-GCS" style="margin-top: 4px;" title="加速源：${
        clone_ssh_url[i][1]
      } （点击可直接复制）"><input value="${
        clone_ssh_url[i][0] + ":" + href_split[1]
      }" aria-label="${clone_ssh_url[i][0] + ":" + href_split[1]}" title="${
        clone_ssh_url[i][2]
      }" type="text" class="form-control input-monospace input-sm color-bg-subtle" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${
        clone_ssh_url[i][0] + ":" + href_split[1]
      }" aria-label="Copy to clipboard" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton" tabindex="0" role="button">${
        svg[1]
      }</clipboard-copy></div></div>`;
    }
    html.insertAdjacentHTML("afterend", _html);
  }

  // Raw
  function addRawFile() {
    if (document.querySelector(".XIU2-RF")) return;
    let html = document.getElementById("raw-url");
    if (!html) return;
    let href = location.href.replace(`https://${location.host}`, ""),
      href2 = href.replace("/blob/", "/"),
      url = "",
      _html = "";

    for (let i = 1; i < raw_url.length; i++) {
      if (raw_url[i][0].indexOf("jsdelivr.net") != -1) {
        url = raw_url[i][0] + href.replace("/blob/", "@");
      } else if (raw_url[i][0].indexOf("fsofso.com") != -1) {
        url = raw_url[i][0] + href;
      } else {
        url = raw_url[i][0] + href2;
      }
      _html += `<a href="${url}" title="${
        raw_url[i][2]
      }" target="_blank" role="button" rel="noreferrer noopener nofollow" class="btn-sm btn BtnGroup-item XIU2-RF">${raw_url[
        i
      ][1].replace(/ \d/, "")}</a>`;
    }
    html.insertAdjacentHTML("afterend", _html);
  }

  // 添加 Raw 下载链接（☁）
  function addRawDownLink() {
    // 如果不是项目文件页面，就返回，如果网页有 Raw 下载链接（☁）就返回
    let files = document.querySelectorAll(
      "div.Box-row svg.octicon.octicon-file"
    );
    if (files.length === 0) return;
    if (location.pathname.indexOf("/tags") > -1) return;
    let files1 = document.querySelectorAll("a.fileDownLink");
    if (files1.length > 0) return;

    // 鼠标指向则显示
    var mouseOverHandler = function (evt) {
      let elem = evt.currentTarget,
        aElm_new = elem.querySelectorAll(".fileDownLink"),
        aElm_now = elem.querySelectorAll("svg.octicon.octicon-file");
      aElm_new.forEach((el) => {
        el.style.cssText = "display: inline";
      });
      aElm_now.forEach((el) => {
        el.style.cssText = "display: none";
      });
    };

    // 鼠标离开则隐藏
    var mouseOutHandler = function (evt) {
      let elem = evt.currentTarget,
        aElm_new = elem.querySelectorAll(".fileDownLink"),
        aElm_now = elem.querySelectorAll("svg.octicon.octicon-file");
      aElm_new.forEach((el) => {
        el.style.cssText = "display: none";
      });
      aElm_now.forEach((el) => {
        el.style.cssText = "display: inline";
      });
    };

    // 循环添加
    files.forEach(function (fileElm, i) {
      let trElm = fileElm.parentNode.parentNode,
        cntElm_a = trElm.querySelector(
          '[role="rowheader"] > .css-truncate.css-truncate-target.d-block.width-fit > a'
        ),
        cntElm_svg = trElm.querySelector(
          ".mr-3.flex-shrink-0 svg.octicon.octicon-file"
        ),
        Name = cntElm_a.innerText,
        href = cntElm_a.getAttribute("href"),
        href2 = href.replace("/blob/", "/"),
        url,
        url_name,
        url_tip = "";

      if (raw_url[menu_raw_fast][0].indexOf("jsdelivr.net") != -1) {
        url = raw_url[menu_raw_fast][0] + href.replace("/blob/", "@");
      } else if (raw_url[menu_raw_fast][0].indexOf("fsofso.com") != -1) {
        url = raw_url[menu_raw_fast][0] + href;
      } else {
        url = raw_url[menu_raw_fast][0] + href2;
      }

      url_name = raw_url[menu_raw_fast][1];
      url_tip = raw_url[menu_raw_fast][2];
      cntElm_svg.insertAdjacentHTML(
        "afterend",
        `<a href="${url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" style="display: none;" title="「${url_name}」&#10;&#10;[Alt + 左键] 或 [右键 - 另存为...] 下载文件。&#10;注意：鼠标点击 [☁] 图标，而不是左侧的文件名！&#10;&#10;${url_tip}提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ ${raw_url[menu_raw_fast][1]} ] 加速源 (☁) 即可切换。">${svg[2]}</a>`
      );
      // 绑定鼠标事件
      trElm.onmouseover = mouseOverHandler;
      trElm.onmouseout = mouseOutHandler;
    });
  }

  // 删除 Raw 快捷下载（☁）
  function delRawDownLink() {
    let aElm = document.querySelectorAll(".fileDownLink");
    if (aElm.length === 0) return;
    aElm.forEach(function (fileElm) {
      fileElm.remove();
    });
  }

  // 在浏览器返回/前进时重新添加 Raw 下载链接（☁）鼠标事件
  function addRawDownLink_() {
    // 如果不是项目文件页面，就返回，如果网页没有 Raw 下载链接（☁）就返回
    let files = document.querySelectorAll(
      "div.Box-row svg.octicon.octicon-file"
    );
    if (files.length === 0) return;
    let files1 = document.querySelectorAll("a.fileDownLink");
    if (files1.length === 0) return;

    // 鼠标指向则显示
    var mouseOverHandler = function (evt) {
      let elem = evt.currentTarget,
        aElm_new = elem.querySelectorAll(".fileDownLink"),
        aElm_now = elem.querySelectorAll("svg.octicon.octicon-file");
      aElm_new.forEach((el) => {
        el.style.cssText = "display: inline";
      });
      aElm_now.forEach((el) => {
        el.style.cssText = "display: none";
      });
    };

    // 鼠标离开则隐藏
    var mouseOutHandler = function (evt) {
      let elem = evt.currentTarget,
        aElm_new = elem.querySelectorAll(".fileDownLink"),
        aElm_now = elem.querySelectorAll("svg.octicon.octicon-file");
      aElm_new.forEach((el) => {
        el.style.cssText = "display: none";
      });
      aElm_now.forEach((el) => {
        el.style.cssText = "display: inline";
      });
    };

    // 循环添加
    files.forEach(function (fileElm, i) {
      let trElm = fileElm.parentNode.parentNode;
      // 绑定鼠标事件
      trElm.onmouseover = mouseOverHandler;
      trElm.onmouseout = mouseOutHandler;
    });
  }

  // 适配白天/夜间主题模式
  function colorMode() {
    let style_Add;
    if (document.getElementById("XIU2-Github")) {
      style_Add = document.getElementById("XIU2-Github");
    } else {
      style_Add = document.createElement("style");
      style_Add.id = "XIU2-Github";
      style_Add.type = "text/css";
    }
    backColor = "#ffffff";
    fontColor = "#888888";

    if (
      document
        .getElementsByTagName("html")[0]
        .getAttribute("data-color-mode") === "dark"
    ) {
      // 如果是夜间模式
      if (
        document
          .getElementsByTagName("html")[0]
          .getAttribute("data-dark-theme") === "dark_dimmed"
      ) {
        backColor = "#272e37";
        fontColor = "#768390";
      } else {
        backColor = "#161a21";
        fontColor = "#97a0aa";
      }
    } else if (
      document
        .getElementsByTagName("html")[0]
        .getAttribute("data-color-mode") === "auto"
    ) {
      // 如果是自动模式
      if (
        window.matchMedia("(prefers-color-scheme: dark)").matches ||
        document
          .getElementsByTagName("html")[0]
          .getAttribute("data-light-theme")
          .indexOf("dark") > -1
      ) {
        // 如果浏览器是夜间模式 或 白天模式是 dark 的情况
        if (
          document
            .getElementsByTagName("html")[0]
            .getAttribute("data-dark-theme") === "dark_dimmed"
        ) {
          backColor = "#272e37";
          fontColor = "#768390";
        } else if (
          document
            .getElementsByTagName("html")[0]
            .getAttribute("data-dark-theme")
            .indexOf("light") == -1
        ) {
          // 排除夜间模式是 light 的情况
          backColor = "#161a21";
          fontColor = "#97a0aa";
        }
      }
    }

    document.lastElementChild.appendChild(
      style_Add
    ).textContent = `.XIU2-RS a {--XIU2-back-Color: ${backColor}; --XIU2-font-Color: ${fontColor};}`;
  }
})();
