$().ready(function(){
    //轮播图
    $(".imgbox").banner({
        aimg:$(".imgbox").find("img"),			//必传
		left:$(".banner-core").find(".btn-left"),		//可选,传了有功能，不传没有功能
		right:$(".banner-core").find(".btn-right"),		//可选,传了有功能，不传没有功能
        isList:true,			//可选，默认为true
        autoPlay:true,			//可选，默认为true
        delayTime:3000,			//可选，默认为2000
        moveTime:300,			//可选，默认为200
        index:0
                    })
    //鼠标移入效果
    $(".goods-cart").on("mouseover",function(){
        $(this).css({borderColor:"#3a9901"}).children("i").css({backgroundPosition:"0 -34px"}).siblings(".cart-info").show();
    })
    $(".goods-cart").on("mouseout",function(){
        $(this).css({borderColor:"#fff"}).children("i").css({backgroundPosition:"0 -40px"}).siblings(".cart-info").hide();
    })
    $(".bank").on("mouseover",function(){
        $(this).css({borderColor:"#3a9901",borderBottom:"0",background:"#fff",boxSizing:"border-box"}).children(".myacount").css({
            border:"1px solid #3a9901"
        }).show();
    })
    $(".bank").on("mouseout",function(){
        $(this).css({borderColor:"#f5f5f5",background:"#f5f5f5",}).children(".myacount").hide();
    })
    $(".service").on("mouseover",function(){
        $(this).css({borderColor:"#3a9901",borderBottom:"0",background:"#fff",boxSizing:"border-box"}).children(".user-service").show();
    })
    $(".service").on("mouseout",function(){
        $(this).css({borderColor:"#f5f5f5",background:"#f5f5f5"}).children(".user-service").css({border:"1px solid #3a9901",borderTop:"0"}).hide();
    })

    //登录成功后实现购物车跳转
    var info = localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : [];
    console.log(info);
    if(info){
        for(var i = 0;i < info.length;i++){
            if(info[i].tag == 1){
                $(".jumpTcart").on("click",function(){
                    window.location.href = "http://localhost/woMai/cart.html";
                })
                count();
                $(".cancel").on("click",function(){
                    $(".cout").html(0);
                    $(".msg").html(0);
                    $(".login").show();
                    $(".login").prev("span").html("您还没有登录");
                    $(".cancel").hide();
                    for(var j = 0;j < info.length; j++){
                        info[j].tag = 0;
                    }
                    localStorage.setItem("info",JSON.stringify(info));
                })
            }else{
                $(".cout").html(0);
                $(".msg").html(0);
            }
        }
    }
    function count(){
        var goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
        var sum = 0;
        for(var i = 0;i < goods.length;i++){
            sum += goods[i].num;
        }
        console.log(sum);
        $(".cout").html(sum);
        $(".msg").html(sum);
        $(".login").hide();
        $(".login").prev("span").html("您已登录");
        $(".cancel").show();
    }
    //推荐区效果
    $(".advice>ul>li>a>img").on("mouseover",function(){
        // console.log(1);
        $(this).stop().animate({
            left:-10
        })
    })
    $(".advice>ul>li>a>img").on("mouseout",function(){
        // console.log(1);
        $(this).stop().animate({
            left:0
        })
    })
    //我的推荐切换切换推荐目录
    $(".advice-left").on("click",function(){
        if($(".advice>ul").position().left == 0){
            // console.log(1);
            $(".advice>ul").stop().animate({left:-1210});
        }else{
            $(".advice>ul").stop().animate({left:0});
        }
    })
    $(".advice-right").on("click",function(){
        if($(".advice>ul").position().left == -1210){
            $(".advice>ul").stop().animate({left:0});
        }else{
            $(".advice>ul").stop().animate({left:-1210});
        }
    })
    $(".jb-left").on("click",function(){
        if($(".jb").position().left == 0){
            // console.log(1);
            $(".jb").stop().animate({left:-952});
        }else{
            $(".jb").stop().animate({left:0});
        }
    })
    $(".jb-right").on("click",function(){
        if($(".jb").position().left == -952){
            $(".jb").stop().animate({left:0});
        }else{
            $(".jb").stop().animate({left:-952});
        }
    })
    $(".advice,.jb-box").hover(function(){
        $(this).children("div").show();
    },function(){
        $(this).children("div").hide();
    })
    var floorIndex = 0; 
    //鼠标滚动事件,包括楼层菜单和顶部搜索框的显示和隐藏
    document.onscroll = function(){
        var st = document.documentElement.scrollTop;
        if(st >= $(".jinbao").offset().top){
            $("#top-fix").show();
        }else{
            $("#top-fix").hide();
        }
        if(st >= $(".special").offset().top){
            $(".goods-floor").show();
        }else{
            $(".goods-floor").hide();
        }
        var sltop = $("html").scrollTop();
        $(".first-floor").each(function(index,domEle){
            if(sltop >= $(domEle).offset().top){
                $(".goods-floor>ul").children("li").eq(index).addClass("visited").siblings().removeClass("visited");
            }
        })
    }
    
    //楼层效果
    $(".goods-floor>ul").children("li").click(function(){
        var index = $(this).index();
        var iNowFloor = $(".first-floor").eq(index);
        var t = iNowFloor.offset().top;
        $("html").scrollTop(t);
        $(this).addClass("visited").siblings().removeClass("visited");   
    })

    //商品渲染
    class goodList{
        constructor(){
            this.url = "http://localhost/woMai/data/goods.json";
            this.hotUrl = "http://localhost/woMai/data/hot-goods.json";
            this.jinbaoUrl = "http://localhost/woMai/data/jinbao-goods.json";
            this.init();
        }
        init(){
            this.getDate();
        }
        getDate(){
            var that = this;
            $.ajax({
                url:this.url,
                type:"post",
                success:function(res){
                    // console.log(res);
                    that.res = res;
                    that.display();
                }
            })
            $.ajax({
                url:this.hotUrl,
                type:"post",
                success:function(res){
                    // console.log(res);
                    that.hotRes = res;
                    that.displayHot();
                }
            })
            $.ajax({
                url:this.jinbaoUrl,
                type:"post",
                success:function(res){
                    // console.log(res);
                    that.jbRes = res;
                    that.displayJB();
                }
            })
        }
        //劲爆区商品
        displayJB(){
            var str = "";
            for(var i = 0;i<this.jbRes.length;i++){
                str +=  `
                    <li>
                        <div class="top valign">
                            <a href="detail.html?goodsId=${this.jbRes[i].id}"} class="d-block"><img src="${this.jbRes[i].src}" alt=""></a>
                        </div>
                        <div class="down">
                            <p class="goods-name"><a href="detail.html?goodsId=${this.jbRes[i].id}">${this.jbRes[i].name}</a></p>
                            <p class="goods-heavy">${this.jbRes[i].tip}</p>
                            <p class="goods-price"><span>￥${this.jbRes[i].price}</span><a href="detail.html?goodsId = ${this.jbRes[i].id}"><input type="button" value="去看看" class="border-0"></a></p>
                        </div>
                    </li>
                `;
            }
            $(".jb").html(str);
        }
        //精选区
        display(){
            var str = "";
            for(var i = 0;i<this.res.length;i++){
                str += `<li>
                            <div class="goods-img">
                                <a href="detail.html?goodsId=${this.res[i].id}">
                                    <img src="${this.res[i].src}" alt="${this.res[i].name}">
                                </a>
                            </div>
                            <p><a href="detail.html?goodsId=${this.res[i].id}">${this.res[i].name}</a></p>
                            <span>￥${this.res[i].price}</span>
                     </li>`;
                }
            $(".sale-goods>ul.tuijian").html(str);
            this.imgMove();
            console.log($(".sale-goods").length);
           for(var i = 0;i < $(".sale-goods").length;i++){
               $(".sale-goods").eq(i).children("ul").first().children("li").first().after(this.createBanner()); 
           }  
            
        }
        createBanner(){
                var img1 = document.createElement("img");
                var img2 = document.createElement("img");
                img1.src = "./img/floor-banner.jpg";
                img2.src = "./img/floor-banner2.jpg";
                var btn1 = document.createElement("div");
                btn1.className = "btn-left";
                btn1.innerHTML = "&lt;"; 
                var btn2 = document.createElement("div");
                btn2.className = "btn-right";
                btn2.innerHTML = "&gt";
                btn1.style.cssText = `width:28px;position:absolute;left:0;top:0;bottom:0;height:62px;background:rgb(200,200,200,.5);z-index:9999;margin:auto;color:#fff;font:400 22px/62px "宋体";text-align:center;display:none;`; 
                btn2.style.cssText = `width:28px;position:absolute;right:0;top:0;bottom:0;height:62px;background:rgb(200,200,200,.5);z-index:9999;margin:auto;color:#fff;font:400 22px/62px "宋体";text-align:center;display:none;`; 
                img1.style.cssText = `width:484px;padding:0;position:absolute;top:0;left:0;height:253px;`;
                img2.style.cssText = `width:484px;padding:0;position:absolute;top:0;left:0;height:253px;`;
                var li = document.createElement("li");
                li.className = "floor-banner";
                li.style.cssText = `width:484px;padding:0;position:relative;height:254px;border-right:1px solid #ededed;border-bottom:1px solid #ededed;overflow:hidden;`;
                li.appendChild(btn1);
                li.appendChild(btn2);
                li.appendChild(img1);
                li.appendChild(img2);
                this.floorBanner();
            return li;
        }
        floorBanner(){
            $(".floor-banner").banner({
                aimg:$(".floor-banner").find("img"),			//必传
                left:$(".floor-banner").find(".btn-left"),		//可选,传了有功能，不传没有功能
                right:$(".floor-banner").find(".btn-right"),		//可选,传了有功能，不传没有功能
                isList:true,			//可选，默认为true
                autoPlay:true,			//可选，默认为true
                delayTime:3000,			//可选，默认为2000
                moveTime:300,			//可选，默认为200
                index:0
            })
        }
        //热卖区商品渲染
        displayHot(){
            var str = "";
            for(var i = 0;i<this.hotRes.length;i++){
                str += `<li>
                            <div class="goods-img">
                                <a href="detail.html?goodsId=${this.hotRes[i].id}">
                                    <img src="${this.hotRes[i].src}" alt="${this.hotRes[i].name}">
                                </a>
                            </div>
                            <p><a href="detail.html?goodsId=${this.hotRes[i].id}">${this.hotRes[i].name}</a></p>
                            <span>￥${this.hotRes[i].price}</span>
                     </li>`;
                }
            $(".sale-goods>ul.hot").html(str);
            this.imgMove();
        }
        imgMove(){
            $(".goods-img>a>img").hover(function(){
                $(this).stop().animate({
                    left:10
                },300)
            },
            function(){
                $(this).stop().animate({
                    left:0
                },300)
            })
        }
    }
    new goodList();
})