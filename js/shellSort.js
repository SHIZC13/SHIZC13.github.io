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
    
    // 希尔排序
    function shellSort(items){
    var len = items.length;
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {//外层控制步长
        for (var i = gap; i < len; i++) {//开始插入排序
            var temp = items[i];//临时储存
            for (var j = i; j > 0; j -= gap) {
            	cmpl_num++;
          
            	if(temp < items[j - gap])//满足条件则插入
            	{
                move(items,j ,j - gap)//移动；
            	cmpl_num++;
            	move_num++;
            	}
            	else{break;}
            }
            items[j] = temp;
        }
    }
    }
  
    
    function start(){
        draw(lists);            //开始绘图
        var arr = cpy(lists);   //复制数组，下次可以重新开始动画
        index = 0;              //初始化延时计数
        var beginTime = +new Date();
        num = shellSort( arr);    //执行希尔排序
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