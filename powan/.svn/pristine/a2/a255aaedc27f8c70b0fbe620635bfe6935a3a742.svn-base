$(function () {

  var couponid = getQueryString('couponid');
  var couponTitle = getQueryString('couponTitle');
  console.log(couponid);
  console.log(couponTitle);
  getCouponData();
  setTitle();
  getCarouselData();

  function getCouponData() {
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getcouponproduct',
      data: {
        couponid: couponid
      },
      type: 'get',
      success: function (data) {
        var result = template('coupon_det', data);
        $('.kfc_contant ul').empty().append(result);
        showCarousel();
      }
    })
  }

  function getCarouselData() {
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getcouponproduct',
      data: {
        couponid: couponid
      },
      type: 'get',
      success: function (data) {
        var result = template('carousel', data);
        $('.carousel-inner').append(result);
      }
    })
  }


  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    // if (r != null) return unescape(r[2]);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  function setTitle() {
    $('.kfc_hearder h1').text(couponTitle + '优惠券');
  }

  function showCarousel() {
    $('.media-left').touch_click(function () {
      $('.hidden_carousel').css('display', 'block');
      $('.hidden_box').css('display', 'block');
    })
    $('.hidden_box').touch_click(function () {
      $('.hidden_carousel').css('display', 'none');
      $('.hidden_box').css('display', 'none');
    })
  }
})
