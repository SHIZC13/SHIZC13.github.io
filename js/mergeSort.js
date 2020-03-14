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

    //延时画图，高亮交换位
    function mark(items, firstIndex, secondIndex){
        //延时画图
        var ls = cpy(items);
        setTimeout(function(){
            draw(ls, firstIndex, secondIndex);
        }, index *  1000/change());
        index ++;
    }
    //移动数据时延时画图，高亮交换位
    function move(items, temp, firstIndex, secondIndex){
        //移动数据
        items[firstIndex] = temp[secondIndex];//向后移动一位
        //延时画图
        var ls = cpy(items);
        setTimeout(function(){
            draw(ls, firstIndex, secondIndex);
        }, index * 1000/change());
        index ++;
    }

    var num = 0;//全局计数器
    function merge(items,low,mid,hi) {
    	var temp = new Array(hi - low + 1);
    	var i = 0,p1 = low,p2 = mid+1;
    	while(p1 <= mid && p2 <= hi)
    		{
    		 // 比较左右两部分的元素，哪个小，把那个元素填入temp中
    		temp[i++] = items[p1] < items[p2] ? items[p1++] : items[p2++];
    		cmpl_num++;//计数
    		move_num++;
    		
    		}
        // 上面的循环退出后，把剩余的元素依次填入到temp中
    	
        // 以下两个while只有一个会执行
    	while(p1 <= mid) 
    		{
    		temp[i++] = items[p1++];
    		move_num++;
    		}
    	while(p2 <= hi) 
    		{
    		temp[i++] = items[p2++];
    		move_num++;
    		}
    	cmpl_num++;
    	
    	
        // 把最终的排序的结果复制给原数组
        for(i = 0; i < temp.length; i++) {
            items[low + i] = temp[i];
            //mark(items,low + i, i);
            move_num++;
        }
    }
    
    function sort(items ,low ,hi) {
    	if(low == hi){
    		return ;
    	}
    	var mid=low + Math.floor((hi - low)/2);
    	sort(items, low, mid);
    	sort(items, mid + 1, hi);
		merge(items, low, mid, hi);
    	mark(items, low, hi);//画图
    }
    
    
    
    
    
    //插入排序模块
    //移动数据时延时画图，高亮交换位
    function move1(items, firstIndex, secondIndex){
        //移动数据
        items[firstIndex] = items[secondIndex];//向后移动一位
        //延时画图
        var ls = cpy(items);
        setTimeout(function(){
            draw(ls, firstIndex, secondIndex);
        }, index * 1000/change());
        index ++;
    }
    // 直接插入插入排序 
    function insertionSort (items, low, hi) {
        for (var i = low + 1; i < hi; i++) {
            var temp = items[i];//临时储存
            for (var j = i; j > 0; j--)//这里的j--必须有j>0的判断，否则数组下标可能越界，或者使用哨兵防止数组越界；
                {
            	if(temp < items[j - 1])
            		{
                	move1(items,j,j-1);//移动；
                	cmpl_num++;
                	move_num++;
            		}
            	else { break; }//temp大于有序表中的最后一位则不需要移动
                }
            items[j] = temp;//跳出内层循环后插入在合适的位置(此处的j是循环停止处的j)
            move_num++;
        }
    }
    function opt_sort(items ,low ,hi) {
    	if(low == hi){
    		return ;
    	}
/*    	if(hi - low <= 4)//短序列使用插入排序可以减少递归深度与增加运算速度
    		{
    		insertionSort(items,low, hi)
    		return;
    		}*/
    	var mid=low + Math.floor((hi - low)/2);
    	opt_sort(items, low, mid);
    	opt_sort(items, mid + 1, hi);
    	if(items[mid] > items[mid+1])//有序时不用进行分治
    		{
    		merge(items, low, mid, hi);
    		}
    	mark(items, low, hi);//画图
    }
     
    function mergeSort(items)
    {
    	var x = document.getElementById("optSelect");  	  
  	    var txt = x.value;
  	    if(txt =="归并排序")
  	    	{
  	    	sort(items, 0, items.length - 1);
  	    	}
  	    if(txt == "归并排序优化")
  	    	{
  	    	opt_sort(items, 0, items.length - 1);
  	    	}
 
  	    	
  	    	
    	
    }
    
    function start(){
        draw(lists);            //开始绘图
        var arr = cpy(lists);   //复制数组，下次可以重新开始动画
        index = 0;  //初始化延时计数
        var beginTime = +new Date();
        mergeSort( arr);    //执行归并排序
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


