import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "前端",
    icon: "folder",
    prefix: "/frontend/",
    children: [
      { text: "html", icon: "html5", link: "html" },
      { text: "css", icon: "css3", link: "css" },
      { text: "js", icon: "javascript", link: "js" },
      { text: "vue", icon: "vuejs", link: "vue" },
      { text: "react", icon: "react", link: "react" },
      { text: "others", icon: "folder", link: "others" },
    ],
  },
  {
    text: "基础",
    icon: "folder",
    prefix: "/basics/",
    children: [
      { text: "数据结构", icon: "data", link: "data structure" },
      { text: "计算机网络", icon: "network", link: "computer network" },
    ],
  },
  {
    text: "其他",
    icon: "folder",
    prefix: "/others/",
    children: [
      { text: "混合现实", icon: "hololens", link: "mixedreality" },
      { text: "unity", icon: "unity", link: "unity" },
      { text: "后端", icon: "houduan", link: "backend" },
    ],
  },
  {
    text: "项目",
    icon: "book",
    // link: "http://xlinwork.online/",
    link: "/projects/",
  },
]);
