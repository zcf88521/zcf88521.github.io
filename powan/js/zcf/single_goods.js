
$(function () {
    var btnLis = $(".tabs li");
    var tabDiv = $(".tab-content div");
    var siftBtn = $(".tabs .sift");
    var seachColse = $(".sift-seach b");
    var seach = $(".sift-seach input")
    var index=0;
    var tabsli_a=$(".tabs li i");
    var tabs_1 = $(".tabs_1");
    var tabs1_ul = $(".tabs-1 ul");
    var tabsLis = $(".tabs_1 li")
    var tabs_2 = $(".tabs_2");
    var tabs2_ul = $(".tabs-2 ul");
    var tabs_3 = $(".tabs_3");
    var goodsId = 0;
    var cityid = 0;
    var showUl = $(".showUl");
    var ajaxUl=$(".tab-content div");
    var tabsLia=$(".tabs li a span");
    var showLoad=$(".showload");
    var select_box=$(".select_box");
    var henderH=$("header").height();
    console.log(select_box);
    //������Ļ
    $(window).scroll(function (e) {
        console.log($(this).scrollTop());
        if($(this).scrollTop()>henderH){
            select_box.addClass("fixedClass");
            showUl.css("paddingTop",henderH);
        }
        if($(this).scrollTop()<henderH){
            select_box.removeClass("fixedClass");
            showUl.css("paddingTop","6px");
        }
    })

    showUl[0].addEventListener("touchmove", function (e) {
        ajaxUl.eq(index).removeClass("show");
        tabsli_a.eq(index).removeClass("upi");
    })

    btnLis.on("click", function () {
        index = $(this).index();
        if(tabsli_a.eq(index).hasClass("upi")){
            tabsli_a.eq(index).removeClass("upi");

        }else{
            for(var i=0;i<tabsli_a.length;i++){
                tabsli_a[i].className="";
            }
            tabsli_a.eq(index).addClass("upi");
        }
        if(index!=3){
            if(siftBtn.hasClass("closexxx")){
                siftBtn.removeClass("closexxx");
            }
        }

        if(index==3){
            if(siftBtn.hasClass("closexxx")){
                siftBtn.removeClass("closexxx");
            }else{
                siftBtn.addClass("closexxx");
            }
        }

        if (tabDiv.eq(index).hasClass("show")) {
            tabDiv.eq(index).removeClass("show");
        } else {
            tabDiv.eq(index).addClass("show").siblings().removeClass("show");
        }

    })
    $(".tabs-3 ul li").on("click",function(){
        var index=$(this).index();
        var sshow=$(".tabs-3 ul s");
        for(var i=0;i<sshow.length;i++){
            sshow.eq(i).removeClass("showS")
        }
        sshow.eq(index).addClass("showS");
    })
    
    //��������հ�ť
    seachColse.on("click", function () {
        seach.val("");
        $(this).fadeOut(200);
    })
    //��������¼�
    seach.on("keyup", function () {
        if ($(this).val() == "") {
            seachColse.fadeOut(200);
        } else {
            seachColse.fadeIn(200);
        }
    })

    /***************************ajax�߼���************************/





    /************����***********/
    responesData("http://139.199.157.195:9090/api/getgsshop", function (data) {
        var tabs1 = template("tabs_1", data);
        tabs1_ul.html("");
        tabs1_ul.append(tabs1);
        var tabs1_lis = $(".tabs-1 ul li");
        var fristshow=$(".tabs-1 ul li:first s");
        fristshow.addClass("showS");
        tabs1_lis.on("click", function () {
            goodsId = $(this).index();
            tabsLia.eq(index).text($(this).text())
            ajaxUl.eq(index).toggleClass("show");
            showLoad[0].style.display="block";
            setTimeout(function(){
                loadAjax();
            },1000)

            var sshow=$(".tabs-1 ul s");
            for(var i=0;i<sshow.length;i++){
                sshow.eq(i).removeClass("showS")
            }
            sshow.eq(goodsId).addClass("showS");
        })
    })

    /****************����*****************/
    responesData("http://139.199.157.195:9090/api/getgsshoparea", function (data) {
        var tabs2 = template("tabs_2", data);
        tabs2_ul.html("");
        tabs2_ul.append(tabs2);
        var tabs2_lis = $(".tabs-2 ul li");
        var fristshow=$(".tabs-2 ul li:first s");
        fristshow.addClass("showS");
        tabs2_lis.on("click", function () {
            cityid = $(this).index();
            var str=$(this).text();
            str=str.substring(0,2);
            tabsLia.eq(index).text(str);
            ajaxUl.eq(index).toggleClass("show");
            showLoad[0].style.display="block";
            setTimeout(function(){
                loadAjax();
            },1000)
            var sshow=$(".tabs-2 ul s");
            for(var i=0;i<sshow.length;i++){
                sshow.eq(i).removeClass("showS")
            }
            sshow.eq(cityid).addClass("showS");
        })
    })
    //��������

     var dalaylond=$(".dalaylond");
    $.ajax({
        url: "http://139.199.157.195:9090/api/getgsproduct",
        data: {
            shopid: goodsId,
            areaid: cityid
        },
        success: function (siftData) {
            var showGods = template("showGoods", siftData);
            showUl.html("");
            showUl.append(showGods);
             var bodyHt=$("body").height();
            var moveY=bodyHt;
            var clienY=$(window).height();
            var flag=true;
            $(window).scroll(function(e){
                moveY=bodyHt-$(this).scrollTop();
                if((moveY-clienY<20)&&flag){
                    dalaylond[0].style.display="block";
                    var spid=Math.floor(0+Math.random()*(2-0));
                    var aeaid=Math.floor(0+Math.random()*(6-0));
                    flag=false;
                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getgsproduct",
                        data: {
                            shopid: spid,
                            areaid: aeaid
                        },
                        success: function (siftData) {
                            setTimeout(function(){
                                dalaylond[0].style.display="none";
                                flag=true;
                                var showGods = template("showGoods", siftData);
                                showUl.append(showGods);
                                console.log(213213213);
                                bodyHt=$("body").height();
                            },1000)
                        }
                    })
                }

            })
        }
    })


    /**
     * 1����̳�ĳһ����ȡindex �����Ĭ��ѡ���һ��
     * 2��Ⱦҳ��
     * 1������� �Ȼ�ȡ������̳��±�Ȼ���ڻ�ȡ���������±� ��������ʱ����Ҫ��ȡ����ֵ �̳�id ����id
     * 2��Ⱦҳ��
     */
    function loadAjax() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsproduct",
            data: {
                shopid: goodsId,
                areaid: cityid
            },
            success: function (siftData) {
                showLoad[0].style.display="none";
                var showGods = template("showGoods", siftData);
                showUl.html("");
                showUl.append(showGods);
            }
        })
    }


    function responesData(url, callback) {
        $.ajax({
            url: url,
            dataType: "json",
            success: function (data) {
                showLoad[0].style.display="none";
                    callback(data);
            }
        })
    }
})
