'use strict';

$(function () {

  getNavData();
  getCouponData();
  appClose();
  scrollShowSerach();


  // 导航栏ajax请求-------------------------------------
  function getNavData() {
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getindexmenu',
      data: {}, //请求内容为空
      type: 'get',
      success: function (data) {
        var result = template('template', data);
        $('.goods_nav').empty().append(result);
        getMoreNav(); //调用更多按钮的方法
        modifiedHref();

      }
    })
  }

  function modifiedHref() {
    $('.nav_item:eq(4) a').attr('href', 'overseas.html');
    $('.nav_item:eq(1) a').attr('href', 'money.html');
    $('.nav_item:eq(6) a').attr('href', 'history.html');
    $('.nav_item:eq(9) a').attr('href', 'appraise_desc.html');
  }

  // 折扣推荐区域ajax请求------------------------------
  function getCouponData() {
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getmoneyctrl',
      data: {}, //请求内容为空
      type: 'get',
      success: function (data) {
        var result = template('template2', data);
        $('.discount_con ul').empty().append(result);
      }
    })
  }
  // 点击更多按钮显示下方四个图标
  function getMoreNav() {
    var flag = true;
    $('.nav_item:eq(7)').touch_click(function () {
      if (flag) {
        for (var i = 8; i < 12; i++) {
          $('.nav_item').eq(i).css('display', 'block');
        }
        flag = false;
      } else {
        for (var i = 8; i < 12; i++) {
          $('.nav_item').eq(i).css('display', '');
        }
        flag = true;
      }
    })
  }
  // 点击关闭悬浮app下载
  function appClose() {
    $('.app_close').on('click', function () {
      $('.app_link').css('display', 'none');
    })
  }

  function scrollShowSerach() {
    $(window).scroll(function () {
      var scrolltop = $('body').scrollTop();
      console.log(scrolltop);
      if (scrolltop > 300) {
        $('.header_hidden').css('display', 'block');
      } else {
        $('.header_hidden').css('display', 'none');
      }
    })
  }
})
