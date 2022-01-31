export const footerPayment = (blockManager, footerCat) => {
  let compData = {};
  compData = {
    id: "payment",
    label: `
    
<i class="bi bi-credit-card-2-front fs-4 p-2" title="Footer Payment"></i>
    <div class="gjs-block-label">Footer Payment
    </div>
     
    `,
    category: footerCat,
    content: `
<div class="col-lg-4 col-md-4 col-sm-12 col-12 mt-2 text-center">
    <a href="##"><img src="http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server/uploads/static/footer-default-payment-1.png" alt="American Express" class="img-fluid"></a>
    <a href="##"><img src="http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server/uploads/static/footer-default-payment-2.png" alt="Discover" class="img-fluid"></a>
    <a href="##"><img src="http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server/uploads/static/footer-default-payment-3.png" alt="Master Card" class="img-fluid"></a>
    <a href="##"><img src="http://celerantcms-com.server-icumulusdataserver9-vps.vps.ezhostingserver.com/testsite/server/uploads/static/footer-default-payment-4.png" alt="VISA" class="img-fluid"></a>
</div>      `,
  };
  blockManager.add("footerPayment", compData);
};
