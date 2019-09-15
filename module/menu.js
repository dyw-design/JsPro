define(()=>{
    class Menu{
        constructor(){
            this.ali = $(".banner-left>ul").children("li");
            this.type = 0;
            this.init();
        }
        init(){
            var that = this;
            this.ali.on("mouseover",function(){
                    $(this).addClass("menu-hover").children("a").css({color:"green"}).prev("i").css({
                        backgroundPosition:"-19px -3px"}).siblings(".menu-content").addClass("blur").parents().siblings().removeClass("menu-hover").children("a").css({color:"white"}).prev("i").css({backgroundPosition:"-1px -3px"}).siblings(".menu-content").removeClass("blur");
                    }
                )
            $(".banner-left>ul").on("mouseout",function(){
                that.ali.removeClass("menu-hover");
                $(".banner-left>ul>li>a").css({color:"white"}).prev("i").css({backgroundPosition:"-1px -3px"});
                $(".menu-content").removeClass("blur");
            })

            $(".banner-left>h3")[0].onclick = function(){
                if(that.type == 0){
                    $(".banner-left>ul").show();
                    that.type = 1;
                }else{
                    $(".banner-left>ul").hide();
                    that.type = 0;
                }
            }
        }
        }     
    return {
        menu:Menu
    }
})