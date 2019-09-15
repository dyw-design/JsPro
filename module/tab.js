define(()=>{
    class Tab{
        constructor(){
            this.ali = $(".banner-right-top>ul").children("li");
            // console.log(this.ali);
            this.div = $(".tab-content").children(".content");
            this.init();
        }
        init(){
            var that = this;
            this.ali.on("mouseover",function(){
                $(this).addClass("tab-hover").siblings().removeClass("tab-hover");
                that.div.eq($(this).index()).show().siblings().hide();
            })
            $(".tab1>li").on("mouseover",function(){
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(1)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(1)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(2)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(2)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(3)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(3)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(4)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(4)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(5)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(5)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(6)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(6)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(7)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(7)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(8)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(8)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(9)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(9)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
            $(".floor-top:eq(10)>ul>li").on("mouseover",function(){
                // console.log("tab2");
                $(this).css({borderBottom:"2px solid #a0befa"}).siblings().css("border","0");
                $(".sale-goods:eq(10)>ul").eq($(this).index()).show().siblings("ul").hide();
            })
        }
    }
    return {
        tab:Tab
    };
})