;
(function($) {
    var PageSwitch = function(element, options) {
        this.defaults = {
            selectors: {
                sections: '.sections',
                section: '.section',
                pages: '.pages',
                active: '.active'
            },
            index: 0,
            direction: 'vertical',
            loop: true,
            keyboard: true
        };

        this.settings = $.extend(true, {}, this.defaults, options || {});
        this.$element = element;

        this.init();
    };

    PageSwitch.prototype = {
        init: function() {
            this.$sections = this.$element.find(this.settings.selectors.sections);
            this.$section = this.$sections.find(this.settings.selectors.section);
            this.$pages = this.$element.find(this.settings.selectors.pages);
            this.index = this.settings.index;
            this.direction = this.settings.direction == 'vertical' ? true : false;
            this.keyboard = this.settings.keyboard;
            this.loop = this.settings.loop;

            // 能否切换的标志位，防止操作过于频繁
            this.canScroll = true;

            if (!this.direction) {
                this.$sections.css('width', this.$section.length * 100 + '%');
                this.$section.css({
                    width: (1 / this.$section.length * 100).toFixed(2) + '%',
                    float: 'left'
                });
            }

            this.initEvent();
            console.log(this);
        },

        prev: function() {
            if (this.index > 0) {
                this.index--;
            } else if (this.loop) {
                this.index = this.$section.length - 1;
            }
            this.scrocllPage(this.index);
        },

        next: function() {
            if (this.index < this.$section.length - 1) {
                this.index++;
            } else if (this.loop) {
                this.index = 0;
            }
            this.scrocllPage(this.index);
        },

        scrocllPage: function(index) {
            this.canScroll = false;

            var self = this;
            var pos = this.$section.eq(index).position();
            console.log('canScroll=' + this.canScroll + ',index=' + this.index + ',top:' + pos.top + ', left:' + pos.left);
            var animateCss = this.direction ? {
                top: -pos.top
            } : {
                left: -pos.left
            };
            this.$sections.animate(animateCss, 500, function() {
                self.canScroll = true;
            });

        },
        initEvent: function() {
            var self = this;
            $(window).on('mousewheel DOMMouseScroll', function(e) {
                console.log('wheelDelta=' + e.wheelDelta + ', detail=' + e.detail);
            });

            if (this.keyboard) {
                $(window).on('keydown', function(e) {
                    var keyCode = e.keyCode;
                    if (self.canScroll) {
                        console.log('canScroll=' + self.canScroll + ',keyCode=' + keyCode);
                        if (keyCode == 37 || keyCode == 38) {
                            self.prev();
                        } else if (keyCode == 39 || keyCode == 40) {
                            self.next();
                        }
                    }
                });
            }
        }
    };


    $.fn.PageSwitch = function(options) {
        var pageSwitch = new PageSwitch(this, options);
    };
})(jQuery);
