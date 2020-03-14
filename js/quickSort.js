    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');
    var range = document.getElementById('range');
    //监控滑竿的变化
	range.oninput = function(){
		change();
		//start();
		}
	function change(){
		 var speed = range.value;
		 return speed;
		
		}
	
    var cmpl_num = 0;//比较次数变量
    var move_num = 0;//移动次数变量
    var sort_lists = JSON.parse(window.localStorage["lists"]);//读页面缓存
    window.localStorage["sort_lists"] = JSON.stringify(sort_lists);//保存页面缓存
    var lists = JSON.parse(window.localStorage["sort_lists"]);//读页面缓存
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
        var time = setTimeout(function(){
            draw(ls, firstIndex, secondIndex);
        }, index * 1000/change());
        index ++;
    }
    //主元为首元素的划分
    function Partition(items, left, right)
    {
        var pivotkey; // 主元
        pivotkey = items[left];
        while (left < right)
        {
            while (left < right && items[right] >= pivotkey) // 比主元大的放在主元的右边，不交换
                {
            	right--;
                cmpl_num++;
                }
            swap(items, left, right);                         // 比主元小的放在主元的右边，进行交换
            move_num += 3;
            while (left < right && items[left] <= pivotkey) // 比主元小的放在主元的左边，不交换
                {
            	left++;
            	cmpl_num++;
                }
            swap(items, left, right); // 比主元大的放在主元的左边，进行交换
            move_num += 3;
        }
        return left;
    }
    // 快速排序
    function quickSort(items, low, high)
    {
        var pivot; // 主元位置
        if (low < high)
        {
            pivot = Partition(items, low, high);
            quickSort(items, low, pivot - 1);
            quickSort(items, pivot + 1, high);
        }
    }

    
    
    
    //主元为中间元素的划分
    function partition(items, left, right) {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;
        while (i <= j) {//代表没有结束
            while (items[i] < pivot) {
                i++;
                cmpl_num++;
            }
            while (items[j] > pivot) {
                j--;
                cmpl_num++;
            }
            if (i <= j) {
                swap(items, i, j);
                move_num += 3;
                i++;
                j--;
            }
        }
        return i;
    }
    //递归快排
    function opt_quickSort(items, left, right) {
        var index;
        if (items.length > 1) {
            index = partition(items, left, right);
            if (left < index - 1) {
                opt_quickSort(items, left, index - 1);
            }
            if (index < right) {
            	opt_quickSort(items, index, right);
                
            }
        }
       
    }
    
    
    function sortSelect(arr)
    {
    	var x = document.getElementById("optSelect");  	  
  	    var txt = x.value;
  	    if(txt =="快排")
  	    	{
  	    	quickSort(arr, 0, arr.length - 1);
  	    	}
  	    if(txt == "快排优化")
  	    	{
  	    	opt_quickSort(arr, 0, arr.length - 1);
  	    	}
    }

    function start(){
        draw(lists);            //开始绘图
        var arr = cpy(lists);   //复制数组，下次可以重新开始动画
        index = 0;   //初始化延时计数
        var beginTime = +new Date();
        sortSelect( arr);    //执行快速排序
        var endTime = +new Date();
        document.getElementById("compare").value = cmpl_num + "次";
        document.getElementById("move").value = move_num + "次";
        cmpl_num = 0;
        move_num = 0;
        document.getElementById("time").value = (endTime-beginTime) + "ms";
        var time = setTimeout(function(){  //结束绘图
            draw(arr);
        }, index *  1000/change());
        //clearInterval(time);
        return 0;
        
    }
    

    