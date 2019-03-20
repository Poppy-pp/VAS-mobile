
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
//获取当前日期 格式为yyy-mm-dd
export default {
    getDateDiff(dateTimeStamp){
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else
        result="刚刚";
        return result;
    },
    getDateTimeStamp(dateStr){
     return Date.parse(dateStr.replace(/-/gi,"/"));
    },
    //判断当前数组中是否存在某个属性
    findElem:function(arrayToSearch,attr,val){
        for (var i=0;i<arrayToSearch.length;i++){
            if(arrayToSearch[i][attr] == val){
                return false;
            }
        }
        return true;
    },
    //自动生成批号
    getDateTime:function(){
        var d = new Date();
        var year = d.getFullYear()+"";
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var day = d.getDay();
        var Hours = d.getHours(); 
        var Minutes = d.getMinutes(); 
        var Seconds = d.getSeconds(); 
        var c = year;
        c = month<10 ? c + "0" + month : c + month;
        c = date<10 ? c + "0" + date : c + date;
        c = Hours<10 ? c + "0" + Hours : c + Hours;
        c = Minutes<10 ? c + "0" + Minutes : c + Minutes;
        c = Seconds<10 ? c + "0" + Seconds : c + Seconds;
        return c;
    },
    //获取当月1号
    getDateMonthOne:function(){
        var date = new Date(),
        year = date.getYear() + 1900,
        month = date.getMonth() + 1;
        month = month<10 ? "0" + month : month;
        return year + "-" + month + "-01";
    },
    RndNum:function(n){
        var rnd = "";
        for(var i=0;i<n; i++){
            rnd += Math.floor(Math.random()*10);
        }
        return rnd;
    },
    getTimeAndRandom:function(n){
        return this.getDateTime()+this.RndNum(n);
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    /* 初始化安装地址 */
    initProvince:function(){
        let prArry = [];
        province.forEach(function(obj){
            let tmpobj = {},cityArry = [];
            tmpobj.label = obj.name;
            tmpobj.value = obj.name;
            obj.city.forEach(function(obj){
              let tmpobj = {},areaArry = [];
              tmpobj.label = obj.name;
              tmpobj.value = obj.name;
              obj.area.forEach(function(obj){
                let tmpobj = {};
                tmpobj.label = obj;
                tmpobj.value = obj;
                areaArry.push(tmpobj);
              });
              tmpobj.children = areaArry;
              cityArry.push(tmpobj)
            });
            tmpobj.children = cityArry;
            prArry.push(tmpobj);
        });
        return prArry;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    }
};