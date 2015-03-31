/*******  By Okiilemon  *******/
/*******  2015.3  *******/
(function (window, document, undefined) {

"use strict";

var smartDater = window.smartDater || (window.smartDater = {
    allElementNodes : [],
    timeStamps : [],
    update : undefined,
    callTheUpdate : undefined,
    insertNode : undefined,
    insertNodes : undefined,
    hasInit: false
}),
    that = smartDater,

    selectAllAttributes = function () {
        if (document.querySelectorAll){
            that.timeStamps = document.querySelectorAll("[data-timestamp]");
        }else {
            smartDater.allElementNodes = document.getElementsByTagName('*');
            traversal(smartDater.allElementNodes);
        };
    },
    //定义遍历所有节点找到时间戳节点并保存的方法
    traversal = function (elementNodes) {

        var lenOfElements = elementNodes.length
        for (var i = 0; i < lenOfElements; i++) {
            var dataTimestamp = elementNodes[i].getAttribute('data-timestamp');
            if (dataTimestamp) {
                that.timeStamps.push(elementNodes[i]);
            }
        }
    };


//定义刷新时间间隔的方法
that.update = function (thatTime) {
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
that.callTheUpdate = function () {

    var lenOfTimestamps = that.timeStamps.length,
        node;

    for (var k = 0; k < lenOfTimestamps; k++) {
        node = that.timeStamps[k];
        node.innerHTML = that.update(node.getAttribute('data-timestamp'));
    }

};

that.insertNode = function (node) {
    var thatTime;
    if (node.getAttribute('data-timestamp')) {
        thatTime = node.getAttribute('data-timestamp');
        node.innerHTML = that.update(thatTime);
        console.log(node);
        that.allElementNodes.push(node);
    }else {
        return false;
    }
};

that.insertNodes = function (nodes) {
    var len;
    if (len = nodes.length) {
        for (var i = len - 1; i >= 0; i--) {
            that.insertNode(nodes[i]);
        };
    }else {
        return false;
    }
};

that.init = function () {
    selectAllAttributes();
    smartDater.callTheUpdate();
    that.hasInit = true;
};

//页面载入后立即遍历并更新
window.onload = function () {
    if (!that.hasInit) {
        that.init();
    }
};

//每60s刷新一次
window.setInterval(function () {
    smartDater.callTheUpdate()
}, 60000);


})(window, document);