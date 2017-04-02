$(function () {
  var maxScrollTop = 0;
  // 用于防止数据未加载完成时重复触发请求
  var lock = true;
  $.ajax({
    type: "get",
    url: "http://139.199.157.195:9090/api/getinlanddiscount",
    success: function (data) {
      // console.log(data)
      var resule = template("listing", data)
      $("#goods .row").append(resule);
    }
  })
  $(window).scroll(function () {
    // 滚动到最大值时触发ajax请求数据(加载元素到页面顶部距离减去页面可视区的高度)
    console.log(lock)
    if (lock) {
      maxScrollTop = $(".lodding").offset().top - $(window).height();
      // console.log($(".lodding").offset().top)
      // console.log($(window).height())
      // console.log(maxScrollTop)
      var scrollTop = $(this).scrollTop()
      // 页面滚动到底部时ajax随机请求4条数据
      if (scrollTop >= maxScrollTop) {
        lock=false;
        //创建一个存储请求数据的数组
        var arr = [];
        for (i = 0; i < 4; i++) {
          arr[i] = Math.ceil(Math.random() * 19)
          $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getdiscountproduct",
            data: "productid=" + arr[i],
            success: function (data) {
              // console.log(data.result[0]);
              var resule = template("to-lodding", data.result[0])
              setTimeout(function () {
                $("#goods .row").append(resule);
                lock=true;
              }, 1000);

            }
          })
        }
        // console.log(arr)
      }
    }
  })
})