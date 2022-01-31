import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsstyleBG from "grapesjs-style-bg";
import gjsPreserWebpage from "grapesjs-preset-webpage";
import gjsCustomCode from "grapesjs-custom-code";
import "grapick/dist/grapick.min.css";
import { appURL, nodeExpressURL } from "../../config";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import {
  InitEditor,
  saveCurrentPage,
  pageManager,
  widgetManager,
  PageHandle,
  WidgetHandle,
  logOut,
} from "./editor/editorController";
import {
  getPages,
  getWidgets,
  DelPage,
  DelWidget,
  showModal,
  hideModal,
  dataSourceChange,
  getCuurentDataSource,
  testDSConnections,
  getPlugins,
} from "../../API";

// ********************** START PLUGINS *********************//

import fullHeader1 from "../../plugins/custom/header/full-header/full-header-1";
import fullHeader2 from "../../plugins/custom/header/full-header/full-header-2";
import fullHeaderDefault from "../../plugins/custom/header/full-header/full-header-default";

import navigation1 from "../../plugins/custom/header/build-header/navigation-1";

import mainBanners1 from "../../plugins/custom/main-banners/main-banners-1";
import mainBannersDefault from "../../plugins/custom/main-banners/main-banners-default";

import miniBannersDefault from "../../plugins/custom/mini-banners/mini-banners-default";
import miniBanners1 from "../../plugins/custom/mini-banners/mini-banners-1";
import miniBanners2 from "../../plugins/custom/mini-banners/mini-banners-2";
import miniBanners3 from "../../plugins/custom/mini-banners/mini-banners-3";
import miniBanners4 from "../../plugins/custom/mini-banners/mini-banners-4";

import miniBanners5 from "../../plugins/custom/mini-banners/mini-banners-5";

import companyIntro1 from "../../plugins/custom/content/company-intro-1";

import content1 from "../../plugins/custom/content/content-1";
import content2 from "../../plugins/custom/content/content-2";
import content3 from "../../plugins/custom/content/content-3";
import content4 from "../../plugins/custom/content/content-4";
import content5 from "../../plugins/custom/content/content-5";
import content6 from "../../plugins/custom/content/content-6";
import card1 from "../../plugins/custom/content/cards-1";

import content7 from "../../plugins/custom/content/content-7";
import companyIntroDefault from "../../plugins/custom/content/company-intro-default";
import contact1 from "../../plugins/custom/content/contact-1";

import linkButton from "../../plugins/custom/form-elements/link-button";
import checkBox from "../../plugins/custom/form-elements/check-box";
import radioButton from "../../plugins/custom/form-elements/radio-button";

import form1 from "../../plugins/custom/form-elements/form";
import input1 from "../../plugins/custom/form-elements/input";
import textArea from "../../plugins/custom/form-elements/text-area";

import button1 from "../../plugins/custom/form-elements/button";
import selectBox1 from "../../plugins/custom/form-elements/select-box";

import imageElement from "../../plugins/custom/html-elemensts/image";
import textElement from "../../plugins/custom/html-elemensts/text";
import linkElement from "../../plugins/custom/html-elemensts/Link";

import bulletlistfullwidth from "../../plugins/custom/html-elemensts/bullet-list-full-width";
import bulletlisthalfwidth from "../../plugins/custom/html-elemensts/bullet-list-half-width";
import numberListFullWidth from "../../plugins/custom/html-elemensts/number-list-full-width";
import numberListhalfwidth from "../../plugins/custom/html-elemensts/number-list-half-width";

import heading1 from "../../plugins/custom/html-elemensts/heading-1";
import heading2 from "../../plugins/custom/html-elemensts/heading-2";
import heading3 from "../../plugins/custom/html-elemensts/heading-3";
import heading4 from "../../plugins/custom/html-elemensts/heading-4";
import heading5 from "../../plugins/custom/html-elemensts/heading-5";
import heading6 from "../../plugins/custom/html-elemensts/heading-6";

import productsSlider1 from "../../plugins/custom/sliders/products-slider-1";
import productsSlider2 from "../../plugins/custom/sliders/products-slider-2";
import brandsSlider1 from "../../plugins/custom/sliders/brands-slider-1";

import fullFooter1 from "../../plugins/custom/footer/full-footer/full-footer-1";
import fullFooter2 from "../../plugins/custom/footer/full-footer/full-footer-2";
import fullFooter3 from "../../plugins/custom/footer/full-footer/full-footer-3";
import fullFooterDefault from "../../plugins/custom/footer/full-footer/full-footer-default";

import footerCategories1 from "../../plugins/custom/footer/build-footer/footer-categories-1";

import productsGrid1 from "../../plugins/custom/products-grids/prods-grid-1";
import productsGrid2 from "../../plugins/custom/products-grids/prods-grid-2";

// ********************** END PLUGINS *********************//

import { section } from "../custom/basic-elements/section";
import { colDiv } from "../custom/basic-elements/column";
import { rowDiv } from "../custom/basic-elements/row";

import { headerLogo } from "../custom/headers/header-logo";
import { headerForm } from "../custom/headers/header-form";
import { headerLinks } from "../custom/headers/header-links";
import { headerPlaceholder } from "../custom/headers/header-placeholder";
import { headerTopMessage } from "../custom/headers/header-top-message";

import { footerPlaceholder } from "../custom/footers/footer-placeholder";
import { footerCelerant } from "../custom/footers/footer-celerant";
import { footerSocial } from "../custom/footers/footer-form";
import { footerLinks } from "../custom/footers/footer-links";
import { footerLogo } from "../custom/footers/footer-logo";
import { footerPayment } from "../custom/footers/footer-payment";
import { footerCopyright } from "../custom/footers/footer-copyright";

import {
  buildHeader,
  buildFooter,
  celerantCat,
  basicElementsCat,
} from "../custom/categories";

export default function Builder() {
  const [editor, setEditor] = useState(null);
  const [currentPage, setCurrentPage] = useState("");
  const [allPages, setAllPages] = useState([]);
  const [allWidgets, setAllWidgets] = useState([]);

  const [plugins, setPlugins] = useState("");
  const [dSource, setDSource] = useState("jsonFiles");
  const [isWidget, setIsWidget] = useState("no");

  // sessionStorage.clear();
  let logins = sessionStorage.getItem("loginInfo");

  try {
    logins = JSON.parse(logins);
  } catch (err) {}
  let userRole = "dev";
  try {
    userRole = logins.data.role;
  } catch (err) {}
  let navigate = useNavigate();

  useEffect(() => {
    if (!logins || logins == null) {
      navigate("/");
    } else {
    }
  }, []);

  useEffect(() => {
    getPages()
      .then((list) => {
        setAllPages(list);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getWidgets()
      .then((list) => {
        setAllWidgets(list);
      })
      .catch((err) => console.log(err));
  }, []);

  let blockManager = "";
  let pluginsList = "";
  pluginsList = [
    gjsPreserWebpage,
    fullHeaderDefault,
    fullHeader1,
    fullHeader2,

    navigation1,

    mainBannersDefault,
    mainBanners1,

    miniBannersDefault,
    miniBanners1,
    miniBanners2,
    miniBanners3,
    miniBanners4,
    miniBanners5,

    contact1,
    companyIntroDefault,
    companyIntro1,
    card1,
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    content7,

    imageElement,
    textElement,
    linkElement,
    heading1,
    heading2,
    heading3,
    heading4,
    heading5,
    heading6,
    bulletlistfullwidth,
    bulletlisthalfwidth,
    numberListFullWidth,
    numberListhalfwidth,

    form1,
    input1,
    textArea,
    selectBox1,

    linkButton,
    checkBox,
    radioButton,
    button1,

    productsSlider1,
    productsSlider2,
    brandsSlider1,

    fullFooterDefault,
    fullFooter1,
    fullFooter2,
    fullFooter3,

    footerCategories1,
    productsGrid1,
    productsGrid2,
    navigation1,
  ];
  const alert = useAlert();

  useEffect(() => {
    const editor = InitEditor(
      grapesjs,
      currentPage,

      pluginsList,
      alert,
      isWidget
    );
    saveCurrentPage(editor, currentPage);
    pageManager(editor);
    widgetManager(editor);

    logOut(editor);

    let pageC = "";
    pageC = currentPage;
    try {
      // replace all spaces to -
      pageC = pageC.replace(/-/g, " ");
    } catch (err) {}

    if (!pageC || pageC == "") {
      pageC = "Please select a Page from page Manager";
    }
    try {
      editor.Panels.addButton("options", [
        {
          id: "page",
          className: "current-page-label",

          label:
            isWidget == "yes"
              ? "Current Widget: " + pageC
              : "Current Page: " + pageC,
          attributes: { title: "Current Page" },
        },
      ]);
    } catch (err) {}
    editor.on("load", function () {
      $(".show").click(function () {
        var target = $(this).attr("data-target");
        $("." + target).slideToggle("slow");
      });

      $(".close").click(function () {
        $(this).parent().slideToggle("slow");
      });
    });

    editor.on("storage:load", function (e) {
      try {
        //  const wrapper = editor.getWrapper();
        // const el = wrapper.find("#header-placeholder")[0];
        // console.log(el.toHTML());
      } catch (err) {}
      // console.log("Loaded ", e);
    });
    /////////////////////////END STORE ON BUTTON CLICK/////////////////////////////
    blockManager = editor.BlockManager;

    // START CUSTOM CATEGORY BLOCK

    section(blockManager, basicElementsCat);
    rowDiv(blockManager, basicElementsCat);
    colDiv(blockManager, basicElementsCat);

    headerPlaceholder(blockManager, buildHeader);
    headerLogo(blockManager, buildHeader);
    headerForm(blockManager, buildHeader);
    headerLinks(blockManager, buildHeader);
    headerTopMessage(blockManager, buildHeader);

    footerPlaceholder(blockManager, buildFooter);
    footerCelerant(blockManager, buildFooter);
    footerSocial(blockManager, buildFooter);
    footerLinks(blockManager, buildFooter);
    footerLogo(blockManager, buildFooter);
    footerPayment(blockManager, buildFooter);
    footerCopyright(blockManager, buildFooter);

    // END CUSTOM CATEGORY BLOCK

    const styleManager = editor.StyleManager;

    // START CONTROLLING DEFAULT CATEGORY BLOCKS
    const block = editor.BlockManager.getAll();
    block.map((block) => {
      if (
        block.attributes.id === "text" ||
        block.attributes.id === "image" ||
        block.attributes.id === "link" ||
        block.attributes.id === "video" ||
        block.attributes.id === "link-block" ||
        block.attributes.id === "map" ||
        block.attributes.id === "text-section" ||
        block.attributes.id === "quote"
      ) {
        block.attributes.category = {
          label: "Basic",
          order: 11,
          open: false,
        };
      }
      if (
        block.attributes.id === "h-navbar" ||
        block.attributes.id === "countdown"
      ) {
        block.attributes.category = {
          label: "Extra",
          order: 12,
          open: false,
        };
      } else if (block.attributes.id === "form") {
        block.attributes.category = {
          label: "Forms",
          order: 13,
          open: false,
        };
      } else if (block.attributes.id === "INPUTS") {
        block.attributes.category = {
          label: "test",
          order: 13,
          open: false,
        };
      }
    });
    // END CONTROLLING DEFAULT CATEGORY BLOCKS

    // START REMOVING CERTAIN BASIC BLOCKS
    const bm = editor.BlockManager;

    const blocks = bm.getAll();
    // START REMOVE FORMS BUILT IN CATEGORY BASIC
    bm.remove("text");
    bm.remove("link");
    bm.remove("image");

    bm.remove("column1");
    bm.remove("column2");
    bm.remove("column3");
    bm.remove("column3-7");

    bm.remove("form");
    bm.remove("textarea");
    bm.remove("select");
    bm.remove("radio");
    bm.remove("button");
    bm.remove("label");
    bm.remove("checkbox");
    bm.remove("input");
    // END REMOVE FORMS BUILT IN CATEGORY ELEMENTS

    // START REMOVE FORMS BUILT IN CATEGORY ELEMENTS
    bm.remove("form");
    bm.remove("textarea");
    bm.remove("select");
    bm.remove("radio");
    bm.remove("button");
    bm.remove("label");
    bm.remove("checkbox");
    bm.remove("input");
    // END REMOVE FORMS BUILT IN CATEGORY ELEMENTS

    // END REMOVING CERTAIN BASIC BLOCKS

    editor.on("storage:end:load", () => {
      showModal();
      setTimeout(() => {
        try {
          addDragHeadder();
          addCrossIcon();

          // addOpenIcon();

          dragFunction();
        } catch (error) {}
        try {
          openBlockMangerLayer();
        } catch (err) {}
        try {
          openLayerMangerLayer();
        } catch (err) {}

        try {
          openTraitMangerLayer();
        } catch (err) {}

        try {
          openStyleMangerLayer();
        } catch (err) {}

        try {
          amendBuildersLayout();
        } catch (err) {}
      }, 2000);
    });

    // START HIDE BLOCKS FOR ANY USER

    let blockAction = { action: "", categories: [] };
    if (userRole == "admin") {
      blockAction.action = "none"; // all, some, none
    } else if (userRole == "dev") {
      blockAction.action = "none"; // all, some, none
    } else if (userRole == "member") {
      blockAction.action = "some"; // all, some, none
      blockAction["categories"] = [
        "build header",
        "full header",
        "grid system",
      ]; // categories label to remove
    } else if (userRole == "client") {
      blockAction.action = "all"; // all, some, none
    }

    blocks.map((block) => {
      if (blockAction.action == "none") {
      } else if (blockAction.action == "some") {
        try {
          if (
            blockAction.categories.includes(
              block.get("category").label.toLowerCase()
            )
          ) {
            setTimeout(() => {
              bm.remove(block.get("id").toString());
            }, 0);
          }
        } catch (err) {}
      } else if (blockAction.action == "all") {
        try {
          setTimeout(() => {
            bm.remove(block.get("id").toString());
          }, 5);
        } catch (err) {}
      }
    });
    // END HIDE BLOCKS FOR ANY USER

    setEditor(editor);
    editor.on("component:toggled", (e) => {
      editor.Panels.getButton("views", "open-tm").set("active", 1);
    });

    editor.on("component:selected", (e) => {});
  }, [currentPage]);

  try {
    editor.on("storage:start", () => {
      showModal();
    });
  } catch (err) {}
  try {
    editor.on("storage:end", () => {
      setTimeout(() => {
        hideModal();
      }, 1000);
    });
  } catch (err) {}

  const selectPage = (e) => {
    e.preventDefault();

    let value = "";
    value = e.target.value;
    setCurrentPage(value);
  };
  let pageTitle = "";
  pageTitle = currentPage;

  try {
    pageTitle = pageTitle.replace(/-/g, " ");
  } catch (err) {}
  // pageTitle = pageTitle.replaceAll("-", " ");
  let ePage = "";
  useEffect(() => {
    getCuurentDataSource().then((ds) => {
      setDSource(ds);
    });
  }, []);

  /*
  useEffect(() => {
    setTimeout(() => {
      let panelOptions = document.getElementsByClassName("gjs-pn-options")[0];
      let widthRecord = panelOptions.offsetWidth + "px";
      try {
        ePage = currentPage.substring(0, 55);
      } catch (err) {}

      panelOptions.innerHTML += `<div id="p2" class="cpage">Current Page: <strong>${
        ePage && ePage.length > 0
          ? ePage
          : "Please select a Page from Page Manager"
      }</strong>
      </div>`;
      document.getElementById("p2").style.right = widthRecord;
    }, 2000);
  }, [currentPage]);

  */

  return (
    <div className="App">
      <div id="editor"></div>
      <ModalHTML />
      {ManagePages(
        editor,
        showModal,
        hideModal,
        currentPage,
        setCurrentPage,
        allPages,
        selectPage,
        setAllPages,
        setIsWidget
      )}

      {ManageWidgets(
        editor,
        showModal,
        hideModal,
        currentPage,
        setCurrentPage,
        allWidgets,
        selectPage,
        setAllWidgets,
        setIsWidget
      )}
    </div>
  );
}

const EditPage = (e, name, setCurrentPage, widgetValue, setIsWidget) => {
  setCurrentPage(name);
  setIsWidget(widgetValue);
};

const ModalHTML = () => {
  return (
    <div
      class="modal fade "
      id="builderModal"
      tabIndex="-1"
      aria-labelledby="builderModalLabel"
      aria-hidden="true"
    >
      <div id="mDialog" class="modal-dialog modal-fullscreen  ">
        <div id="mContent" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="builderModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                hideModal();
              }}
            ></button>
          </div>
          <div
            id="mBody"
            class="modal-body d-flex justify-content-center "
            style={{ top: 30 + "%" }}
          >
            <div
              class="spinner-border"
              style={{ width: 10 + "rem", height: 10 + "rem" }}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagePages = (
  editor,
  showModal,
  hideModal,
  currentPage,
  setCurrentPage,
  allPages,
  selectPage,
  setAllPages,
  setIsWidget
) => {
  return (
    <div
      class="modal fade "
      id="pagesModal"
      tabindex="-1"
      aria-labelledby="pagesModalLabel"
      aria-hidden="true"
    >
      <div
        id="pagesDialog"
        class="modal-dialog modal-fullscreen modal-dialog-centered w-50 mx-auto"
      >
        <div id="pagesContent" class="modal-content">
          <div class="modal-header py-1">
            <h5 class="modal-title py-1" id="psgesModalLabel">
              Page Manager
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-1">
            <div class="form-container d-flex justify-content-center align-items-center pt-4">
              <label for="recipient-name" class="col-form-label me-0">
                Page Name:
              </label>

              <input
                type="text"
                class="form-control w-50 ms-1 me-5"
                id="pageName"
              />
              <button
                type="button"
                class="btn bg-newbg text-dark ms-5 me-1"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearCreatePage();
                }}
              >
                Clear
              </button>
              <button
                onClick={() => {
                  PageHandle(setAllPages);
                }}
                type="button"
                class="btn bg-newbg text-dark"
              >
                Save
              </button>
            </div>
            <span id="actionMsg" className="text-success p-2"></span>
          </div>
          <section id="topNavChoose" class="border border-2">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-12 mb-sm-3">
                  <p className=" mb-0 px-2 py-1 text-center h4 text-dark shadow-md">
                    Pages List
                  </p>
                  <table class="table table-striped pages-container">
                    <thead>
                      <tr class="bg-newbg">
                        <th scope="col">#</th>
                        <th scope="col">Page Name</th>
                        <th scope="col">Page Slung</th>

                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        <th scope="col">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPages && allPages.length > 0
                        ? allPages.map((page) => {
                            let pname = "";
                            let pageSlung = "";
                            let pageOrgName = "";
                            try {
                              pname = page.page_name;
                            } catch (err) {
                              pname = page.name;
                            }
                            if (!pname || pname == "") {
                              pname = page.name;
                            }
                            pname = pname.trim();
                            pageOrgName = pname;
                            pageSlung = pageOrgName.toLocaleLowerCase();
                            try {
                              // replace all spaces to -
                              pname = pname.replace(/-/g, " ");
                            } catch (err) {}
                            let response = "";

                            return (
                              <tr>
                                <th scope="row">1</th>
                                <td>{pname}</td>
                                <td>{pageSlung}</td>

                                <td>
                                  <a
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    type="button"
                                    href="#"
                                    onClick={(e) => {
                                      EditPage(
                                        e,
                                        pname,
                                        setCurrentPage,
                                        "no",
                                        setIsWidget
                                      );
                                    }}
                                  >
                                    <i class="fa fa-edit pr-2"></i>
                                  </a>
                                </td>
                                <td>
                                  {pname.toLocaleLowerCase() == "home" ? (
                                    <span className="text-secondary disabled">
                                      <i class="fa fa-trash"></i>
                                    </span>
                                  ) : (
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        DelPage(
                                          e,
                                          pageOrgName,
                                          setAllPages
                                        ).then((data) => {
                                          response = data;
                                          document
                                            .getElementById("actionMsg")
                                            .classList.remove("d-block");
                                          try {
                                            document
                                              .getElementById("actionMsg")
                                              .classList.remove("d-none");
                                          } catch (err) {}
                                          document.getElementById(
                                            "actionMsg"
                                          ).innerHTML = response.msg;
                                          setTimeout(() => {
                                            document
                                              .getElementById("actionMsg")
                                              .classList.add("d-none");
                                          }, 2000);
                                        });
                                      }}
                                    >
                                      <i class="fa fa-trash pr-2"></i>
                                    </a>
                                  )}
                                </td>
                                <td>
                                  {pname.toLocaleLowerCase() == "home" ? (
                                    <a href={appURL} target="_blank">
                                      <i class="fa fa-eye"></i>
                                    </a>
                                  ) : (
                                    <a
                                      href={
                                        appURL +
                                        "info/index.html?info=" +
                                        pageSlung
                                      }
                                      target="_blank"
                                    >
                                      <i class="fa fa-eye pr-2"></i>
                                    </a>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ManageWidgets = (
  editor,
  showModal,
  hideModal,
  currentPage,
  setCurrentPage,
  allWidgets,
  selectPage,
  setAllWidgets,
  setIsWidget
) => {
  return (
    <div
      class="modal fade "
      id="widgetsModal"
      tabindex="-1"
      aria-labelledby="widgetsModalLabel"
      aria-hidden="true"
    >
      <div
        id="widgetsDialog"
        class="modal-dialog modal-fullscreen modal-dialog-centered w-75 mx-auto"
      >
        <div id="pagesContent" class="modal-content widgetPopUp">
          <div class="modal-header py-1">
            <h5 class="modal-title py-1" id="widgetsModalLabel">
              Widget Manager
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-1">
            <div class="form-container d-flex justify-content-center align-items-center pt-4">
              <label for="recipient-name" class="col-form-label me-0">
                Widget Name:
              </label>

              <input
                type="text"
                class="form-control w-50 ms-1 me-5"
                id="widgetName"
              />
              <button
                type="button"
                class="btn bg-newbg text-dark ms-5 me-1"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearCreatePage();
                }}
              >
                Clear
              </button>
              <button
                onClick={() => {
                  WidgetHandle(setAllWidgets);
                }}
                type="button"
                class="btn bg-newbg text-dark"
              >
                Save
              </button>
            </div>
            <span id="actionMsg2" className="text-success p-2"></span>
          </div>

          <span class="bg-light d-block p-3">
            You Can display any Widget on any page calling below hooks
            <br />
            <strong>getWidget('widget Slung')</strong>
          </span>

          <section id="topNavChoose" class="border border-2">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-12 mb-sm-3">
                  <p className=" mb-0 px-2 py-1 text-center h4 text-dark shadow-md">
                    Widgets List
                  </p>
                  <section id="widgetTiles">
                    <div class="container">
                      <div class="row">
                        {allWidgets && allWidgets.length > 0
                          ? allWidgets.map((widget, index) => {
                              let wname = "";
                              let widgetSlung = "";
                              let widgetOrgName = "";
                              try {
                                wname = widget.widget_name;
                              } catch (err) {
                                wname = widget.name;
                              }
                              if (!wname || wname == "") {
                                wname = widget.name;
                              }
                              wname = wname.trim();
                              widgetOrgName = wname;
                              widgetSlung = widgetOrgName.toLocaleLowerCase();
                              try {
                                // replace all spaces to -
                                wname = wname.replace(/-/g, " ");
                              } catch (err) {}
                              let response = "";

                              return (
                                <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                                  <div class="card">
                                    <div class="card-image">
                                      <div class="wrap"></div>
                                    </div>
                                    <div
                                      data-tooltip={wname}
                                      class="card-content bg-light text-dark"
                                    >
                                      <span
                                        data-tooltip={wname}
                                        class="card-title"
                                      >
                                        {wname}
                                      </span>
                                      <button
                                        type="button"
                                        id="show"
                                        data-target={`show${index}`}
                                        class="show btn btn-custom float-right"
                                        aria-label="Left Align"
                                      >
                                        <i class="fa fa-ellipsis-v"></i>
                                      </button>
                                    </div>
                                    <span class="p-2 d-flex widgeturl">
                                      {widgetSlung}
                                    </span>
                                    <div class={`card-reveal show${index}`}>
                                      <span class="card-title">Close</span>
                                      <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span aria-hidden="true">×</span>
                                      </button>
                                      <p>
                                        <a
                                          href="##"
                                          class="d-block"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                          type="button"
                                          href="#"
                                          onClick={(e) => {
                                            EditPage(
                                              e,
                                              wname,
                                              setCurrentPage,
                                              "yes",
                                              setIsWidget
                                            );
                                          }}
                                        >
                                          <i class="fa fa-edit"></i>Edit
                                        </a>
                                        <a
                                          href="##"
                                          class="d-block"
                                          onClick={(e) => {
                                            DelWidget(
                                              e,
                                              widgetOrgName,
                                              setAllWidgets
                                            ).then((data) => {
                                              response = data;
                                              document
                                                .getElementById("actionMsg2")
                                                .classList.remove("d-block");
                                              try {
                                                document
                                                  .getElementById("actionMsg2")
                                                  .classList.remove("d-none");
                                              } catch (err) {}
                                              document.getElementById(
                                                "actionMsg"
                                              ).innerHTML = response.msg;
                                              setTimeout(() => {
                                                document
                                                  .getElementById("actionMsg2")
                                                  .classList.add("d-none");
                                              }, 2000);
                                            });
                                          }}
                                        >
                                          <i class="fa fa-trash"></i>Delete
                                        </a>
                                        <a
                                          href="##"
                                          class="d-block"
                                          href={
                                            appURL +
                                            "widget/index.html?info=" +
                                            widgetSlung
                                          }
                                          target="_blank"
                                        >
                                          <i class="fa fa-eye"></i>View
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const hidePagesModal = () => {
  //let myModal = document.getElementById("pagesModal");
  // myModal.style.display = "none";
  // myModal.style.opacity = 0;
};

const clearCreatePage = () => {
  document.getElementById("pageName").value = "";
};

const dragFunction = () => {
  // Make the DIV element draggable:
  dragElement(document.getElementsByClassName("gjs-pn-views-container")[0]);

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById("dragH")) {
      // if present, the header is where you move the DIV from:

      document.getElementById("dragH").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      //  elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
};

const addDragHeadder = () => {
  let dragHead = document.createElement("p");
  dragHead.id = "dragH";
  dragHead.classList.add("bi");
  dragHead.classList.add("bi-grip-vertical");
  dragHead.classList.add("grabbable");
  let dummyDiv = document.getElementsByClassName("gjs-pn-views-container")[0];
  dummyDiv.prepend(dragHead);
};

const addCrossIcon = () => {
  let close = document.createElement("button");
  close.id = "closeView";
  close.classList.add("bi");
  close.classList.add("bi-x");
  close.style.cssText =
    "position: absolute; width: 20px; height: 20px; padding: 0px; border: 0px; opacity: 1; z-index: 9999999; top: 2.5px; right:0; border-top-left-radius: 5px; border-bottom-left-radius: 5px; font-size: 18px; line-height: 18px; text-align: center; background: rgb(0, 67, 127); color: rgb(255, 255, 255) !important;";
  let dummyDiv = document.getElementsByClassName("gjs-pn-views-container")[0];
  dummyDiv.prepend(close);
};
const addOpenIcon = () => {
  let openv = document.createElement("button");
  openv.id = "openView";
  openv.classList.add("bi");
  openv.classList.add("bi-chevron-double-left");
  openv.style.cssText =
    "position: absolute; width: 20px; height: 20px; padding: 0px; border: 0px solid rgb(138, 138, 138); opacity: 1; z-index: 1; top: 65px; right: 10px; border-radius: 30px 5px 5px 30px; font-size: 18px; line-height: 20px; text-align: center; background: rgb(255, 255, 255);";
  document.body.appendChild(openv);
};

const showHideBuilderSideNav = (value) => {
  const navContainer = document.getElementsByClassName(
    "gjs-pn-views-container"
  )[0];

  let isActive = document.getElementsByClassName("gjs-pn-active")[0];
  if (isActive && isActive != "") {
    showNav(navContainer);
  } else {
    hideNav(navContainer);
  }
};
const openBlockMangerLayer = () => {
  let fourBlockIcon = document.getElementsByClassName("fa-th-large")[0];
  fourBlockIcon.addEventListener(
    "click",
    () => {
      showHideBuilderSideNav("block");
    },
    false
  );
};
const hideNav = (navContainer) => {
  try {
    navContainer.style.right = "-" + "250" + "px";
    navContainer.style.left = "unset";
    navContainer.style.top = "0" + "px";
  } catch (error) {}
  try {
    document.getElementById("closeView").style.display = "none";
  } catch (error) {}
};
const showNav = (navContainer) => {
  try {
    navContainer.style.right = "0" + "px";
    navContainer.style.top = "40" + "px";
  } catch (error) {}
  try {
    document.getElementById("closeView").style.display = "block";
  } catch (error) {}
};
const openLayerMangerLayer = () => {
  let barIcon = document.getElementsByClassName("fa-bars")[0];
  barIcon.addEventListener(
    "click",
    () => {
      showHideBuilderSideNav("layer");
    },
    false
  );
};

const openTraitMangerLayer = () => {
  let cogIcon = document.getElementsByClassName("fa-cog")[0];
  cogIcon.addEventListener(
    "click",
    () => {
      showHideBuilderSideNav("traits");
    },
    false
  );
};

const openStyleMangerLayer = () => {
  let brushIcon = document.getElementsByClassName("fa-paint-brush")[0];
  brushIcon.addEventListener(
    "click",
    () => {
      showHideBuilderSideNav("style");
    },
    false
  );
};

const amendBuildersLayout = () => {
  var elem = document.createElement("img");
  elem.id += "plogo";
  elem.src += "./images/cumulus-setting-icon.png";
  elem.className += "plogo";
  elem.style.cssText =
    "position:absolute;width:50px;height:50px;padding:0px;border:0px;opacity:1;z-index:1234;top:0px;left:10px;object-fit:contain;text-align:center;";
  document.body.appendChild(elem);

  var btnn = document.getElementById("closeView");
  btnn.onclick = function () {
    var targetDivs = document.getElementsByClassName(
      "gjs-pn-views-container"
    )[0];
    if (targetDivs.style.display !== "none") {
      document.getElementById("closeView").style.display = "none";

      targetDivs.style.right = "-" + "250" + "px";
      targetDivs.style.left = "unset";
      targetDivs.style.top = "0" + "px";
    } else {
      targetDivs.style.right = "0" + "px";
    }
  };

  var btnn = document.getElementById("openView");
  btnn.onclick = function () {
    var targetDivs = document.getElementsByClassName(
      "gjs-pn-views-container"
    )[0];

    document.getElementById("closeView").style.display = "block";
    targetDivs.style.right = "0" + "px";
    targetDivs.style.top = "40" + "px";
  };
};
const changeDS = (e, dSource, setDSource) => {
  let alertMsg = document.getElementById("actionMsg2");

  e.preventDefault();
  setDSource(e.target.value);
  let ds = { source: "" };
  if (!e.target.value || e.target.value == "Choose...") {
    ds.source = "jsonFiles";
  } else {
    ds.source = e.target.value;
  }
  alertMsg.innerHTML = "";
  dataSourceChange(ds).then((response) => {
    try {
      alertMsg.classList.remove("d-none");
    } catch (err) {}
    alertMsg.innerHTML = response.msg;
    setTimeout(() => {
      alertMsg.classList.add("d-none");
      document.getElementById("data-source").value = ds.source;
    }, 2000);
  });
};

const testDataSourceConnection = (ds) => {
  let alertMsg = document.getElementById("actionMsg3");
  try {
    alertMsg.classList.remove("d-none");
  } catch (err) {}

  testDSConnections(ds).then((resp) => {
    try {
      alertMsg.classList.remove("d-none");
    } catch (err) {}
    alertMsg.innerHTML = resp;
    setTimeout(() => {
      alertMsg.classList.add("d-none");
    }, 3000);
  });
};

const refreshAfterDBSet = () => {
  window.location.reload();
};
