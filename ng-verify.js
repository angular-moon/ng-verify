var verify = angular.module("verify", ["ngMessages"]);

verify.run(["$rootScope", function($rootScope){

    $rootScope._PATTERN_ = {};
    $rootScope._PATTERN_.currency = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/; //金额,2位小数
    $rootScope._PATTERN_.currency1 = /^[0-9]+(\.[0-9]{2})?$/; //非负金额,2位小数
    $rootScope._PATTERN_.intege = /^([+-]?)[1-9]\d*$/;                    //整数
    $rootScope._PATTERN_.intege1 = /^[1-9]\d*$/;                 //正整数
    $rootScope._PATTERN_.intege2 = /^-[1-9]\d*$/;                 //负整数
    $rootScope._PATTERN_.num = intege;            //历史原因保留
    $rootScope._PATTERN_.num1 = intege1;                   //历史原因保留
    $rootScope._PATTERN_.num2 = intege2;                  //历史原因保留
    $rootScope._PATTERN_.decmal = /^([+-]?)[0-9]+([.][0-9]+){0,1}$/;          //浮点数
    $rootScope._PATTERN_.decmal1 = /^[0-9]+([.][0-9]+){0,1}$/;　　   //正浮点数
    $rootScope._PATTERN_.decmal2 = /^-[0-9]+([.][0-9]+){0,1}$/;　 //负浮点数
    $rootScope._PATTERN_.decmal3 = decmal;　 //历史原因保留
    $rootScope._PATTERN_.decmal4 = decmal1;  //历史原因保留
    $rootScope._PATTERN_.decmal5 = decmal2;  //历史原因保留
    $rootScope._PATTERN_.email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//邮件
    $rootScope._PATTERN_.color = /^[a-fA-F0-9]{6}$/;               //颜色
    $rootScope._PATTERN_.url = /^https?:\/\/[^\s]*$/;    //url
    $rootScope._PATTERN_.chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;                  //仅中文
    $rootScope._PATTERN_.ascii = /^[\x00-\xFF]+$/;               //仅ACSII字符
    $rootScope._PATTERN_.zipcode = /^[1-9]\d{5}(?!\d)$/;                     //邮编
    $rootScope._PATTERN_.ip4 = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;  //ip地址
    $rootScope._PATTERN_.notempty = /^\S+$/;                      //非空
    $rootScope._PATTERN_.picture = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;   //图片
    $rootScope._PATTERN_.rar = /(.*)\.(rar|zip|7zip|tgz)$/;                               //压缩文件
    $rootScope._PATTERN_.date = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;                 //日期
    $rootScope._PATTERN_.qq = /^[1-9]*[1-9][0-9]*$/;  //QQ号码 
    $rootScope._PATTERN_.phone = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/; //电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号)
    $rootScope._PATTERN_.username = /^\w+$/;                      //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
    $rootScope._PATTERN_.letter = /^[A-Za-z]+$/;                   //字母
    $rootScope._PATTERN_.letter_u = /^[A-Z]+$/;                    //大写字母
    $rootScope._PATTERN_.letter_l = /^[a-z]+$/;                    //小写字母
    $rootScope._PATTERN_.idcard = /^[1-9]([0-9]{14}|[0-9]{17})$/;   //身份证
}]);


verify.directive('ngMin', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function(newValue, oldValue){
                if(newValue !== oldValue)
                    ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function(value) {

                //如果值为'空',设置验证通过,
                //对于空值的验证应该使用required
                if(ctrl.$isEmpty(value)){
                    ctrl.$setValidity('min', true);
                    return;
                }

                var min = scope.$eval(attr.ngMin) || 0;
                if (value*1 < min*1) {
                    ctrl.$setValidity('min', false);
                } else {
                    ctrl.$setValidity('min', true);
                }
                return value;
            };

            ctrl.$formatters.push(minValidator);
            ctrl.$parsers.unshift(minValidator);
        }
    };
});

verify.directive('ngMax', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function(newValue, oldValue){
                if(newValue !== oldValue)
                    ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function(value) {

                //如果值为'空',设置验证通过,
                //对于空值的验证应该使用required
                if(ctrl.$isEmpty(value)){
                    ctrl.$setValidity('max', true);
                    return;
                }

                var max = scope.$eval(attr.ngMax) || Infinity;
                if (value*1 > max*1) {
                    ctrl.$setValidity('max', false);
                } else {
                    ctrl.$setValidity('max', true);
                }
                return value;
            };
            
            ctrl.$formatters.push(maxValidator);
            ctrl.$parsers.unshift(maxValidator);
        }
    };
});

verify.directive('maxTime', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.maxTime, function(newValue, oldValue){
                if(newValue !== oldValue)
                    ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxTimeValidator = function(value) {

                //如果值为'空',设置验证通过,
                //对于空值的验证应该使用required
                if(ctrl.$isEmpty(value)){
                    ctrl.$setValidity('maxTime', true);
                    return;
                }

                var maxTime,time;
                try{
                    maxTime = scope.$eval(attr.maxTime);
                    if(angular.isString(maxTime))
                        maxTime = Date.parse(maxTime.replace(/-/g, '/'));
                    else if(angular.isDate(maxTime))
                        maxTime = maxTime.getTime();
                }catch(e){
                    maxTime = 0;
                }
                
                time = value ? Date.parse(value.replace(/-/g, '/')) : 0;
                if (time > maxTime) {
                    ctrl.$setValidity('maxTime', false);
                } else {
                    ctrl.$setValidity('maxTime', true);
                }
                return value;
            };
            
            ctrl.$formatters.push(maxTimeValidator);
            ctrl.$parsers.unshift(maxTimeValidator);
        }
    };
});

verify.directive('minTime', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.minTime, function(newValue, oldValue){
                if(newValue !== oldValue)
                    ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minTimeValidator = function(value) {

                //如果值为'空',设置验证通过,
                //对于空值的验证应该使用required
                if(ctrl.$isEmpty(value)){
                    ctrl.$setValidity('minTime', true);
                    return;
                }
                
                var minTime,time;
                try{
                    minTime = scope.$eval(attr.minTime);
                    if(angular.isString(minTime))
                        minTime = Date.parse(minTime.replace(/-/g, '/'));
                    else if(angular.isDate(minTime))
                        minTime = minTime.getTime();
                 }catch(e){
                    minTime = 0;
                }
               
                time = value ? Date.parse(value.replace(/-/g, '/')) : 0;
                if (time < minTime) {
                    ctrl.$setValidity('minTime', false);
                } else {
                    ctrl.$setValidity('minTime', true);
                }
                return value;
            };
            
            ctrl.$formatters.push(minTimeValidator);
            ctrl.$parsers.unshift(minTimeValidator);
        }
    };
});

//angular的验证是由form 指令和ngModel协调完成的。
//当验证控件没有没有name属性这是不会被form捕获的。或者是你希望在ngRepeat中使用动态表达式
//ngModel的$name属性并不支持表达式计算。
//dy-name的解决此问题，其会在post link阶段解析表达式，并把自己注册到父form controller。
//详见: http://www.ngnice.com/posts/81c1eb92bfbde0
verify.directive("dyName", function() {
        return {
            require: "ngModel",
            link: function(scope, elm, iAttrs, ngModelCtr) {
                ngModelCtr.$name = scope.$eval(iAttrs.dyName);
                var formController = elm.controller('form') || {
                    $addControl: angular.noop
                };
                formController.$addControl(ngModelCtr);
                //fix noVerify bug
                scope.$evalAsync(function(){
                    ngModelCtr.$setViewValue(ngModelCtr.$viewValue);
                })

                scope.$on('$destroy', function() {
                    formController.$removeControl(ngModelCtr);
                });
            }
        };
    }
);

//<form show-one> 同一时刻只显示一个ngMessages
verify.directive("showOne", ["$window", "$timeout", "$rootScope", function($window, $timeout, $rootScope){
     return {
        restrict: 'A',
        controller: ['$scope', function($scope){

            var meaasges = [];
            if(!meaasges.indexOf){
                Array.prototype.indexOf = function(e){
                    for(var i=0; i<this.length; ++i){
                        if(this[i]==e)
                            return i;
                    }
                    return -1;
                }
            }

            var adjust = null;
            function adjustPosition(){
                $timeout.cancel(adjust);
                adjust = $timeout(function(){
                    try{
                        $rootScope.$broadcast("verfiyAdjust");
                    }catch(e){
                        try{
                            $(window.top).resize();
                        }catch(e){
                            $(window).resize();
                        }
                    }
                },40);
            }

            this.addMessage = function(elem){

                //初始化为隐藏
                elem.css('display','none');

                //计算插入位置,解决动态增加ng-messages的问题
                var insertTo = 0;
                var allElem = angular.element("[ng-messages]");
                for(var i=allElem.length-1; i>=0; --i)
                {
                    if(elem.attr("ng-messages") == allElem.eq(i).attr("ng-messages")){
                        insertTo = i;
                        break;
                    }
                }
                adjustPosition();
                meaasges.splice(insertTo|0, 0 , elem);
               
                
            };

            this.delMessage = function(elem){
                meaasges.splice(meaasges.indexOf(elem), 1);
                if(meaasges.length === 0)
                    showIndex = 0;
                else
                    this.showIndexNext(elem);
            }

            var showIndex = 0;


            function show(index){
                 for(var i=meaasges.length-1;i>=0;--i){
                    if(index == i)
                        meaasges[i].fadeIn(250);
                    else   
                        meaasges[i].css('display','none');
                 }

            }

            this.tryShow = function(elem){
                var index = meaasges.indexOf(elem);
                if(index <= showIndex){
                    show(showIndex = index);
                }
            };

            this.showIndexNext = function(elem){
                var index = meaasges.indexOf(elem);
                if(index <= showIndex){
                    showIndex = Math.min(index + 1, meaasges.length-1);
                    var length = meaasges.length;
                    while(showIndex < length){
                        if(meaasges[showIndex].data("$valid"))
                            ++showIndex;
                        else
                            break;
                    }
                    show(showIndex);
                }
            };

        }]
    };
}]);

//自动计算ngMessages 的 position
verify.directive("ngMessages", ["$window", "$timeout", function($window, $timeout){
     return {
        restrict: 'EA',
        require: '?^showOne',
        link: function(scope, elem, attr, showOne) {
            var position = attr["position"];
            if(position == "right")
                elem.addClass("right");

            //设置位置偏移量
            var _offset, offset = {top:0, left:0};
            if(attr["offset"]){
                _offset = attr["offset"].split(",");
                offset.top = parseInt(_offset[0]) || 0;
                offset.left = parseInt(_offset[1]) || 0;
            }

            //设定宽度
            var width = parseInt(attr["width"]) || "auto";

            function adjust(){
                var input = elem.prevAll("input,textarea,select").first();
                if(input.length > 0){
                    if(input.attr("type") == "radio" || input.attr("type") == "checkbox" ){
                        elem.css({'left':input.position().left - 39 + offset.left +'px',
                                'top':input.position().top + input.outerHeight() + 10 + offset.top +'px',
                                'width':width});
                    }else{
                        if(position == "right"){
                            elem.css({
                                'left': input.position().left + input.outerWidth() + 10 + offset.left + 'px',
                                'top': input.position().top + offset.top + 'px',
                                'width':width});

                        }else{
                            elem.css({'left':input.position().left + offset.left +'px',
                               'top':input.position().top + input.outerHeight() + 5 + offset.top +'px',
                               'width':width});
                        }
                    }
                }
            }

            $timeout(function(){
                adjust();
            });
            
            try{
                $($window.top).resize(function(){
                    adjust();
                });
            }catch(e){
                 $($window).resize(function(){
                    adjust();
                });
            }

            scope.$on("verfiyAdjust", function(){
                $timeout(function(){
                    adjust();
                });
            
            })
            
            if(showOne){
                showOne.addMessage(elem);

                scope.$watch(attr.ngMessages.replace("$error","$valid"), function(value){
                    if(value)
                        showOne.showIndexNext(elem.data("$valid", true));
                    else
                        showOne.tryShow(elem.data("$valid", false));
                });

                elem.bind('$destroy',function(){
                    showOne.delMessage(elem);
                });
            }
        }
    };
}]);

verify.directive("noVerify", function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: -1000,
        link: function(scope, elem, attr, ngModel) {
            if(!ngModel){
                if(console)
                    console.error("noVerify can't find ngModel");
                return;
            }
            
            if(attr.noVerify){
                scope.$watch(attr.noVerify, function(newValue, oldValue){
                    if(newValue !== oldValue)
                    ngModel.$setViewValue(ngModel.$viewValue);
                })
            }

            var noVerify = function(value){
                if((attr.noVerify === "" || scope.$eval(attr.noVerify)) && ngModel.$error){
                     for (var key in ngModel.$error) {
                        if (ngModel.$error.hasOwnProperty(key)) {
                            ngModel.$setValidity(key, true);
                        }
                    }
                }
                return value;
            }

            ngModel.$formatters.unshift(noVerify);
            ngModel.$parsers.push(noVerify);
           
        }
    };
});

$(function(){
    if(top.$.blockUI){
        top.$.blockUI.defaults.onBlock = function(){
            try{
                angular.element(".blockMsg").injector().invoke(["$rootScope", function($rootScope){
                    $rootScope.$broadcast("verfiyAdjust");
                }]);
            }catch(e){
                try{
                    $(window.top).resize();
                }catch(e){
                    $(window).resize();
                }
            }
        }
    }
});