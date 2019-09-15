class Cart{
    constructor(){
        this.tbody = document.querySelector("tbody");
        this.emp = document.querySelector("#empty");
        this.url = "http://localhost/woMai/data/goods.json";
        this.hotUrl = "http://localhost/woMai/data/hot-goods.json";
        this.jbUrl = "http://localhost/woMai/data/jinbao-goods.json";
        this.sum = document.querySelector("#sum span");
        this.isChecked = false;
        this.init();
        this.empty();
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.tbody.onclick = function(eve){
            var e = eve || window.event;
            var target = e.target || e .srcElement;
            if(target.className == "del"){
                that.id = target.parentNode.getAttribute("index");
                //删除节点值
                target.parentNode.remove();
                this.empty();
                //删除localstorage的值
                that.changeStorage(function(i){
                    that.goods.splice(i,1);
                });
            }
            if(target.className == "selected"){ 
                if(target.checked){
                    //多选框选中
                    that.sumPrice(target);
                }else{
                    //没选
                    //做其他操作  
                    that.reducePrice(target);
                }
            }else{
            }
        }
        this.tbody.oninput = function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "changeNum"){
                that.id = target.parentNode.parentNode.getAttribute("index");
                that.changeStorage(function(i){
                    that.goods[i].num = parseInt(target.value);
                });
                if(target.parentNode.parentNode.children[0].firstElementChild.checked){
                    that.sum.innerHTML = 0;
                    that.sumPrice(target);
                }
            }
        }
    }
    sumPrice(target){
        // console.log(this.goods);
        var count = parseInt(target.parentNode.parentNode.children[4].firstElementChild.value);
        var price = target.parentNode.parentNode.children[3].innerHTML;
        //console.log(parseFloat(price.slice(1,price.length)));
        price = parseInt(price.slice(1,price.length));
       var allPrice = parseFloat(price*count);
       this.sum.innerHTML = (parseInt(this.sum.innerHTML) + allPrice).toFixed(2);
    }

    reducePrice(target){
        var count = parseInt(target.parentNode.parentNode.children[4].firstElementChild.value);
        var price = target.parentNode.parentNode.children[3].innerHTML;
        price = parseInt(price.slice(1,price.length));
        var allPrice = parseInt(price*count);
        this.sum.innerHTML = (parseInt(this.sum.innerHTML) - allPrice).toFixed(2);
    }

    changeStorage(callback){
        for(var i = 0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                callback(i);
            }
        }
        localStorage.setItem("goods",JSON.stringify(this.goods));
    }

    init(){
        var that = this;
        $.ajax({
            url:this.url,
            data:JSON,
            success:function(res){
                // console.log(res);
                // console.log(that);
                that.display(res);
                $.ajax({
                    url:that.hotUrl,
                    data:JSON,
                    success:function(res){
                        that.display(res);
                        $.ajax({
                            url:that.jbUrl,
                            data:JSON,
                            success:function(res){
                                that.display(res);
                            }
                        })
                    }
                })
        }
    });
}
    display(res){
        this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
        var str = "";
        for(var i = 0;i < res.length;i++){
            for(var j = 0;j < this.goods.length;j++){
                if(res[i].id == this.goods[j].id){
                    str += `<tr index="${res[i].id}">
                    <td><input type="checkbox" class="selected"></td>
                    <td><img src="${res[i].src}" alt=""></td>
                    <td>${res[i].name}</td>
                    <td>￥${res[i].price}</td>
                    <td><input type="number" value="${this.goods[j].num}" min=1 class="changeNum"></td>
                    <td class="del">删除</td>
                    </tr>`;
            }
        }
    }
    if(this.goods != []){
        this.tbody.innerHTML  += str;
    }
    }
    empty(){
        this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
        console.log(this.goods == "");
        if(this.goods == ""){
            this.emp.style.display = "block";
        }else{
            this.emp.style.display = "none";
        }
    }
}
new Cart;