$(function () {
  $('.text_box').on('blur', function () {
    if ($(this).text() == '') {
      $(this).text('请通过购物App中使用分享或浏览器打开商品页面获取商品链接');
      this.style.color = '#c9c9c9';
    }
  });
  $('.text_box').on('focus', function () {
    this.style.color = '#A9A9A9';
  });
  $('.text_box').on('click', function () {
    if ($(this).text() == '请通过购物App中使用分享或浏览器打开商品页面获取商品链接') {
      $(this).text('');
      console.log($(this).text());
      this.style.color = '#000';
    }
  })
  $('.text_box').on('keydown', function () {
    if ($(this).text() == '请通过购物App中使用分享或浏览器打开商品页面获取商品链接') {
      $(this).text('');
      this.style.color = '#000';
    }
  })
})
