$(function () {
    //第一页比价搜索============================================
    // 需求:
    // 1.获取到所有对应子搜索栏的数据,全部隐藏
    // 2.点击一个关键字搜索,显示当前关键字搜索下面的子搜索栏,并且可以切换显示和隐藏
    // 3.点击另一个关键字搜索,上一个隐藏,显示当前子搜索栏,并且可以切换显示和隐藏

    //页面传参
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    var categoryid = getQueryString("categoryId");

    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getcategorytitle',
        success: function (data) {
            var results = template('template', data);
            $('.item-compare').append(results);

            // 注册点击事件
            $('.item-compare li').click(function () {
                //获取id
                var titleid = $(this).attr("data-titleid");
                //把这个搜索关键字传对应的这个li标签给that,所以that指当前的li标签
                var that = this;
                //获取数据的长度
                var sonLength = $(this).find(".row>div").length;

                //根据数据的长度做一个判断,看当前的li标签中是否有获取数据
                if (sonLength >= 1) {
                    // 已经存在了数据
                    var inde = $(that).index();
                    //移除除自己之外的li标签的索引
                    $(".comparePrice .container-fluid:not(:eq(" + inde + "))").removeClass("current");
                    //切换

                    $(that).find(".container-fluid").toggleClass("current");
                } else { //没有数据就加载
                    $.ajax({
                        type: 'get',
                        url: 'http://139.199.157.195:9090/api/getcategory',
                        data: {
                            titleid: titleid
                        },
                        success: function (data) {
                            var results = template('tem', data);
                            //把对应id的结果渲染到当前被点击的li标签
                            $(that).find(".row").html(results);
                            //清空所有的current类
                            $(".comparePrice .container-fluid").removeClass("current");
                            //添加类  
                            $(that).find(".container-fluid").addClass("current");
                        }
                    });
                }
            })
        }
    })

    
    //第二页商品详情=======================================
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getcategorybyid',
        data: {
            categoryid: categoryid
        },
        success: function (data) {
            // console.log(data);
            var results = template('lei', data);
            $('.lei').append(results);
        //    productName = data.result[0].category;
       }
    })
        

    // 加载第二页页面
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getproductlist',
        data: {
            categoryid: categoryid
        },
        success: function (data) {

            var results = template('shopping', data);
            $('.shopping-detail').append(results);

        }
    })



    //页码================================

    /**
     * 封装一个ajax请求的方法
     * 
     */

    function ajax() {
        $.ajax({
            type: 'get',
            url: 'http://mmb.ittun.com/api/getproductlist',
            data: {
                categoryid: categoryid
            },
            success: function (data) {
                var results = template('shopping', data);
                $('.shopping-detail').append(results);
                $('.shopping-detail').html("").append(results);

            }
        })
    }


    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getproductlist',
        data: {
            categoryid: categoryid
        },
        success: function (data) {
            //获取页码
            var pages = Math.ceil(data.totalCount / data.pagesize);

            // 动态创建标签
            var arr = [];
            for (var i = 1; i <= pages; i++) {
                var x = i + '/' + pages;
                var str = "<li><a href='#'>" + x + "</a></li>";
                arr.push(str);
            }
            // 渲染页面
            $('.dropdown-menu').html(arr.join(""));

            //点击翻页按钮
            $('.dropdown-menu li').click(function () {
                categoryid = $(this).index();
                // console.log(categoryid);
                ajax();
            })

            // 点击上一页
            $('.pageUp').click(function () {
                // 判断是否小于零
                if (categoryid <= 0) {
                    categoryid = categoryid;
                } else {
                    categoryid--;
                }
                ajax();
            })
            // 点击下一页
            $('.pageDown').click(function () {
                categoryid++;
                ajax();
            })

        }
    })


    //第三页单个商品介绍=============================================

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var productid = getQueryString("productid");
    console.log(productid);

    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getproduct',
        data: {
            productid: productid
        },
        success: function (data) {
            var results = template('xinghao', data);
            $('.xinghao').append(results);
    
        }
    })


    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getproduct',
        data: {
            productid: productid
        },
        success: function (data) {
            // console.log(data);
            var results = template('oneProduct', data);
            $('.oneProduct').append(results);


        }
    })


    //网友评价====================================
    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getproductcom',
        data: {
            productid: productid
        },
        success: function (data) {
            var results = template('productcom', data);
            $('.productcom-ul').append(results);
        }
    })


})