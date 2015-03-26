/*******  By Okiilemon  *******/
/*******  2015.3  *******/

var smartDater = {
    total: 0,
    allElementNodes: document.getElementsByTagName('*')

};

smartDater.timeStamps = [];

//定义遍历所有节点找到时间戳节点并保存的方法
smartDater.traversal = function (elementNodes) {

    var lenOfElements = elementNodes.length
    for (var i = 0; i < lenOfElements; i++) {
        if (elementNodes[i].attributes.length) {
            var lenOfAttr = elementNodes[i].attributes.length;
            for (var j = 0; j < lenOfAttr; j++) {
                if (elementNodes[i].attributes[j].nodeName === 'data-timestamp') {
                    this.timeStamps[this.total++] = elementNodes[i];
                }
            }
        }
    }
};


//定义刷新时间间隔的方法
smartDater.update = function (thatTime) {
    var currentTime = Date.parse(new Date());
    //得到时间差，单位为'秒'
    var gap = (currentTime - thatTime) / 1000;
    var currentDate = new Date(currentTime);
    var currentYear = currentDate.getFullYear();
    //同上，得到当时时间各参数
    var thatDate = new Date(parseInt(thatTime));
    /*没有parseInt()函数的话，最后输出的就是 NaN */
    var thatYear = thatDate.getFullYear();
    var thatMonth = thatDate.getMonth() + 1;
    var thatDay = thatDate.getDate();
    var newGap = '';

    //格式化个位数的月份与天数
    if (thatMonth < 10) {
        var thatMonthFormatted = '0' + thatMonth;
    }
    else {
        thatMonthFormatted = thatMonth;
    }
    if (thatDay < 10) {
        var thatDayFormatted = '0' + thatDay;
    }
    else {
        thatDayFormatted = thatDay;
    }
    //判断时间间隔并得到新的时间间隔
    if (gap < 60) {
        newGap = '刚刚';
    }
    else if (gap < 3600) {
        newGap = Math.floor(gap / 60) + '分钟前';
    }
    else if (gap < 86400) {
        newGap = Math.floor(gap / 3600) + '小时前';
    }
    else if (gap < 172800) {
        newGap = '昨天';
    }
    else if (thatYear === currentYear) {
        newGap = thatMonthFormatted + '-' + thatDayFormatted;
    }
    else {
        newGap = thatYear + '-' + thatMonthFormatted + '-' + thatDayFormatted;

    }
    return newGap;
};

//定义调用遍历和刷新的方法以更新
smartDater.callTheUpdate = function () {

    var lenOfTimestamps = this.timeStamps.length;

    for (var k = 0; k < lenOfTimestamps; k++) {
        this.timeStamps[k].innerHTML = this.update(this.timeStamps[k].getAttribute('data-timestamp'));
    }

};

//页面载入后立即遍历并更新
window.onload = function () {
    smartDater.traversal(smartDater.allElementNodes);
    smartDater.callTheUpdate();
};

//每60s刷新一次
setInterval(function () {
    smartDater.callTheUpdate()
}, 60000);
