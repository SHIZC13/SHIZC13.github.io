 	function random(len)
 	{
 		var lists =new  Array(len);
    	for(let i = 0;i < len;i++)
    		{
    		lists[i] = i +1;
    		}
    	for(let i = 0;i < len;i++)
		{
			var index = Math.floor(Math.random() * lists.length);//随机取0~lists.length-1的随机数
			var temp = lists[i];
			lists[i] = lists[index];
			lists[index] = temp;
		}
    	return lists
 	}
	
 	function unique(len)
 	{
 		var list =new  Array(len);
 		for (var i = 0; i < len; i++) {
			list[i] = ( Math.floor(1 + i / (len / 4) ) ) * (len / 4);
		}
		for (var i = 0; i < len; i++) {
			var index = Math.floor(Math.random() * list.length);
			var temp = list[i];
			list[i] = list[index];
			list[index] = temp;
		}
		return list;
 	}
 	
 	
 	function reverse(len)
 	{
 		var list =new  Array(len);
		for (var i = 0; i < len; i++) {
			list[i] = len - i;
		}
		return list;
 	}
 	function less(len)
 	{
 		var list =new  Array(len);
 		for (let i = 0; i < len / 2; i++) {
			list[i] = i + 1;
		}
		for (let i = len / 2; i < len; i++) {
			list[i] = i + 2;
		}
		list[len - 1] = len / 2 + 1;
		return list;
 	}
 	
	function data(len)
    {
		var x = document.getElementById("mySelect");  	  
  	    var txt = x.value;
  	    console.log(txt);
		var lists =new  Array(len);
		var str = txt;
    	if(str == "随机序列")
    	{
    	lists = random(len);
    	}
    	if(str == "独特性质序列")
    	{
		lists = unique(len);
		}
    	if(str == "倒叙序列")
		{
		lists = reverse(len);
		}
    	if(str == "大部分有序序列")
		{
		lists = less(len);
		}
    	window.localStorage["lists"] = JSON.stringify(lists);//保存页面缓存
    	return lists
    }
	var len = 100;
	function clear_cache()
	{
		localStorage.clear();//清除缓存
	}