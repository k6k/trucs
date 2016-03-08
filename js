(function(){

     this.BannerExpand = function(){            
        if(!this.isWrapperDefined())return;
        this.wrapper            = document.querySelector('[data-banner]');
        this.collapseWrapper    = null;
        this.expandWrapper      = null;
        this.closeButton        = null;
        this.closeButtonClicked = false;
        this.expanded           = false;        
        this.openAnimation      = null;        
        this.keyFramePrefix     = null;        
        this.providerUrl        = "http://dev.relatia.fr/banner/data.json";//http://smartbanners.r1a.eu/banner-api/
        this.bannerCode         = this.wrapper.getAttribute('data-banner');
        this.clientBannerProperties = {};
        this.getBannerProperties();
    };

    BannerExpand.prototype = {
        isWrapperDefined : function(){
            if(document.querySelector('[data-banner]')==null || document.querySelector('[data-banner]') ===undefined){
               return false;
            }else{
                return true;
            }
        },

        getBannerProperties : function () {
            var _ = this;
            var xhr = new XMLHttpRequest();
            clientProperties = null;
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                    _.clientBannerProperties = JSON.parse(xhr.responseText);
                    _.createBanner();
               }
            }
            //xhr.open('GET', this.providerUrl+this.bannerCode, true);
            xhr.open('GET', this.providerUrl, true);
            xhr.send(this.bannerCode);                
        },

        createBanner : function  (){                
            this.initializeBannerElements();
            this.wrapper.style.position = 'relative';
            this.wrapper.style.width = this.getWidthProperty();
            this.populateCollapseWrapper();
            this.attachElements();
            this.addContentEvent();
            this.createAnimationStyle();
            this.populateExpandWrapper();

        },

        initializeBannerElements : function(){        
            this.closeButton        = document.createElement('img');
            this.collapseWrapper    =  document.createElement('div');
            this.expandWrapper      = document.createElement('div');
                          
        },

        attachElements : function(){
            this.wrapper.appendChild(this.collapseWrapper);
            this.wrapper.appendChild(this.expandWrapper);
            this.expandWrapper.appendChild(this.closeButton);
        },

        addContentStyle : function(){
            return this.collapseWrapper.style.width = this.clientBannerProperties.collapseSize.width+'px';
        },

        addContentEvent : function (){
            var _ = this;
            this.addContentStyle();
            this.collapseWrapper.addEventListener('click',function(){
                _.expanded = true;
                _.showHideBannerFullScreen();
                _.populateCloseButton();
                _.closeButtonClicked = false;
            });                        
        },
        populateExpandWrapper : function(){
            var _ = this; 
            _.expandWrapper.style.display = 'none'; 
            _.expandWrapper.style.minHeight = '100%'; 
            _.expandWrapper.style.width = screen.width+'px';
            _.expandWrapper.style.position = 'fixed';
            _.expandWrapper.style.top = '0px';
            _.expandWrapper.style.left = '0px';
            _.expandWrapper.style.whiteSpace = 'nowrap';
            _.expandWrapper.style.textAlign = 'center';
            _.expandWrapper.style.verticalAlign = 'middle';
            _.expandWrapper.style.background = '#1A1A1A';
            _.expandWrapper.style.zIndex = '1999';
            _.expandWrapper.style.WebkitAnimation  = 'fadeIn 0.7s ease';
            _.expandWrapper.style.MozAnimation     = 'fadeIn 0.7s ease';
            _.expandWrapper.style.OAnimation       = 'fadeIn 0.7s ease';
            _.expandWrapper.style.animation        = 'fadeIn 0.7s ease';
            _.attachBannerToExpandWrapper();

        },
        populateCollapseWrapper : function(){
            var _ = this;
            var bannerCollapse =  document.createElement('img');
            bannerCollapse.setAttribute('src',_.clientBannerProperties.bannerProperties.backgroundCollapsed);
            bannerCollapse.style.maxWidth     = _.getWidthProperty();
            bannerCollapse.style.height    = 'auto';
            _.collapseWrapper.appendChild(bannerCollapse);
            
        },
        getBannerFullScreen : function(){
            var _ = this;
            var bannerFullSize = document.createElement('img');
            bannerFullSize.setAttribute('id','bannerFullSizeId');
            bannerFullSize.setAttribute('src',this.clientBannerProperties.bannerProperties.backgroundExpanded);
            bannerFullSize.style.maxWidth  = (screen.width - 20)+'px';
            bannerFullSize.style.marginTop = this.getBannerFullTopMargin()+'px';
            bannerFullSize.style.display   = 'inline-block';
            bannerFullSize.addEventListener('click',function(){
                window.open(_.clientBannerProperties.redirectUrl, '_target');
                    _.expanded = false;
                    _.showHideBannerFullScreen();
                    return false;
                });
            return bannerFullSize;
        },
        populateCloseButton : function(){            
            this.closeButton.setAttribute('src',this.clientBannerProperties.bannerProperties.closeButton);
            this.closeButton.setAttribute('id','banner-close');
            this.closeButton.style.position = 'absolute';
            this.closeButton.style.top      = this.getBannerFullTopMargin()+'px';
            this.closeButton.style.right    = this.getCloseBtnRightPosition()+20 +'px';
            this.closeButton.style.maxWidth = '100%';            
            this.addCloseButtonEvent();
        },
        addCloseButtonEvent : function(){
            var _ = this;
            this.closeButton.addEventListener('click',function(){
                _.expanded = false;
                _.showHideBannerFullScreen();
                _.closeButtonClicked = true;
            });                
        },
        showHideBannerFullScreen : function(){
            if(this.expanded){
                this.expandWrapper.style.display = 'block';
            }else{
                this.expandWrapper.style.display = 'none';
            }
        },
        isDefined : function(elementId){
            var element = document.getElementById(elementId);
            return (typeof(element)!== undefined && element !=null)? true : false;
        },
        attachBannerToExpandWrapper : function(){
            if(this.isDefined('bannerFullSizeId')){
                return this.expandWrapper.appendChild(document.getElementById('bannerFullSizeId'));
            }else{
                return this.expandWrapper.appendChild(this.getBannerFullScreen());
            }
        },
        
        getBannerMarginTop : function(){
            var height = screen.height;
            return (height - this.clientBannerProperties.expandedSize.height) / 2 ;
        },

        getBannerFullTopMargin : function(){
            var topMargin = (parseInt(screen.height) - parseInt(this.clientBannerProperties.expandedSize.height)) / 2;
            return (topMargin>0)? topMargin : 0;
        },

        getCloseBtnRightPosition : function(){
            var rightPosition = (parseInt(screen.width) - parseInt(this.clientBannerProperties.expandedSize.width)) / 2;
            return (rightPosition>0)? rightPosition : 0;
        },

        createAnimationStyle : function(){
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            this.getVendorPrefix();
            document.head.appendChild(style);
            style.sheet.insertRule(this.keyFramePrefix+' fadeIn { from {opacity:0; } to {opacity:1;}}', 0);
        },

        getVendorPrefix : function(){
            var vendorsPrefix = ['Webkit','Moz','O','ms','Khtml'];
            var prefix = '';
            var elem = document.createElement('div');
            for (var i = 0; i < vendorsPrefix.length; i++) {
                if(elem.style[vendorsPrefix[i]+'AnimationName'] !==undefined){
                    prefix = vendorsPrefix[i].toLowerCase();
                }
            };
            
            return this.keyFramePrefix = '@-'+prefix+'-keyframes ';
        },
        getWidthProperty : function(){
            var computedWidth = window.getComputedStyle(this.wrapper).width;
            var providedWidth = this.clientBannerProperties.collapseSize.width+'px';
            if(computedWidth<providedWidth){
                return computedWidth;
            }else{
                return providedWidth;
            }
        }
       
    };
    new BannerExpand();    
}());
