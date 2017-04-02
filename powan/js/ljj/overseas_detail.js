$(function() {
    // 获取url中传过来的ID值
    var titleId = getQueryString('productid');
    console.log(titleId)
    // 发送ajax
    $.ajax({
      type:"get",
      data:"productid="+titleId,
      url:"http://mmb.ittun.com/api/getmoneyctrlproduct",
      success:function(even){
        console.log(even.result[0])
        // 商品介绍模版
        var result=template("detail",even.result[0]);
        // 评论模版
        $("#explain .container ").prepend(result)
        $("title").text(even.result[0].productName)
        $("#directory a:last").text(even.result[0].productName)
      }
    })
  })

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }