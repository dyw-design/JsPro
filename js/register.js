class Register{
    constructor(){
        this.init();
    }
    init(){
        //获取表单元素
        this.phone=document.querySelector("#phone");
        this.user=document.querySelector("#user");
        this.password=document.querySelector("#password");
        this.samepass=document.querySelector("#samepass");
        this.btnregister=document.querySelector(".btn-register");
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.btnregister.onclick = function(){
            that.regTest();    
        }
        $("input").on("blur",function(){
            // that.regTest();
        })
        this.phone.onclick = function(){
            $(".register-err").hide(); 
        }
    }
    regTest(){
        var phoneReg = /^\w+@[a-z0-9]+\.[a-z]+|1[2-9]\d{9}$/i;
        var userReg = /^[a-z0-9_-]{3,16}$/;
        var passReg = /^[a-z0-9_-]{6,18}$/;
        // var str = "123qq.com";
        // var str2 = "1311079360755";
        // console.log(phoneReg.test(str)); 
        // console.log(phoneReg.test(str2));
        this.pe = this.phone.value;
        this.us = this.user.value;
        this.pass = this.password.value;
        this.same = this.samepass.value;
        if(phoneReg.test(this.pe)){
            $(".phone-err").hide();
        }else{
            $(".phone-err").show();
        }
        if(userReg.test(this.us)){
            $(".user-err").hide();
        }else{
            $(".user-err").show();
        }    
        if(passReg.test(this.pass)){
            $(".pass-err").hide();
        }else{
            $(".pass-err").show();
        }
        if(this.same != this.pass){
            $(".samepa-err").show();
        }else{
            $(".samepa-err").hide();
        }   
        if(phoneReg.test(this.pe)&&this.same == this.pass&&userReg.test(this.us)&&userReg.test(this.pass)){
            this.register(); 
        }else{
            $(".register-err").show().html("注册失败"); 
        }
    }
    register(){
        // console.log(this.pe);
        // console.log(this.us);
        // console.log(this.pass);
        //将完成验证后的数据存储到本地
        this.info = localStorage.getItem("info");
        var isTrue = true;
        if(this.info){
            //如果存在用户
            //判断用户是否注册，否则添加用户信息
            this.info = JSON.parse(this.info);
            // console.log(this.info.length);
            for(var i = 0;i<this.info.length;i++){
                if(this.info[i].phone == this.pe || this.info[i].name == this.us){
                    $(".register-err").stop().show().html("此账号已经被注册了");
                    isTrue = false;
                    // return ; 
                }else{
                    $(".register-err").stop().hide();
                } 
            }
            if(isTrue){
                this.info.push({
                    phone:this.pe,
                    name:this.us,
                    pass:this.pass,
                    tag:0
                })
            }
        }else{
            //用户信息本地存储不存在，说明当前无用户
            // this.info = {};
            this.info = [{
                phone:this.pe,
                name:this.us,
                pass:this.pass,
                tag:0
            }];
        }
        //转成字符重新存进localhost
        localStorage.setItem("info",JSON.stringify(this.info));
        alert("注册成功");
        location.href="login.html";
    }
}

new Register();