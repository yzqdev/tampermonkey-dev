import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
console.log(`%c这是红色的`, `color:red;font-size:16px;background:transparent`);
const appRoot = document.createElement("div");
appRoot.id = "B9UWiVUJpQu6rEAZjIQtLTGrTLsPpo";
document.body.appendChild(appRoot);

app.mount(`#${appRoot.id}`);
