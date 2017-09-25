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
//将filterOption的xx-xx-xx转换至毫秒
Vue.prototype.toMsec = function(obj){
    obj.startDate && (obj.startTime = new Date(obj.startDate + ' 00:00:00').getTime())
    obj.endDate && (obj.endTime = new Date(obj.endDate + ' 23:59:59').getTime())
    delete obj.startDate
    delete obj.endDate
    return obj;
}

//引用对象  浅复制
Vue.prototype.copy = function(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

//局部复制
Vue.prototype.littleCopy = function(obj, option){
    var newobj = {};
    //遍历对象key，复制需要的key
    for ( var attr in obj) {
        if(option.indexOf(attr) !== -1){
            newobj[attr] = obj[attr];
        }
    }
    //遍历需要的key，局部复制完成后，给在源对象中不存在单需要的key赋空值
    option.forEach( item => {
        if(!obj[item])
            newobj[item] = ''
    })
    return newobj;
}

//将查询项filterOption打入url
Vue.prototype.pushUrlPrams = function(obj){
    let urlParam = '', href = window.location.href
    for ( let key in obj) {
        if(obj[key]!==''){
            urlParam = urlParam + key + "=" + obj[key] + "&";
        }
    }
    if(href.indexOf("?")!==-1){
        urlParam = href.substring(0, href.indexOf("?")+1) + urlParam.substring(0,urlParam.length-1);
    }else{
        urlParam = href + '?' + urlParam.substring(0,urlParam.length-1);
    }
    return urlParam;
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
Vue.prototype.checkFormEmpty = function(obj, required){
    let result = false
    for(var i in obj){
        if(required){
            if(required.indexOf(i) !== -1){
                if(obj[i] && obj[i] !== ''){ 
                    result = true 
                }
                else{ 
                    result = false; 
                    return false;
                }
            }
        }else{
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