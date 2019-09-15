require.config({
	baseUrl:"module",
	paths:{
		jq:"../libs/jquery",
        t1:"tab",
        m:"menu",
	}
})
require(["jq","t1","m"],(_,tab,menu)=>{
//	console.log(_)
	var t1 = new tab.tab();
    t1.init();
    var m = new menu.menu();
    m.init();
//	弹出框和选项卡不是重点,重点是模块化的结构怎么设计
})
