const getsiteURLs = () => {
  let siteUrls = {};

  let origin = window.location.origin;
  let path = window.location.pathname;
  let nodeExpressURL = "";
  try {
    // path = path.replaceAll("/builder/", "");

    path = path.split("/builder/").join("");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    path = path.split("/builder").join("");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    path = path.split("/home/").join("");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    path = path.split("home/").join("");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    path = path.split("/home").join("");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    path = path.split("home").join("");
  } catch (err) {}

  try {
    if (path.endsWith("/")) {
    } else {
      path = path + "/";
    }
  } catch (err) {}

  let appURL = origin + path;

  let currentURL = origin + path;

  console.log("origin is");

  console.log(origin);

  let baseURL = window.location.origin;
  //let baseURL = "http://localhost";

  try {
    baseURL.replace(/\/$/, "");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    currentURL = currentURL.split("widget/index.html/").join("");
  } catch (err) {}

  try {
    //path = path.replaceAll("/builder", "");
    currentURL = currentURL.split("info/index.html/").join("");
  } catch (err) {}

  console.log("currentURL is : ", currentURL);

  if (currentURL.startsWith("http://localhost")) {
    nodeExpressURL = "http://localhost:9000";
  } else {
    nodeExpressURL = currentURL + "server";
  }

  console.log("nodeExpressURL", nodeExpressURL);

  siteUrls.nodeExpressURL = nodeExpressURL;

  return siteUrls;
};

let siteUrls = getsiteURLs();

console.log("test node url");
console.log(siteUrls.nodeExpressURL);
const nodeExpressURL = siteUrls.nodeExpressURL;
const getpage = async function (page, isWidget) {
  let pageContent = {};

  try {
    const response = await axios(
      nodeExpressURL + `/api/content/load?page=${page}&&isWidget=${isWidget}`
    );
    pageContent = response.data;

    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {}

  return pageContent;
};

const getHeaderFooterCss = async function (page, isWidget) {
  let pageContent = {};

  try {
    const response = await axios(
      nodeExpressURL + `/api/content/load?page=${page}&&isWidget=${isWidget}`
    );
    pageContent = response.data;

    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {}
  let pagecss = pageContent["mycustom-css"];

  try {
    let styles = pagecss.toString();

    var css = document.createElement("style");
    css.type = "text/css";

    css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
  } catch (err) {}
};

const appendCss = async function (page, isWidget) {
  let pageContent = {};

  try {
    const response = await axios(
      nodeExpressURL + `/api/content/load?page=${page}&&isWidget=${isWidget}`
    );
    pageContent = response.data;

    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {}

  let pagecss = pageContent["mycustom-css"];
  let styles = "";
  try {
    styles = pagecss.toString();
  } catch (err) {}
  var css = document.createElement("style");
  css.type = "text/css";

  css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
};

var GetPage = async function (page, isWidget, pageContainer) {
  let pageContent = {};
  if (!pageContainer) pageContainer = "root";
  try {
    const response = await axios(
      nodeExpressURL + `/api/content/load?page=${page}&&isWidget=${isWidget}`
    );
    pageContent = response.data;
    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {}
  let pageHTML = pageContent["mycustom-html"];
  if (!pageHTML) pageHTML = "";

  document.getElementById(pageContainer).innerHTML = pageHTML;
};

var GetWidget = async function (page, isWidget, widgetArea) {
  let pageContent = {};
  if (!widgetArea) widgetArea = "root";
  try {
    const response = await axios(
      nodeExpressURL + `/api/content/load?page=${page}&&isWidget=${isWidget}`
    );
    pageContent = response.data;
    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {}
  let pageHTML = pageContent["mycustom-html"];
  if (!pageHTML) pageHTML = "";

  document.getElementById(widgetArea).innerHTML = pageHTML;
};

const GetHeader = () => {
  getpage("home", "no").then((content) => {
    let pageHTMLString = content["mycustom-html"];
    var pageHtml = new DOMParser().parseFromString(pageHTMLString, "text/html");
    let headerHTML = pageHtml.getElementsByTagName("header")[0];
    if (!headerHTML) headerHTML = "";
    document.getElementById("header").append(headerHTML);
  });
};

const GetFooter = () => {
  getpage("home", "no").then((content) => {
    let pageHTMLString = content["mycustom-html"];
    var pageHtml = new DOMParser().parseFromString(pageHTMLString, "text/html");
    let footerHTML = pageHtml.getElementsByTagName("footer")[0];
    if (!footerHTML) footerHTML = "";
    document.getElementById("footer").append(footerHTML);
  });
};

var GetCss = async function (page, iswidget) {
  let pageContent = {};

  try {
    const response = await axios(
      nodeExpressURL + `/api/content/load?page=${page}&&isWidget=${iswidget}`
    );
    pageContent = response.data;

    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {}

  let pagecss = pageContent["mycustom-css"];

  let styles = "";
  try {
    styles = pagecss.toString();
  } catch (err) {}

  var css = document.createElement("style");
  css.type = "text/css";

  css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
};

const updateCss = async (file, css) => {
  let actionResponse = "";
  let payload = css;
  payload = payload.toString();

  try {
    const config = { headers: { "Content-Type": "text/plain" } };

    const response = await axios.post(
      nodeExpressURL + `/api/content/saveCss?file=${file}`,
      payload,
      config
    );
    actionResponse = response.data;

    if (!actionResponse || actionResponse == "") actionResponse = "";
  } catch (err) {}
};

const getDepts = async (limit) => {
  let depts = [];

  try {
    const response = await axios(
      nodeExpressURL + `/api/taxonomy/getDepts?limit=${limit}`
    );
    depts = response.data;
    if (!depts || depts == "") depts = [];
  } catch (err) {}

  return depts;
};

const getTyps = async (dept) => {
  let typs = [];

  try {
    const response = await axios(
      nodeExpressURL + `/api/taxonomy/getTyps?dept=${dept}`
    );
    typs = response.data;

    if (!typs || typs == "") typs = [];
  } catch (err) {}

  return typs;
};

const getSubTyp1 = async (dept, typ) => {
  let subTyp1 = [];

  try {
    const response = await axios(
      nodeExpressURL + `/api/taxonomy/getSubTyp1?dept=${dept}&typ=${typ}`
    );

    subTyp1 = response.data;

    if (!subTyp1 || subTyp1 == "") subTyp1 = [];
  } catch (err) {}

  return subTyp1;
};

const getHomePageProducts = async (attr, limit) => {
  let products = [];

  try {
    const response = await axios(
      nodeExpressURL +
        `/api/products/getHomePageprods?attr=${attr}&&limit=${limit}`
    );
    products = response.data;

    if (!products || products == "") products = [];
  } catch (err) {}
  return products;
};

var displayWidget = async function (widgetName, widgetArea) {
  try {
    GetCss(widgetName, "yes").then(() => {
      setTimeout(() => {
        GetWidget(widgetName, "yes", widgetArea);
      }, 0);
    });
  } catch (err) {
    setTimeout(() => {
      document.getElementById(widgetArea).innerHTML = "";
    }, 1000);
  }

  setTimeout(() => {
    bindFrontend("home", "no");
  }, 2000);
};

var displayHomePage = async function (pageContainer) {
  try {
    appendCss("home", "no").then(() => {
      setTimeout(() => {
        GetPage("home", "no", pageContainer);
        bindFrontend("home", "no");
      }, 0);
    });
  } catch (err) {
    setTimeout(() => {
      document.getElementById(pageContainer).innerHTML = "";
    }, 1000);
  }
};

var displayPage = async function (pageName, pageContainer) {
  getHeaderFooterCss("home", "no").then(() => {
    try {
      setTimeout(() => {
        GetHeader();
      }, 0);
    } catch (err) {}

    try {
      GetCss(pageName, "no").then(() => {
        setTimeout(() => {
          GetPage(pageName, "no", pageContainer);
        }, 0);
      });
    } catch (err) {}

    try {
      setTimeout(() => {
        GetFooter();
      }, 0);
    } catch (err) {}
  });

  try {
    setTimeout(() => {
      bindFrontend("home", "no");
    }, 2000);
  } catch (err) {}
};
