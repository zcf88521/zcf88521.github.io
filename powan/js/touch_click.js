(function ($) {
  $.fn.extend({
    touch_click: function (fn) {
      // 定义变量
      // 1.存储时间的变量
      var starTime = 0;
      // 2.定义一把锁,用于判断用户是否有移动
      var isMove = false;
      // 触摸点击
      this.on("touchstart",function(event){
        // 获取点击的初始时间
        startTime=Date.now()
        // console.log(starTime);
        // 每次点击都将isMove还原初始值
        isMove=false;
      })
      // 触摸移动
      this.on("touchmove",function(event){
        // 如果移动就判断改为true;
        isMove=true;
      })
      // 触摸结束
      this.on("touchend",function(event){
        // 获取点击开始到结束的时间
        var endTime =Date.now()-startTime;
        // 如果结束的时间大于200毫秒就代表用户不是触摸点击
        if(endTime>200){
          return;
        }else if(isMove){
          // 如果用户移动了代表用户不是触摸点击
          return;
        }else{
          fn(event);
        }
      })
      return this;
    }
  })
})($)