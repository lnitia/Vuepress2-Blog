import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    //"",
    {
      text: "前端",
      icon: "folder",
      prefix: "frontend/",
      link: "frontend/",
      children: "structure"
    },
    {
      text: "基础",
      icon: "folder",
      prefix: "basics/",
      link: "basics/",
      children: "structure",
    },
    {
      text: "其他",
      icon: "folder",
      prefix: "others/",
      link: "others/",
      children: "structure",
    },
    //"intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
