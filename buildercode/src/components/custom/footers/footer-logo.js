export const footerLogo = (blockManager, footerCat) => {
  let compData = {};
  compData = {
    id: "footerLogo",
    label: `
    
   <i class="bi bi-image fs-4  p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Footer Logo"></i>     

    <div class="gjs-block-label">Footer Logo
    </div>
     
    `,
    category: footerCat,
    content: `
    <div class="col-lg-3 col-md-3 col-sm-12 logo mb-lg-0 mb-md-0 mb-sm-3">
    <a href="/"><img alt="" src="http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server/uploads/static/built-footer-logo1.png" class="img-fluid w-100 "></a>
  </div>
      `,
  };
  blockManager.add("footerLogo", compData);
};
