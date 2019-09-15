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


class List{
    constructor(){
        this.url = "http://localhost/woMai/data/list.json";
        this.index = 0;
        this.init();
    }
    init(){
        this.getData();
        this.addEvent();
    }
    getData(){
        var that = this;
        $.ajax({
            url:this.url,
            type:"get",
            success:function(res){
                // console.log(res);
                that.res = res;
                that.display();
            }
        })
    }
    addEvent(){
        var that = this;
        $(".page").on("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className.includes("left")){
                console.log(target);
                that.computeIndex(1);
            }
            if(target.className.includes("right")){
            console.log(target);
            //计算索引
            that.computeIndex(2); 
        }
        if(target.className.includes("changePage")){
            that.index = target.innerHTML - 1;
            that.active();
            that.display();
        }
    })
    }
        
    computeIndex(type){
        if(type == 1){
            if(this.index == 0){
                this.index = this.pageNum - 1;
            }else{
                this.index --;
            }
        }else{
            if(this.index == this.pageNum - 1){
                this.index = 0;
            }else{
                this.index ++;
            }
        }
        this.active();
        this.display();
    }
    active(){
        for(var i = 0;i<this.ali.length;i++){
            this.ali[i].style.color = "skyblue";
        }
        this.ali[this.index].style.color = "red";
    }
    display(){
        var str = "";
        console.log(this.res);
        for(var i = this.index * 15;i<this.index * 15 + 15;i++){
            // for(var i = 0;i < this.res.length;i++){
            str +=  `
                <li>
                    <div class="top valign">
                        <a href="detail.html?goodsId=${this.res[i].id}"} class="d-block"><img src="${this.res[i].src}" alt=""></a>
                    </div>
                    <div class="down">
                        <p class="goods-name"><a href="detail.html?goodsId=${this.res[i].id}">${this.res[i].name}</a></p>
                        <p class="goods-heavy">${this.res[i].tip}</p>
                        <p class="goods-price"><span>￥${this.res[i].price}</span><a href="detail.html?goodsId = ${this.res[i].id}"><input type="button" value="去看看" class="border-0"></a></p>
                    </div>
                </li>
            `;
        }
        $(".list").html(str);
        this.displayPage();
    }
    displayPage(){
        this.pageNum = Math.ceil(this.res.length / 15);
        var sli = "";
        for(var i = 0;i < this.pageNum;i++){
            sli += `<li class="page-item"><a class="page-link changePage">${i+1}</a></li>`;
        }
        $(".page").html(`<li class="page-item"><a class="page-link left">上一页</a></li>${sli}<li class="page-item"><a class="page-link right">下一页</a></li>`);
        this.ali = document.querySelectorAll(".changePage");
        this.active();
    }
}
new List();