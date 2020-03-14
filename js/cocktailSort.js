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



//鸡尾酒排序
function cocktailSort(items) {
    var min_pos = 0,max_pos = items.length - 1,
    	mov = min_pos,
        j = 0;
    while (min_pos < max_pos) 
    {
    	
        for (j = max_pos; j > min_pos; --j) {
        	move_num++;
            if (items[j-1] > items[j]) {
            	swap(items,j-1,j);
            	cmpl_num +=2;
            	mov = j;
                // 解构赋值，交换变量值
            }
        }
        min_pos = mov;
    	
        
        for (j = min_pos; j < max_pos; ++j) 
        {
        	move_num++;
            if (items[j] > items[j+1]) {
            	swap(items,j,j+1);
            	cmpl_num +=2;
            	mov = j;
                // 解构赋值，交换变量值
            }
        }
        max_pos = mov;
    }
}

function start(){
    draw(lists);            //开始绘图
    var arr = cpy(lists);   //复制数组，下次可以重新开始动画
    index = 0;              //初始化延时计数
    var beginTime = +new Date();
    num = cocktailSort( arr);    //执行希尔排序
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

