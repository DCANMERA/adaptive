(function flexible(window, document) {
  var docEl = document.documentElement;

  // 设备像素比
  var dpr = window.devicePixelRatio || 1;

  /**
   * @param {object} obj 为要绑定事件的元素
   * @param {Function} ev 为要绑定的事件,不带on
   * @param {Function} fn 为绑定事件的函数
   * @author : DCanmera
   * @since : 创建时间  2021-02-06
   * */

  function addEvent(obj, ev, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(ev, fn, false);
    } else if (obj.attachEvent) {
      obj[ev + fn] = function () {
        fn.call(obj);
      }
      obj.attachEvent("on" + ev, obj[ev + fn]);
    } else {
      obj['on' + type] = fn;
    }
  }

  // 设置body元素字体大小：监听DOM内容是否加载完毕，完毕后给body设置字体大小
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      addEvent(document, "DOMContentLoaded", setBodyFontSize)
    }
  }

  setBodyFontSize();

  // 更改根元素字体大小：设置根元素字体大小为屏幕的十分之一
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // 监听屏幕大小：监听屏幕大小的变化，有变化调用更改根元素字体大小函数
  addEvent(window, "resize", setRemUnit);
  addEvent(window, "pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }

})(window, document);
