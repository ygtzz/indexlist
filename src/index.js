import assign from 'object-assign';

function IndexList(opts){
    opts = assign({
        container:'.indexc',
        indexc: '.indexs',
        navc: '.index-navs',
        indicator: '.index-indicator',
        navAttr: 'data-nav',
        threshold: 100
    }, opts);
    this.opts = opts;

    var self = this;
    self.opts.navSel = '[' + self.opts.navAttr + ']';
    self.container = document.querySelector(opts.container);
    self.indexc = document.querySelector(opts.indexc);
    self.navc = document.querySelector(opts.navc);
    self.indexTitles = Array.prototype.slice.call(self.indexc.querySelectorAll(opts.navSel) || []);
    self.navs = self.navc.querySelectorAll(opts.navSel);
    self.indexSections = self.indexTitles.map(function(item){
        return item.getBoundingClientRect().top - self.indexc.getBoundingClientRect().top;
    });
    self.indicator = document.querySelector(opts.indicator);
    self.threshold = opts.threshold;

    //注册scroll事件，在滚动时候显示中间的导航toast
    self.container.addEventListener('scroll',function(){
        self._changeIndicatorThrottle();
        self._showIndicatorDebounce(false);
    });
    //注册点击事件，在点击右侧导航时候显示相应的内容区域
    self.navc.addEventListener('click',function(e){
        var target = e.target;
        if(target.matches('.nav-item')){
            var dataNav = target.getAttribute(self.opts.navAttr),
                indexTitle = document.querySelector('['+ self.opts.navAttr +'='+dataNav+']');
            self.container.scrollTop = indexTitle.getBoundingClientRect().top - self.indexc.getBoundingClientRect().top;
        }
    });
}

IndexList.prototype._showIndicator = function(show){
    this.indicator.style.display = show ? 'inline-block' : 'none';
}
IndexList.prototype._showIndicatorDebounce = debounce(IndexList.prototype._showIndicator,1000);
IndexList.prototype._changeIndicator = function(){
    var scrollTop = this.container.scrollTop,
        indexSections = this.indexSections,
        len = indexSections.length,
        threshold = this.threshold,
        indicator = this.indicator,
        indexTitles = this.indexTitles,
        navAttr = this.opts.navAttr;
    this._showIndicator(true);
    for(var i=0;i<len;i++){
        if(scrollTop >= indexSections[len-1] - threshold){
            indicator.innerHTML = indexTitles[len-1].getAttribute(navAttr);
        }
        else if(indexSections[i] - threshold <= scrollTop  && scrollTop < indexSections[i+1] - threshold){
            indicator.innerHTML = indexTitles[i].getAttribute(navAttr);
        }
    }
}
IndexList.prototype._changeIndicatorThrottle = throttle(IndexList.prototype._changeIndicator,100);

function debounce(fn,delay){
    var timer;
    return function(){
        var ctx = this,args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(ctx,args);
        },delay);
    }
}

function throttle(fn,interval){
    var last = 0;
    return function(){
        var ctx = this,args = arguments,cur = +new Date();
        if(cur - last >= interval){
            fn.apply(ctx,args);
            cur = last;
        }
    }
}

export {IndexList}