var navContent = document.querySelector(".goods_nav_content");

  $.ajax({
    type: "get",
    url: "http://139.199.157.195:9090/api/getsitenav",
    dataType: "json",
    success: function (data) {
      console.log(data);

      var myTemplate = template("goods_nav", data);
      $(navContent).append(myTemplate);
    }
  })