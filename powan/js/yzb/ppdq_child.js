'use strict';
$(function () {

    var brandTitleId = getQueryString('brandTitleId');

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbrand',
        data: {
            brandtitleid: brandTitleId
        },
        type: 'get',
        success: function (data) {

            var result = template('template', data);
            $('#top10').append(result);
            for (var i = 0; i < 10; i++) {
                $('#top10 li').eq(i).find('.top1').text(i + 1);
            }
            console.log($('#top10 li'));

        }
    })
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbrandproductlist',
        data: {
            brandtitleid: brandTitleId,
            pagesize: 4
        },
        type: 'get',
        success: function (data) {
            console.log(data);

            var result = template('template1', data);
            $('.sellList').append(result);

        }
    })




    $.ajax({
        url: 'http://139.199.157.195:9090/api/getproductcom',
        data: {
            productid: 2
        },
        type: 'get',
        success: function (data) {
            console.log(data);

            var result = template('template2', data);
            $('.pllist li').append(result);

        }
    })
})
