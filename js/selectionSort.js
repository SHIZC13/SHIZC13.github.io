    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');
    var range = document.getElementById('range');
    
    //监控滑竿的变化
	range.oninput = function(){
		change();
		}
	function change(){
		 var speed = range.value;
		 return speed;
		
		}
    var cmpl_num = 0;//比较次数变量
    var move_num = 0;//移动次数变量
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
            ctx.beginPath();
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
        }, index * 1000/change());
        index ++;
    }


   
 // 选择排序
    function selectionSort(items) {
        var minIndex;
        for (let i = 0, len = items.length; i < len; i++) {
            minIndex = i;
            for (let j = i + 1; j < len; j++) {
            	//最小放前
                if (items[j] < items[minIndex]) {
                    minIndex = j;
                    cmpl_num++;
                }else{cmpl_num++;}
                
            }
            swap(items,i,minIndex);
            move_num += 3; 
        }
    }
    
  //选择排序的优化
  //选择排序的优化(一次将两个元素放在它的最终位置上）
    function opt_selectionSort(items)
    {
    	var size = items.length;
    	//最小值下标
    	var minpos = 0;
    	//最大值下标
    	var maxpos = 0;
    	var left = 0;
    	var right = size - 1;
    	var j = 0;
    	//循环size-1次
    	while (left < right)
    	{
    		maxpos = left;
    		minpos = left;
    		//确定最大值下标以及最小值下标
    		for (j = left; j <= right; j++)
    		{
    			if (items[j]>items[maxpos])
    			{
    				cmpl_num++;
    				maxpos = j;
    			}
    			if (items[j] < items[minpos])
    			{
    				cmpl_num++;
    				minpos = j;
    			}
    			else
    				{
    				cmpl_num++;
    				}
    		}
    		//将最大值插到最后
    		if (maxpos != right)
    		{
    			swap(items, maxpos, right);
    			move_num += 3;
    		}
    		
    		//防止minpos在最大值要插入的位置
    		if (minpos == right)
    		{
    			minpos = maxpos;
    		}
    		//将最小值插到最前面
    		if (minpos != left)
    		{
    			swap(items, minpos, left);
    			move_num += 3;
    		}
    		left++;
    		right--;
    	}
    }
    function sortSelect(items)
    {
    	var x = document.getElementById("optSelect");  	  
  	    var txt = x.value;
  	    if(txt =="选择排序")
  	    	{
  	    	selectionSort(items);
  	    	}
  	    if(txt == "双向选择排序")
  	    	{
  	    	opt_selectionSort(items);
  	    	}
 
  	    	
  	    	
    	
    }

     
function start(){
    draw(lists);            //开始绘图
    var arr = cpy(lists);   //复制数组，下次可以重新开始动画
    index = 0;              //初始化延时计数
    var beginTime = +new Date();
    sortSelect( arr);    //执行选择排序
    var endTime = +new Date();
    document.getElementById("compare").value = cmpl_num + "次";
    document.getElementById("move").value = move_num + "次";
    cmpl_num = 0;
    move_num = 0;
    document.getElementById("time").value = (endTime-beginTime) + "ms";
    setTimeout(function(){  //结束绘图
        draw(arr);
    }, index * 1000/change());
}
