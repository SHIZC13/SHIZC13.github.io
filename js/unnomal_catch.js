	try{
		var rList = JSON.parse(window.localStorage["lists"]);
	}
    catch(e)
    	{
    	window.alert("数据未生成，请返回点击数据生成按钮");
    	window.location.href="./background/index.html";
    	}
