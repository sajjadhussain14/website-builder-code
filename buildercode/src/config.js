let origin = window.location.origin;
let path = window.location.pathname;
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

export let appURL = origin + path;

if (appURL.startsWith("http://localhost:5500")) {
  appURL = "http://localhost/newsite/";
} else {
}

export let currentURL = origin + path;

console.log("origin is");

console.log(origin);

let baseURL = window.location.origin;
//let baseURL = "http://localhost";

try {
  baseURL.replace(/\/$/, "");
} catch (err) {}

export let nodeExpressURL =
  "http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server";
if (
  baseURL.startsWith(
    "http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com"
  )
) {
  nodeExpressURL =
    "http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server";
} else {
  nodeExpressURL = "http://localhost:9000";
}

console.log("currentURL is : ", currentURL);

if (
  currentURL.startsWith("http://localhost") ||
  currentURL.startsWith("http://192.168.1.143:666")
) {
  nodeExpressURL = "http://localhost:9000";
} else {
  nodeExpressURL = currentURL + "server";
}

console.log("nodeExpressURL", nodeExpressURL);
