'use strict';

$(function() {

    $.ajax({
        url: 'http://139.199.157.195:9090/api/getmoneyctrl',
        data: {
            pageid: index
        },
        type: 'get',
        success: function(data) {
            var result = template('template', data);
            $('.contain_top').append(result);
        }
    })

    // 左右按钮事件

    var index = 1;
    $('.next_b').on('click', function() {
        index++;

        if (index <= 15) {
            for (var i = 0; i < options.length; i++) {
                // $('option').eq(i).removeAttr('selected');
                options[i].selected = false;
            }
            // $('option').eq(index).attr('selected', 'true');
            options[index - 1].selected = true;

            $.ajax({
                url: 'http://139.199.157.195:9090/api/getmoneyctrl',
                data: {
                    pageid: index
                },
                type: 'get',
                success: function(data) {
                    var result = template('template', data);
                    $('.contain_top').empty().append(result);
                }
            })
        } else {
            alert('当前页为最后一页,施主请回头是岸!')
        }

    })
    var options = $('option');
    $('.prev_b').on('click', function() {

        index--;
        if (index > 0) {
            // index--;
            for (var j = 0; j < options.length; j++) {
                // options.eq(j).removeAttr('selected');
                options[j].selected = false;
            }

            // options.eq(index).attr('selected', 'true');
            options[index - 1].selected = true;

            $.ajax({
                url: 'http://139.199.157.195:9090/api/getmoneyctrl',
                data: {
                    pageid: index
                },
                type: 'get',
                success: function(data) {
                    var result = template('template', data);
                    $('.contain_top').empty().append(result);

                }
            })
        } else {
            alert('当前页是最先一页,施主请往后走!')
        }

    })


    // option选择框
    $('.selectPage').change(function(event) {
        console.log(event);
        index = event.delegateTarget.value;
        console.log(index);
        for (var j = 0; j < options.length; j++) {
            options[j].selected = false;
        }
        options[index - 1].selected = true;
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl',
            data: {
                pageid: index
            },
            type: 'get',
            success: function(data) {
                var result = template('template', data);
                $('.contain_top').empty().append(result);
            }
        })
    })




})