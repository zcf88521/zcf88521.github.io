$(function () {
  // 定义一个存储当前页索引的变量
  var index = 0;

  // ajax请求获取商品列表数据,并为分页栏注册对应事件
  overSeas_ajax("", function (data) {
    // console.log(data)
    // 引用模版引擎插件将商品第一页的商品渲染到页面
    var resule = template("overseas", data)
    $("#goods ul").append(resule);
    // 获取分页栏的最大页数,于生成对应的页栏
    var maxpage = Math.ceil(data.totalCount / data.pagesize);
    var option = "";
    for (var i = 0; i < maxpage; i++) {
      option += "<option value=" + (i + 1) + ">" + (i + 1) + "/" + maxpage + "</option>"
    }

    // 为每个页栏注册change事件,点击对应的页栏获取后台对应页的数据,并覆盖当前也信息
    $("#selectPage").html(option).change(function (even) {
      console.log(even)
      index = even.delegateTarget.value - 1;
      overSeas_ajax("pageid=" + even.delegateTarget.value, function (data) {
        var resule = template("overseas", data)
        $("#goods ul").html(resule);
      })
    })
  })



  // 为上一页注册触摸点击更新页面事件
  $("#paging .up button").touch_click(function () {
    if (index <= 0) {
      alert("已是第一页了");
      return;
    }
    index = index - 1;
    // console.log(index)
    // 更新分页栏显示的option
    $("#selectPage option").eq(index).attr("selected", "selected").siblings().removeAttr("selected")
    // 请求ajax,更新页面
    overSeas_ajax("pageid=" + (index + 1), function (data) {
      var resule = template("overseas", data)
      $("#goods ul").html(resule);
    })
  })


  // 为下一页注册触摸点击更新页面事件
  $("#paging .down button").touch_click(function () {
    if (index >= 14) {
      alert("最后一页了");
      return;
    }
    index = index + 1;
    // console.log(index)
    // 更新分页栏显示的option
    $("#selectPage option").eq(index).attr("selected", "selected").siblings().removeAttr("selected")
    // 请求ajax,更新页面
    overSeas_ajax("pageid=" + (index + 1), function (data) {
      var resule = template("overseas", data)
      $("#goods ul").html(resule);
    })
  })

  

  function overSeas_ajax(Data, fn) {
    $.ajax({
      type: "get",
      url: "http://139.199.157.195:9090/api/getmoneyctrl",
      data: Data,
      success: fn
    })
  }
})