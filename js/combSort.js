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
    //判断是否有序
    function is_array_sorted(arr) {
        var sorted = true;
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                sorted = false;
                break;
            }
        }
        return sorted;
    }
    //梳排序
    function combSort(arr){
    	var iteration_count = 0;//迭代计数器
    	var gap = arr.length;
    	var decrease_factor = 1.3;//递减率
    	while (!is_array_sorted(arr)) {
    	      // 如果不是第一个间隙
    	      if (iteration_count > 0)
    	      // 计算间隙
    	          gap = (gap == 1) ? gap : Math.floor(gap / decrease_factor); 
    	      // 设置前后元素并按间隙递增
    	      var front = 0;
    	      var back = gap;
    	      while (back <= arr.length - 1) {
    	          // 如果前大于后交换次序
    	          if (arr[front] > arr[back]) {
    	             swap(arr,front,back);
    	             cmpl_num++;
    	             move_num += 3;
    	          }
    	 
    	          // 增量和重新运行交换
    	          front += 1;
    	          back += 1;
    	      }
    	      iteration_count += 1;//迭代计数器加一
    	  }
    }
    
    
    function start(){
        draw(lists);            //开始绘图
        var arr = cpy(lists);   //复制数组，下次可以重新开始动画
        index = 0;              //初始化延时计数
        var beginTime = +new Date();
        combSort( arr);    //执行梳排序
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


    
