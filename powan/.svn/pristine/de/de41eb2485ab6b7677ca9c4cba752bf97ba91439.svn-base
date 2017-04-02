function itcast_tap(dom,callback) {
  /**
   * 轻敲事件
   * 如果触摸的时间太长 失效
   * 如果触摸之后 移动了 失效
   * 使用 touch的三个事件 来实现 这些需求
   */
  var startTime = 0;

  // 最大触摸事件
  var maxTouchTime = 200;

  // 定义标识 是否移动了
  var isMove = false;

  dom.addEventListener('touchstart', function (event) {
    // 记录起始值
    startTime = Date.now();

    // 默认每一次开始 
    isMove = false;
  })
  dom.addEventListener('touchmove', function (event) {
    // console.log('move');
    isMove = true;
  })
  dom.addEventListener('touchend', function (event) {
    var delayTime = Date.now() - startTime;
    // 如果太长了 
    if (delayTime > maxTouchTime) {
      // 失效
      // console.log('时间太长了');
      return;
    }
    if (isMove == true) {
      // console.log('移动了');
      return;
    }

    // console.log('成功触发');

    // 调用传入的 callback
    callback(event);
  })
}