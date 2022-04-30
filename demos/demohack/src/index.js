import "./style.scss";
import str from "./index.html";
import svg from "./yunjin.jpg";
let selectHtml = `${str}
    `;
document.documentElement.insertAdjacentHTML("beforeend", selectHtml); // 插入元素
// document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
GM_setValue("key", "value");
let svgImg = document.createElement("img");
svgImg.src = svg;
document.body.appendChild(svgImg);
document.getElementById("aaa").addEventListener("click", function (ev) {
  console.log(ev.target);
});
