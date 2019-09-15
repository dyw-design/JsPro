$(function(){
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //接收URL中的参数booksId
    var id = getUrlParam('goodsId');
    var url = "http://localhost/woMai/data/goods.json";
    var hotUrl = "http://localhost/woMai/data/hot-goods.json";
    var jbUrl = "http://localhost/woMai/data/jinbao-goods.json";
    // console.log(typeof id);
    function getDate(url){
        $.ajax({
            type:'get',
            url:url,
            success:function(res){
                display(res);   
            }
        })
    }
    
    if(id < 10 && id > 0){
        getDate(url);
    } 
    if(id < 20 && id >= 10){
        getDate(hotUrl);
    }
    if(id >= 20){
        getDate(jbUrl);
    }
    function display(res){
        console.log(res);
        var str = "";
        for(var i = 0;i < res.length;i++){
            if(id == res[i].id){
                str = `<div class="left float-left">
                <div id = "sbox">
                    <img src="${res[i].src}" alt="">
                    <span class="mspan"></span>
                    <p></p>
                </div>
                <div id = "bbox">
                    <img src="${res[i].src}" alt="">
                </div>
            </div>
            <div class="right float-left">
                <h3><b>自营</b>${res[i].name}</h3>
                <div class="content">
                    <div class="price"><i>￥</i><span>${res[i].price}</span><b>零售价</b></div>
                    <div class="advertise">
                        <s>加购价</s><a href="#">【冲饮换购】购买食品类商品可参加饮品</a>
                    </div>
                </div>
                <div class="count clear"><span>数量:</span>
                    <ul>
                        <li class="red">-</li>
                        <li><span class="num">1</span></li>
                        <li class="add">+</li>
                    </ul>
                </div>
                <input type="button" value="加入购物车" id="addcart">
            </div>`;
            }
        }
        $(".sp").html(str);
        var m = new Magnifier();
        m.init();
        sumcount();
        new AddCart(id,res);
    }
    function sumcount(){
        $(".count>ul>li").css({cursor:"pointer"});
        var number = parseInt($(".num").html());
        $(".red").on("click",function(){
            console.log(1);
            if(number == 1){
                console.log(123);
                number = 1; 
            }else{
                number --;
            }
            $(".num").html(number);
        })
        $(".add").on("click",function(){
            console.log(2);
            number ++;
            $(".num").html(number);
        })
    }
    class Magnifier{
        //获取元素
        constructor(){
            this.sbox = document.querySelector('#sbox');
            this.bbox = document.querySelector('#bbox');
            this.span = document.querySelector('.mspan');
            this.simg = document.querySelector('#sbox img');
            this.bimg = document.querySelector('#bbox img');
            // console.log(this.bimg.offsetHeight);
            this.addEvent();
        }
        init(){
            //进行初始化
            //给span设置等比例宽高
            var w = this.bimg.offsetWidth/this.bbox.offsetWidth; 
            this.span.style.width = this.sbox.offsetWidth/w + "px";
            var h = this.bimg.offsetHeight/this.bbox.offsetHeight; 
            this.span.style.height = this.sbox.offsetHeight/h + 'px';
        }
        addEvent(){
            //绑定事件
            //使用监听
            //进入
            var that = this;
            this.sbox.addEventListener("mouseover",function(){
                //进入
                that.over();
                that.init();
            });
            this.sbox.addEventListener("mousemove",function(eve){
                //移动
                var e = eve || window.event;
                that.move(e);
            });
            this.sbox.addEventListener("mouseout",function(){
                //移出
                that.out();
            });
        }
        over(){
            this.span.style.display = 'block';
            this.bbox.style.display = 'block';
        }
        move(e){
            // console.log(this.sbox.offsetLeft);
            // console.log(this.sbox.offsetTop);
            var l = e.offsetX - this.span.offsetWidth/2 ;
            var t = e.offsetY - this.span.offsetHeight/2;
            if(l < 0) l = 0;
            if(t < 0) t = 0;
            if(l > this.sbox.offsetWidth-this.span.offsetWidth){
                l = this.sbox.offsetWidth-this.span.offsetWidth;
            };
            // console.log(this.sbox.offsetHeight,this.span.offsetHeight);
            if(t > this.sbox.offsetHeight - this.span.offsetHeight){
                t = this.sbox.offsetHeight - this.span.offsetHeight;
            };
            this.span.style.left = l + 'px';  
            this.span.style.top = t + 'px';

            var x = l/(this.sbox.offsetWidth - this.span.offsetWidth);
            var y = t/(this.sbox.offsetHeight - this.span.offsetHeight);
            //计算右侧图片的移动位置
    
            this.bimg.style.left = x * (this.bbox.offsetWidth - this.bimg.offsetWidth) + "px";
            this.bimg.style.top = y * (this.bbox.offsetHeight - this.bimg.offsetHeight) + "px";
        }
        out(){
            this.span.style.display = 'none';
            this.bbox.style.display = 'none';
        }
    }
    class AddCart{
        constructor(id,res){
            this.addbtn = document.querySelector("#addcart");
            // this.url = "http://localhost/woMai/data/goods.json";
            this.id = id;
            this.res = res;
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.addbtn.onclick = function(eve){
             that.addCart();
            }
        }
        addCart(){
            this.goods = localStorage.getItem("goods");
            if(this.goods){
                this.goods = JSON.parse(this.goods);
                var firstAdd = 0;
                for(var i = 0;i<this.goods.length;i++){
                    if(this.goods[i].id == this.id){
                        this.goods[i].num += parseInt($(".num").html());
                        firstAdd = 1; 
                    }
                }
                if(firstAdd == 0){
                    this.goods.push({
                        id:this.id,
                        num:parseInt($(".num").html())
                    });
                }
            }else{
                this.goods = [{
                    id:this.id,
                    num:parseInt($(".num").html())
                }];
            }
            localStorage.setItem("goods",JSON.stringify(this.goods));
    }
    }
})
