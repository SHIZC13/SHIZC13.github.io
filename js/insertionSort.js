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

    //移动数据时延时画图，高亮交换位
    function move(items, firstIndex, secondIndex){
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
    function insertionSort (items) {
        for (var i = 1; i < items.length; i++) {
            var temp = items[i];//临时储存
            for (var j = i; j > 0; j--)//这里的j--必须有j>0的判断，否则数组下标可能越界，或者使用哨兵防止数组越界；
                {
            	if(temp < items[j - 1])
            		{
                	move(items,j,j-1);//移动；
                	cmpl_num++;
                	move_num++;
            		}
            	else { break; }//temp大于有序表中的最后一位则不需要移动
                }
            items[j] = temp;//跳出内层循环后插入在合适的位置(此处的j是循环停止处的j)
            move_num++;
        }
    }
    

    // 二分查找优化 插入排序
    function binaryInsertionSort(arr) {
        for (let i = 1, len = arr.length; i < len; i++) {
            let keyNum = arr[i],
                left = 0,
                right = i - 1;

            // 此处，要考虑两边界时候，出现的问题，不能简单的left < right，当在右边界时候，left需要再移动一位。
            while (left <= right) {
                let middle = Math.floor((left + right) / 2);
                if (keyNum > arr[middle])
                {
                    left = middle + 1;
                } else {
                    right = middle - 1;
                }
                cmpl_num++;
            }
            // 比left大的，向右位移一位
            for (let j = i - 1; j >= left; j--) {
                move(arr, j+1, j);
                move_num++;
            }
            arr[left] = keyNum;
            move_num++;
        }
    }
   
    //排序选择函数
    function sortSelect(arr)
    {
    	var x = document.getElementById("optSelect");  	  
  	    var txt = x.value;
  	    if(txt =="直接插入排序")
  	    	{
  	    	insertionSort(arr);
  	    	}
  	    if(txt == "二分法优化插入排序")
  	    	{
  	    	binaryInsertionSort(arr);
  	    	}
    }
    
    function start(){
        draw(lists);            //开始绘图
        var arr = cpy(lists);   //复制数组，下次可以重新开始动画
        index = 0;  //初始化延时计数
        var beginTime = +new Date();
        sortSelect(arr);    //执行直接插入排序
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