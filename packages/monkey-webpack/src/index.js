import "./style.scss";
import svg from "./yunjin.jpg";
import str from "./index.html";
let selectHtml = `${str}
    `;
let svgImg = document.createElement("img");
svgImg.src = svg;

document.documentElement.insertAdjacentHTML("beforeend", selectHtml); // 插入元素
document.body.appendChild(svgImg); // 插入元素
// document.documentElement.style.overflow = document.body.style.overflow = 'hidden';

GM_setValue("key", "value");

document.getElementById("aaa").addEventListener("click", function (ev) {
  console.log(ev.target);
});
