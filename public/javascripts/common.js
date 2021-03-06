(function (global, $, doc) {
    'use strict';
    var DEYU = function (options) {
        // this.eventsMap = {
        //     'click #goToTop': 'goToTop'
        // }
        this.goToTopBtn = $('#goToTop');
        this.signOut = $("#signOut")
        this.fixedTool = $('.fixedTool')
        this.scrollTrigger = 500 //px

        this.init();
    }
    DEYU.prototype.init = function () {
        this._fixedToolShow()
        this.goToTopBtn.click(this._goToTop)
        this.signOut.on('click', this._signOut)
    }
    // 返回顶部
    DEYU.prototype._goToTop = function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500)
        return false;
    }
    // 浮动工具栏滚动显示
    DEYU.prototype._fixedToolShow = function () {
        var _this = this;
        $(window).on('scroll', function () {
            if ($(window).scrollTop() < _this.scrollTrigger) {
                _this.fixedTool.hide();
            } else {
                _this.fixedTool.show()
            }
        })
    }
    // 退出登录
    DEYU.prototype._signOut = function(e) {
        $.ajax({
            url: '/signOut',
            type: 'POST',
            success: function(data) {
                global.location.href = '/login'
            },
            error: function(err) {
                console.log(err)
            }
        })
        return false;
    }
    global.DEYU = DEYU;

    $(function () {
        new DEYU();
    });
})(this, this.jQuery, this.jQuery(document))