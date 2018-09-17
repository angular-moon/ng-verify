var verify = angular.module('verify', ['ngMessages']);

verify.run([
  '$rootScope',
  function($rootScope) {
    $rootScope._PATTERN_ = {};
    $rootScope._PATTERN_.currency = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/; //金额,2位小数
    $rootScope._PATTERN_.currency1 = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/; //非负金额,2位小数
    $rootScope._PATTERN_.intege = /^([+-]?)[1-9]\d*$/; //整数
    $rootScope._PATTERN_.intege1 = /^[1-9]\d*$/; //正整数
    $rootScope._PATTERN_.intege2 = /^-[1-9]\d*$/; //负整数
    $rootScope._PATTERN_.num = $rootScope._PATTERN_.intege; //历史原因保留
    $rootScope._PATTERN_.num1 = $rootScope._PATTERN_.intege1; //历史原因保留
    $rootScope._PATTERN_.num2 = $rootScope._PATTERN_.intege2; //历史原因保留
    $rootScope._PATTERN_.decmal = /^([+-]?)[0-9]+([.][0-9]+){0,1}$/; //浮点数
    $rootScope._PATTERN_.decmal1 = /^[0-9]+([.][0-9]+){0,1}$/; //正浮点数
    $rootScope._PATTERN_.decmal2 = /^-[0-9]+([.][0-9]+){0,1}$/; //负浮点数
    $rootScope._PATTERN_.decmal3 = $rootScope._PATTERN_.decmal; //历史原因保留
    $rootScope._PATTERN_.decmal4 = $rootScope._PATTERN_.decmal1; //历史原因保留
    $rootScope._PATTERN_.decmal5 = $rootScope._PATTERN_.decmal2; //历史原因保留
    $rootScope._PATTERN_.email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //邮件
    $rootScope._PATTERN_.color = /^[a-fA-F0-9]{6}$/; //颜色
    $rootScope._PATTERN_.url = /^https?:\/\/[^\s]*$/; //url
    $rootScope._PATTERN_.chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/; //仅中文
    $rootScope._PATTERN_.ascii = /^[\x00-\xFF]+$/; //仅ACSII字符
    $rootScope._PATTERN_.zipcode = /^[0-9]\d{5}(?!\d)$/; //邮编
    $rootScope._PATTERN_.ip4 = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/; //ip地址
    $rootScope._PATTERN_.notempty = /^\S+$/; //非空
    $rootScope._PATTERN_.picture = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/; //图片
    $rootScope._PATTERN_.rar = /(.*)\.(rar|zip|7zip|tgz)$/; //压缩文件
    $rootScope._PATTERN_.date = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/; //日期
    $rootScope._PATTERN_.qq = /^[1-9]*[1-9][0-9]*$/; //QQ号码
    $rootScope._PATTERN_.phone = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/; //电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号)
    $rootScope._PATTERN_.username = /^\w+$/; //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
    $rootScope._PATTERN_.letter = /^[A-Za-z]+$/; //字母
    $rootScope._PATTERN_.letter_u = /^[A-Z]+$/; //大写字母
    $rootScope._PATTERN_.letter_l = /^[a-z]+$/; //小写字母
    $rootScope._PATTERN_.idcard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/; //身份证
  }
]);

verify.directive('equals', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attr, ctrl) {
      if (!ctrl) return;
      scope.$watch(attr.equals, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });
      var equalsValidator = function(value) {
        //如果值为'空',设置验证通过,
        //对于空值的验证应该使用required
        if (ctrl.$isEmpty(value)) {
          ctrl.$setValidity('equals', true);
          return;
        }

        var otherValue = scope.$eval(attr.equals);
        ctrl.$setValidity('equals', value === otherValue);

        return value;
      };

      ctrl.$formatters.push(equalsValidator);
      ctrl.$parsers.unshift(equalsValidator);
    }
  };
});

verify.directive('ngMin', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) {
      scope.$watch(attr.ngMin, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });
      var minValidator = function(value) {
        //如果值为'空',设置验证通过,
        //对于空值的验证应该使用required
        if (ctrl.$isEmpty(value)) {
          ctrl.$setValidity('min', true);
          return;
        }

        var min = scope.$eval(attr.ngMin) || 0;
        if (value * 1 < min * 1) {
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
      scope.$watch(attr.ngMax, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });
      var maxValidator = function(value) {
        //如果值为'空',设置验证通过,
        //对于空值的验证应该使用required
        if (ctrl.$isEmpty(value)) {
          ctrl.$setValidity('max', true);
          return;
        }

        var max = scope.$eval(attr.ngMax);

        max = max || (max === 0 ? 0 : Infinity);

        if (value * 1 > max * 1) {
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
      scope.$watch(attr.maxTime, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });
      var maxTimeValidator = function(value) {
        //如果值为'空',设置验证通过,
        //对于空值的验证应该使用required
        if (ctrl.$isEmpty(value)) {
          ctrl.$setValidity('maxTime', true);
          return;
        }

        var maxTime, time;
        try {
          maxTime = scope.$eval(attr.maxTime);
          if (angular.isString(maxTime)) maxTime = Date.parse(maxTime.replace(/-/g, '/'));
          else if (angular.isDate(maxTime)) maxTime = maxTime.getTime();
        } catch (e) {
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
      scope.$watch(attr.minTime, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });
      var minTimeValidator = function(value) {
        //如果值为'空',设置验证通过,
        //对于空值的验证应该使用required
        if (ctrl.$isEmpty(value)) {
          ctrl.$setValidity('minTime', true);
          return;
        }

        var minTime, time;
        try {
          minTime = scope.$eval(attr.minTime);
          if (angular.isString(minTime)) minTime = Date.parse(minTime.replace(/-/g, '/'));
          else if (angular.isDate(minTime)) minTime = minTime.getTime();
        } catch (e) {
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


// 是否组织机构代码
function isOrgCode(value) {
  var ws = [3, 7, 9, 10, 5, 8, 4, 2];
  var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var orgCodereg = /^([0-9A-Z]){8}-[0-9|X]$/;
  if (!value || value.length !== 10 || !orgCodereg.test(value)) {
    return false;
  }
  var sum = 0;
  for (var i = 0; i < 8; i++) {
    sum += str.indexOf(value.charAt(i)) * ws[i];
  }
  var c9 = 11 - sum % 11;
  c9 = c9 == 10 ? 'X' : c9;
  c9 = c9 == 11 ? '0' : c9;
  return c9 == value.charAt(9);
}

// 是否统一社会信用代码
function isSocialCreditCode(value) {
  if (!value || value.length !== 18) {
    return false;
  }

  var Ancode; //统一社会信用代码的每一个值
  var Ancodevalue; //统一社会信用代码每一个值的权重
  var total = 0;
  var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; //加权因子
  var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
  //不用I、O、S、V、Z
  for (var i = 0; i < value.length - 1; i++) {
    Ancode = value.substring(i, i + 1);
    Ancodevalue = str.indexOf(Ancode);
    total = total + Ancodevalue * weightedfactors[i];
    //权重与加权因子相乘之和
  }
  var logiccheckcode = 31 - total % 31;
  if (logiccheckcode === 31) {
    logiccheckcode = 0;
  }
  var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y';
  var Array_Str = Str.split(',');
  logiccheckcode = Array_Str[logiccheckcode];
  var checkcode = value.substring(17, 18);
  return logiccheckcode == checkcode;
}

/**
 * 统一社会信用代码(SocialCreditCode)
 */
verify.directive('sccValidity', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attr, ctrl) {
      if (!ctrl) return;

      scope.$watch(attr.sccValidity, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });

      var sccValidity = function(value) {
        if (!value) {
          ctrl.$setValidity('sccValidity', true);
          return;
        }
        ctrl.$setValidity('sccValidity', isSocialCreditCode(value));
        return value;
      };

      ctrl.$formatters.push(sccValidity);
      ctrl.$parsers.unshift(sccValidity);
    }
  };
});

/**
 * 统一社会信用代码(SocialCreditCode) 或 组织机构代码(orgCode) 效验
 */
verify.directive('sccOrOcValidity', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attr, ctrl) {
      if (!ctrl) return;

      scope.$watch(attr.sccOrOcValidity, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });

      var sccOrOcValidity = function(value) {
        if (!value) {
          ctrl.$setValidity('sccOrOcValidity', true);
          return;
        }
        ctrl.$setValidity('sccOrOcValidity', isSocialCreditCode(value) || isOrgCode(value));
        return value;
      };

      ctrl.$formatters.push(sccOrOcValidity);
      ctrl.$parsers.unshift(sccOrOcValidity);
    }
  };
});

/**
 * 身份证验证
 */
verify.directive('identityValidity', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attr, ctrl) {
      if (!ctrl) return;

      scope.$watch(attr.identityValidity, function(newValue, oldValue) {
        if (newValue !== oldValue) ctrl.$setViewValue(ctrl.$viewValue);
      });

      var identityValidator = function(value) {
        if (!value) {
          ctrl.$setValidity('identityValidity', true);
          return value;
        }

        var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

        var identityReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!identityReg.test(value)) {
          ctrl.$setValidity('identityValidity', false);
          return value;
        }

        var idCardWiSum = 0;
        for (var i = 0; i < 17; i++) {
          idCardWiSum += value[i] * idCardWi[i];
        }
        var idCardMod = idCardWiSum % 11;
        var idCardLast = value[17];
        if (idCardMod == 2) {
          if (idCardLast.toLowerCase() === 'x') {
            ctrl.$setValidity('identityValidity', true);
          } else {
            ctrl.$setValidity('identityValidity', false);
          }
        } else {
          if (idCardLast * 1 === idCardY[idCardMod]) {
            ctrl.$setValidity('identityValidity', true);
          } else {
            ctrl.$setValidity('identityValidity', false);
          }
        }

        return value;
      };

      ctrl.$formatters.push(identityValidator);
      ctrl.$parsers.unshift(identityValidator);
    }
  };
});

//angular的验证是由form 指令和ngModel协调完成的。
//当验证控件没有没有name属性这是不会被form捕获的。或者是你希望在ngRepeat中使用动态表达式
//ngModel的$name属性并不支持表达式计算。
//dy-name的解决此问题，其会在post link阶段解析表达式，并把自己注册到父form controller。
//详见: http://www.ngnice.com/posts/81c1eb92bfbde0
verify.directive('dyName', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, iAttrs, ngModelCtr) {
      ngModelCtr.$name = scope.$eval(iAttrs.dyName);
      var formController = elm.controller('form') || {
        $addControl: angular.noop
      };
      formController.$addControl(ngModelCtr);
      //fix noVerify bug
      scope.$evalAsync(function() {
        ngModelCtr.$setViewValue(ngModelCtr.$viewValue);
      });

      scope.$on('$destroy', function() {
        formController.$removeControl(ngModelCtr);
      });
    }
  };
});

//<form show-one> 同一时刻只显示一个ngMessages
verify.directive('showOne', [
  '$window',
  '$timeout',
  '$rootScope',
  function($window, $timeout, $rootScope) {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        function($scope) {
          var meaasges = [];
          if (!meaasges.indexOf) {
            Array.prototype.indexOf = function(e) {
              for (var i = 0; i < this.length; ++i) {
                if (this[i] == e) return i;
              }
              return -1;
            };
          }

          var adjust = null;
          function adjustPosition() {
            $timeout.cancel(adjust);
            adjust = $timeout(function() {
              try {
                $rootScope.$broadcast('verfiyAdjust');
              } catch (e) {
                try {
                  $(window.top).resize();
                } catch (e) {
                  $(window).resize();
                }
              }
            }, 40);
          }

          this.addMessage = function(elem) {
            //初始化为隐藏
            elem.css('display', 'none');

            //计算插入位置, 解决动态增加ng-messages的问题
            //如果没找到对应的元素, 插入到末尾
            var insertTo = null;
            var allElem = angular.element('[ng-messages]');
            for (var i = allElem.length - 1; i >= 0; --i) {
              if (elem.attr('ng-messages') == allElem.eq(i).attr('ng-messages')) {
                insertTo = i;
                break;
              }
            }
            adjustPosition();
            if(typeof insertTo === 'number')
               meaasges.splice(insertTo, 0, elem);
            else
              meaasges.push(elem);
          };

          this.delMessage = function(elem) {
            meaasges.splice(meaasges.indexOf(elem), 1);
            if (meaasges.length === 0) showIndex = 0;
            else this.showIndexNext(elem);
          };

          var showIndex = 0;

          function show(index) {
            for (var i = meaasges.length - 1; i >= 0; --i) {
              if (index === i) {
                meaasges[i].fadeIn(250);
                meaasges[i].css('visibility', 'visible');
              } else {
                meaasges[i].css({ display: 'none', visibility: 'hidden' });
              }
            }
          }

          this.tryShow = function(elem) {
            var index = meaasges.indexOf(elem);
            if (index <= showIndex) {
              show((showIndex = index));
            }
          };

          this.showIndexNext = function(elem) {
            var index = meaasges.indexOf(elem);
            if (index <= showIndex) {
              showIndex = Math.min(index + 1, meaasges.length - 1);
              var length = meaasges.length;
              while (showIndex < length) {
                if (meaasges[showIndex].data('$valid')) ++showIndex;
                else break;
              }
              show(showIndex);
            }
          };
        }
      ]
    };
  }
]);

//自动计算ngMessages 的 position
verify.directive('ngMessages', [
  '$window',
  '$timeout',
  function($window, $timeout) {
    return {
      restrict: 'EA',
      require: '?^showOne',
      link: function(scope, elem, attr, showOne) {
        var position = attr['position'];
        if (position == 'right') elem.addClass('right');

        var _offset,
          offset = { top: 0, left: 0 };
        if (attr['offset']) {
          _offset = attr['offset'].split(',');
          offset.top = parseInt(_offset[0]) || 0;
          offset.left = parseInt(_offset[1]) || 0;
        }

        var width = parseInt(attr['width']) || 'auto';

        function adjust() {
          var input = elem.prevAll('input,textarea,select').first();
          if (input.length > 0) {
            if (input.attr('type') == 'radio' || input.attr('type') == 'checkbox') {
              elem.css({
                left: input.position().left - 39 + offset.left + 'px',
                top: input.position().top + input.outerHeight() + 10 + offset.top + 'px',
                width: width
              });
            } else {
              if (position == 'right') {
                elem.css({
                  left: input.position().left + input.outerWidth() + 10 + offset.left + 'px',
                  top: input.position().top + offset.top + 'px',
                  width: width
                });
              } else {
                elem.css({
                  left: input.position().left + offset.left + 'px',
                  top: input.position().top + input.outerHeight() + 5 + offset.top + 'px',
                  width: width
                });
              }
            }
          }
        }

        $timeout(function() {
          adjust();
        });

       function bindResize() {
          try {
            $($window.top).on('resize', adjust);
          } catch (e) {
            $($window).on('resize', adjust);
          }
        }
        bindResize();

        function unbindResize() {
          try {
            $($window.top).off('resize', adjust);
          } catch (e) {
            $($window).off('resize', adjust);
          }
        }

        window.addEventListener('unload', unbindResize);
        elem.bind('$destroy', unbindResize);

        scope.$on('verfiyAdjust', function() {
          $timeout(function() {
            adjust();
          });
        });

        if (showOne) {
          showOne.addMessage(elem);

          scope.$watch(attr.ngMessages.replace('$error', '$valid'), function(value) {
            if (value) showOne.showIndexNext(elem.data('$valid', true));
            else showOne.tryShow(elem.data('$valid', false));
          });

          elem.bind('$destroy', function() {
            showOne.delMessage(elem);
          });
        }
      }
    };
  }
]);

verify.directive('noVerify', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: -1000,
    link: function(scope, elem, attr, ngModel) {
      if (!ngModel) {
        if (console) console.error("noVerify can't find ngModel");
        return;
      }

      if (attr.noVerify) {
        scope.$watch(attr.noVerify, function(newValue, oldValue) {
          if (newValue !== oldValue) ngModel.$setViewValue(ngModel.$viewValue);
        });
      }

      var noVerify = function(value) {
        if ((attr.noVerify === '' || scope.$eval(attr.noVerify)) && ngModel.$error) {
          for (var key in ngModel.$error) {
            if (ngModel.$error.hasOwnProperty(key)) {
              ngModel.$setValidity(key, true);
            }
          }
        }
        return value;
      };

      ngModel.$formatters.unshift(noVerify);
      ngModel.$parsers.push(noVerify);
    }
  };
});

$(function() {
  if (top.$.blockUI) {
    top.$.blockUI.defaults.onBlock = function() {
      try {
        angular
          .element('.blockMsg')
          .injector()
          .invoke([
            '$rootScope',
            function($rootScope) {
              $rootScope.$broadcast('verfiyAdjust');
            }
          ]);
      } catch (e) {
        try {
          $(window.top).resize();
        } catch (e) {
          $(window).resize();
        }
      }
    };
  }
});
