'use strict';
$(function() {

    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbrandtitle',

        type: 'get',
        success: function(data) {
            console.log(data);
            var result = template('template', data);
            $('.nav').append(result);

        }
    })
})