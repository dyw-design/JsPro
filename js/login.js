class Login{
    constructor(){
        this.user = document.querySelector("#user");
        this.password = document.querySelector("#password");
        this.btnLogin = document.querySelector(".btn-login");
        this.tc = document.querySelector(".tc");
        this.addEvent();  
    }
    addEvent(){
        var that = this;
        // console.log(123);
        this.btnLogin.onclick = function(){
            that.username = that.user.value;
            that.pass = that.password.value;
            that.login();
        }
    }
    login(){
        this.info = localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : [];
        // console.log(this.info);
        if(this.info == ""){
            $(".login-err").html("不存在此账户，请先注册").show();
        }
        console.log(this.info.length);
        for(var i = 0;i<this.info.length;i++){
            console.log(this.info[i].name);
            console.log(this.info[i].pass);
            if((this.info[i].name == this.username && this.info[i].pass == this.pass)||(this.info[i].phone == this.username && this.info[i].pass == this.pass)){    
                console.log("登录成功");
                this.info[i].tag = 1;
                console.log(this.info[i]);
                this.success();
                return ;
            }else{
                $(".login-err").html("登录失败").show();
                return ;
            }
        }
    }
    success(){
        localStorage.setItem("info",JSON.stringify(this.info));
        this.tc.style.display = "block";
        var time = 5;
        var timer;
        timer = setInterval(
            function(){
                var second = document.getElementById("second");
                if(time>=1){
                    second.innerHTML = time;
                    time--;
                }else{
                    clearInterval(timer);
                    location.href="index.html";
                }
            },
            1000
        );
    }
}
new Login();