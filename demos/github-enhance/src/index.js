import globalStyle from "bundle-text:./style.scss";
import head from "bundle-text:./head.txt";
import str from "bundle-text:./index.html";

import "./github";
import "./utils";
let gStyle = document.createElement("style");

gStyle.innerHTML = globalStyle;
//

document.head.appendChild(gStyle);
document.body.insertAdjacentHTML("beforebegin", str);
const app = Vue.createApp({
  data() {
    return {
      msg: "hhhhh",
      lists: [{ conuntry: "mei" }],
      selectedCoutry: "mei",
    };
  },
  methods: {
    showMsg() {
      alert("hhh");
    },
  },
});
app.mount("#app");
