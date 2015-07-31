var verify = angular.module("verify",["ngMessages"]);

verify.run(["$rootScope", function($rootScope){

    $rootScope._PATTERN_ = {};
    $rootScope._PATTERN_.currency = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/; //金额,2位小数
    $rootScope._PATTERN_.intege = /^-?[1-9]\d*$/;                    //整数
    $rootScope._PATTERN_.intege1 = /^[1-9]\d*$/;                 //正整数
    $rootScope._PATTERN_.intege2 = /^-[1-9]\d*$/;                 //负整数
    $rootScope._PATTERN_.num = /^([+-]?)\d*\.?\d+$/;            //数字
    $rootScope._PATTERN_.num1 = /^[1-9]\d*|0$/;                   //正数（正整数 + 0）
    $rootScope._PATTERN_.num2 = /^-[1-9]\d*|0$/;                  //负数（负整数 + 0）
    $rootScope._PATTERN_.decmal = /^([+-]?)\d*\.\d+$/;          //浮点数
    $rootScope._PATTERN_.decmal1 = /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/;　　   //正浮点数
    $rootScope._PATTERN_.decmal2 = /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/;　 //负浮点数
    $rootScope._PATTERN_.decmal3 = /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/;　 //浮点数
    $rootScope._PATTERN_.decmal4 = /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/;　　 //非负浮点数（正浮点数 + 0）
    $rootScope._PATTERN_.decmal5 = /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/;　　//非正浮点数（负浮点数 + 0）
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
            scope.$watch(attr.ngMin, function(){
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function(value) {
              var min = scope.$eval(attr.ngMin) || 0;
              if (value*1 < min*1) {
                ctrl.$setValidity('min', false);
              } else {
                ctrl.$setValidity('min', true);
              }
              return value;
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

verify.directive('ngMax', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function(){
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function(value) {
              var max = scope.$eval(attr.ngMax) || Infinity;
              if (value*1 > max*1) {
                ctrl.$setValidity('max', false);
              } else {
                ctrl.$setValidity('max', true);
              }
              return value;
            };
            
            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});

verify.directive('maxTime', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.maxTime, function(){
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxTimeValidator = function(value) {
              var maxTime,time;
              maxTime = scope.$eval(attr.maxTime);
              maxTime = maxTime ? Date.parse(maxTime.replace(/-/g, '/') || "1970/01/01") : 0;
              time = value ? Date.parse(value.replace(/-/g, '/')) : 0;
              if (time >= maxTime) {
                ctrl.$setValidity('maxTime', false);
              } else {
                ctrl.$setValidity('maxTime', true);
              }
              return value;
            };
            
            ctrl.$parsers.push(maxTimeValidator);
            ctrl.$formatters.push(maxTimeValidator);
        }
    };
});

verify.directive('minTime', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.minTime, function(){
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minTimeValidator = function(value) {
              var minTime,time;
              minTime = scope.$eval(attr.minTime);
              minTime = minTime ? Date.parse(minTime.replace(/-/g, '/') || "1970/01/01") : 0;
              time = value ? Date.parse(value.replace(/-/g, '/')) : 0;
              if (time < minTime) {
                ctrl.$setValidity('minTime', false);
              } else {
                ctrl.$setValidity('minTime', true);
              }
              return value;
            };
            
            ctrl.$parsers.push(minTimeValidator);
            ctrl.$formatters.push(minTimeValidator);
        }
    };
});

//angular的验证是由form 指令和ngModel协调完成的。
//当验证控件没有没有name属性这是不会被form捕获的。或者是你希望在ngRepeat中使用动态表达式
//ngModel的$name属性并不支持表达式计算。
//dy-name的解决此问题，其会在post link阶段解析表达式，并把自己注册到父form controller。
//详见: http://www.ngnice.com/posts/81c1eb92bfbde0
verify.directive("dyName", [
    function() {
        return {
            require: "ngModel",
            link: function(scope, elm, iAttrs, ngModelCtr) {
                ngModelCtr.$name = scope.$eval(iAttrs.dyName);
                var formController = elm.controller('form') || {
                    $addControl: angular.noop
                };
                formController.$addControl(ngModelCtr);

                scope.$on('$destroy', function() {
                    formController.$removeControl(ngModelCtr);
                });
            }
        };
    }
]);

//<form show-one> 同一时刻只显示一个ngMessages
verify.directive("showOne", ["$window","$timeout", function($window, $timeout){
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
               
                meaasges.splice(insertTo|0, 0 , elem);
                var adjust = null;
                $timeout.cancel(adjust);
                adjust = $timeout(function(){
                    try{
                        $($window.top).resize();
                    }catch(e){
                        $($window).resize();
                    }
                },20);
                
            };

            this.delMessage = function(elem){
                 meaasges.splice(meaasges.indexOf(elem), 1);
            }

            var showIndex = 0;

            function show(index){
                 for(var i=meaasges.length-1;i>=0;--i){
                    if(index == i)
                        meaasges[i].css('display','inline-block');
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
                if(index == showIndex){
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
verify.directive("ngMessages",["$window","$timeout",function($window, $timeout){
     return {
        restrict: 'EA',
        require: '?^showOne',
        link: function(scope, elem, attr, showOne) {

            function adjust(){
                var input = elem.prevAll("input,textarea,select").first();
		        if(input.length > 0){
                    if(input.attr("type") == "radio" || input.attr("type") == "checkbox" )
                        elem.css({'left':input.position().left - 39 +'px',
                               'top':input.position().top + input.outerHeight() + 10 +'px'});
                    else
                        elem.css({'left':input.position().left+'px',
                               'top':input.position().top + input.outerHeight() + 5 +'px'});
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

$(function(){
    if(top.$.blockUI){
        top.$.blockUI.defaults.onBlock = function(){
            try{
                $(window.top).resize();
            }catch(e){
                $(window).resize();
            }
        }
    }
});

window.angular.element(top.document).add(document).find('head').prepend("<style>form{position:relative}.error-messages.ng-active{background:#b62929;color:#FFF;padding:5px;border-radius:5px;position:absolute;z-index:900}.error-messages.ng-active:after{position:absolute;top:-10px;content:'';left:20px;border-style:solid;border-color:transparent transparent #b62929;border-width:5px}.error-messages.ng-active{*zoom:expression(this.runtimeStyle['zoom'] = '1',this.insertBefore(document.createElement('s')))}.error-messages.ng-active s{position:absolute;top:-30px;left:20px;border-style:solid;border-color:transparent transparent #b62929;border-width:5px}.error-messages.ng-active{color:#FFF;line-height:20px}</style>");