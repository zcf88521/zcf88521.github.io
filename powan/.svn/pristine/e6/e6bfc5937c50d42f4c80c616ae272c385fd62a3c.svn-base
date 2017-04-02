$(function () {

  getCouponNav();






  function getCouponNav() {
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getcoupon',
      type: 'get',
      success: function (data) {
        var result = template('coupons', data);
        $('.coupon_model').empty().append(result);
      }
    })
  }






})
