import Vue from 'vue'

//删除对象中的空串和空数组
Vue.prototype.deleteEmptyProperty= function(obj){
    let object = Vue.prototype.copy(obj);
    for (var i in object) {
        var value = object[i];
        // sodino.com
        // console.log('typeof object[' + i + ']', (typeof value));
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length == 0) {
                    delete object[i];
                    //console.log('delete Array', i);
                    continue;
                }
            }
            deleteEmptyProperty(value);
            if (isEmpty(value)) {
                //console.log('isEmpty true', i, value);
                delete object[i];
                //console.log('delete a empty object');
            }
        } else {
            if (value === '' || value === null || value === undefined) {
                delete object[i];
                //console.log('delete ', i);
            } else {
                //console.log('check ', i, value);
            }
        }
    }
    return object
}

//引用对象  浅复制
Vue.prototype.copy = function(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

//获取url参数并返回为对象
Vue.prototype.getUrlPrams = function(){
    let hash = window.location.hash,url = hash.substring(hash.indexOf('?')+1, hash.length);
    let urlString = url.split('&');
    var res = {};
    for(var i = 0;i<urlString.length;i++){
        var str = urlString[i].split('=');
        res[str[0]]=str[1];
    }
    return res;
}

//验证表单必填项有无空值
Vue.prototype.checkFormEmpty = function(obj, require){
    let result = false
    for(var i in obj){
        if(require.indexOf(i) !== -1){
            if(obj[i] && obj[i] !== ''){ 
                result = true 
            }
            else{ 
                result = false; 
                return false;
            }
        }
    }
    return result;
}

function isEmpty(object) {
    for (var name in object) {
        return false;
    }
    return true;
}

//拼接url
Vue.prototype.concatUrl = function(params){
    let option = params,urlParam = ""
    for(let key in option){
        urlParam = urlParam + key + "=" + option[key] + "&"
    }
    return urlParam.substring(0,urlParam.length-1)
}

Vue.prototype.scrollTo = function(elementId){
    function getScrollOffsets(_w) {//获取页面的滚动位置
        _w = _w || window;
        //for all and IE9+
        if (_w.pageXOffset != null) return {
            x: _w.pageXOffset,
            y: _w.pageYOffset
        };
        //for IE678
        var _d = _w.document;
        if (document.compatMode == "CSS1Compat") return { //for IE678
            x: _d.documentElement.scrollLeft,
            y: _d.documentElement.scrollTop
        };
        //for other mode
        return {
            x: _d.body.scrollLeft,
            y: _d.body.scrpllTop
        };
    }
     
    function getViewPortSize(_w) {//获取页面的窗口大小
        _w = _w || window;
        //for all and IE9+
        if (_w.innerWidth != null) return {
            x: _w.innerWidth,
            y: _w.innerHeight
        };
        //for IE678
        var _d = _w.document;
        if (document.compatMode == "CSS1Compat") return { //for IE678
            x: _d.documentElement.clientWidth,
            y: _d.documentElement.clientHeight
        };
        //for other mode
        return {
            x: _d.body.clientWidth,
            y: _d.body.clientHeight
        };
    }
    function scrollPosition(_obj) {//参数_obj可以是任何页面上存在的元素的id，或者是指定元素本身
        var targetX, targetY;
        if (!_obj) { //如果不指定锚点元素，就跳到页面顶端0，0位置
            targetX = 0;
            targetY = 0;
        } else {
            if (typeof (_obj) == "string") {
                _obj = document.getElementById(_obj);
            } else {
                _obj = _obj
            }
            targetX = _obj.getBoundingClientRect().left + getScrollOffsets().x;
            targetY = _obj.getBoundingClientRect().top + getScrollOffsets().y; 
        }
     
        //如果目标元素的位置在最后一屏，那就指定目标位置为页面底部
        //如果目标元素的位置为负数，就指定目标位置为页面顶部
        var maxTargetX=document.body.scrollWidth-getViewPortSize().x;
        if(targetX>=maxTargetX) targetX=maxTargetX;
        if(targetX<0) targetX=0;
        var maxTargetY=document.body.scrollHeight-getViewPortSize().y;
        if(targetY>=maxTargetY) targetY=maxTargetY;
        if(targetY<0) targetY=0;
     
        var tempTimer = setInterval(function () {
            var currentY = getScrollOffsets().y;
            var currentX = getScrollOffsets().x;
            //跳转位置的缓冲公式
            var tempTargetY = currentY - (currentY - targetY) / 10;
            var tempTargetX = currentX - (currentX - targetX) / 10;
            //由于缓冲公式会生成小数，而scrollTo函数会省略小数点后面的数字，所以要对跳转的坐标做一些微调
            if (Math.abs(tempTargetY - currentY) < 1) {
                tempTargetY - currentY > 0 ? tempTargetY++ : tempTargetY--;
            }
            if (Math.abs(tempTargetX - currentX) < 1) {
                tempTargetX - currentX > 0 ? tempTargetX++ : tempTargetX--;
            }
            //页面跳转
            window.scrollTo(tempTargetX, tempTargetY);
            //到达指定位置后清除一下Interval
            if ( Math.abs(getScrollOffsets().y - targetY) <= 2 && Math.abs(getScrollOffsets().x - targetX) <= 2  ) {
                clearInterval(tempTimer);
                window.scrollTo(targetX, targetY);
                //console.log("done");
            }
        }, 10);
    }
    scrollPosition(elementId);
    //window.scrollTo(0,position)
}