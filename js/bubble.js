	var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');//获取canvas画布的绘图环境
    var range = document.getElementById('range');
    //监控滑竿的变化
    var speed = 10;  
	function adjust(){
		speed = range.value;
		arguments = speed;
		return speed;
		}
    var cmpl_num = 0;//比较次数变量
    var move_num = 0;//移动次数变量
    var timer = null;//动画生命时间
    var lists = JSON.parse(window.localStorage["lists"]);//读页面缓存
    var index = 0;      //延时函数计数
    draw(lists);
    //清空画布
    function clearCanvas(){
        ctx.clearRect(0, 0, cvs.width, cvs.height);
    }
    
    //绘柱状图，高亮交换位
    function draw(arr, first, second){
        clearCanvas();
        for(var i in arr){
            var x =10  + 10 * i;
            var y = arr[i] * 5;
            ctx.beginPath();//是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
            if(i == first)
                ctx.fillStyle = 'yellow';
            else if(i == second)
                ctx.fillStyle = 'yellow';
            else ctx.fillStyle = 'orange';
            ctx.fillRect( x, 500 - y, 8, y );
            ctx.closePath();
        }
    }
    
    //完整复制数组
    function cpy(arr){
        var item = [];
        for(var i in arr){
            item[i] = arr[i];
        }
        return item;
    }


    //交换数据时延时画图，高亮交换位
    function swap(items, firstIndex, secondIndex){
        //交换数据
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
        //延时画图
        var ls = cpy(items);
        setTimeout(function(){
            draw(ls, firstIndex, secondIndex);
        }, index * 1000/speed);
        index ++;
        
    }
  //冒泡排序
    function bubbleSort(items) {
        for (let i = 0, len = items.length; i < len; i++) {
            for (let j = 0; j < len - i; j++) {
                if (items[j] > items[j + 1]) {
                    swap(items,j,j+1);
                    cmpl_num++;
                    move_num += 3;
                }
            }
        }
    }
    
    //冒泡排序优化
    function opt_bubbleSort(items) {
    	var flag;
        for (let i = 0, len = items.length; i < len; i++) {
        	flag = false;//是否发生交换标志
            for (let j = items.length - 1; j >i; j--) {
                if (items[j - 1] > items[j]) {
                    swap(items,j,j - 1);
                    cmpl_num++;//比较次数
                    move_num += 3;//移动次数
                    flag = true;
                }
            }
            if(!flag)break;
        }
    }
    
  //排序选择函数
    function sortSelect(arr)
    {
    	var x = document.getElementById("optSelect");  	  
  	    var txt = x.value;
  	    if(txt =="冒泡排序")
  	    	{
  	    	bubbleSort(arr);
  	    	}
  	    if(txt == "冒泡排序优化")
  	    	{
  	    	opt_bubbleSort(arr);
  	    	console.log(txt);
  	    	}
    }
    function start(){
    draw(lists);            //开始绘图
    var arr = cpy(lists);   //复制数组，下次可以重新开始动画
    index = 0;   //初始化延时计数
    var beginTime = +new Date();
    sortSelect(arr);    //执行冒泡排序
    var endTime = +new Date();
    document.getElementById("compare").value = cmpl_num + "次";
    document.getElementById("move").value = move_num + "次";
    cmpl_num = 0;
    move_num = 0;
    document.getElementById("time").value = (endTime-beginTime) + "ms";
    setTimeout(function(){  //结束绘图
        draw(arr);
    }, index *  1000/speed);
    }

