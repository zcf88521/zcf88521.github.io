$(function () {
    // 获取产品的标题
    //默认获取首页的产品列表
    var titleid = 0;
    var ulWidth = 0;
    getNav();

    // 导航栏ajax请求
    function getNav() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiatitle',
            type: 'get',
            success: function (data) {
                console.log(data);
                // 调用模板引擎
                var result = template('template', data);
                $('.cabbage_nav_all ul').append(result);
                $('.cabbage_nav li').eq(0).addClass('bt');
                // 调用iscroll插件让产品标题可以左右滚动
                var iscroll = new IScroll('#moveUl', {
                    scrollX: true,

                    preventDefault: false,
                });
                // 单击标签让其滚动
            }
        })
    }
    //获取产品列表详情
    getProduct(); //打开页面默认调用一次产品列表

    // 商品页ajax请求
    function getProduct() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
            data: {
                titleid: titleid
            },
            type: 'get',
            success: function (data) {
                console.log(data);
                // 调用模板引擎
                var result = template('content', data);
                $('.cabbage_content ul').html(result);
            }
        })
    }

    // 点击标题更改商品列表
    clickA();
    function clickA() {
        $('.cabbage_nav').on("click", "a", function () {
            //a是动态生成的，需要事件委托才能注册点击事件
            console.log($(this).data("index"));
            titleid = $(this).data("index"); //点击标题获取id            
            $(this).parent().addClass('bt');
            $(this).parent().siblings().removeClass('bt');
            // console.log(titleid);            
            getProduct();
        })
    }

    // 页面滚动到一定距离时显示与隐藏回到顶部图标
    $(window).scroll(function () {
        //定义滚动到最大高度  显示与隐藏回到顶部图标
        var maxHight = 300;
        var A = $(window).scrollTop();
        if (A > maxHight) {
            $(".cabbage_backtop").css("display", "block");
            return;
        }
        if (A <= maxHight && A > 0) {
            $(".cabbage_backtop").css("display", "none");
        }
    });

    // 导航右边的关闭按钮 放大镜跟关闭图标的切换显示
    $(".cabbage_nav .show").click(function () {
        var sw = $(this).hasClass("sw");
        if (sw) {
            $(this).removeClass("sw").addClass("hd");
            $('.seachBar').css({
                'display': 'block'
            })
            $('.seachBar').addClass({
                'class': 'glyphicon glyphicon-remove'
            })
        } else {
            $(this).removeClass("hd").addClass("sw");
            $('.seachBar').css({
                'display': 'none'
            })
        }
    })

    // 输入框输入内容时显示删除小图标
    $('.txt input').on('input', function () {
        removeVal();
    })

    // 单击搜索清空文本框内容
    $('.sub input').click(function () {
        $('.txt input').val("");
        removeVal();
    })

    // 判断输入框内容是否为空 并改变关闭按钮的显示与隐藏
    function removeVal() {
        if ($('.txt input').val() == "") {
            $('.txt span').css({
                'opacity': 0,
                'transition': 'all 300ms'
            })
        } else {
            $('.txt span').css({
                'opacity': 1,
                'transition': 'all 300ms'
            })
        }
    }

    // 单击按钮回到顶部
    $("#totop").click(function () {
        $("html,body").animate({
            "scrollTop": 0
        }, 600, "swing");
    })
})