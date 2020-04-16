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

    // 堆排序
    function heapSort(arr) {
    	//根结点为零的建堆
        function heapify(arr, i, unorderedHeapSize) {
            let largest = i,//根结点
                leftChild = 2 * i + 1,//左孩子
                rightChild = 2 * i + 2;//右孩子
            if (leftChild < unorderedHeapSize && arr[leftChild] > arr[largest]) {
                largest = leftChild;
                cmpl_num++;
            }
            if (rightChild < unorderedHeapSize && arr[rightChild] > arr[largest]) {
                largest = rightChild;
                cmpl_num++;
            }
            if (largest != i) {
                swap(arr, i, largest);
                cmpl_num++;
                move_num += 3;
                heapify(arr, largest, unorderedHeapSize);
            }
        }
        //大顶堆
        function buildMaxHeap(arr) {
            for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
                heapify(arr, i, arr.length);
            }
        }
        // 建堆
        buildMaxHeap(arr);
        // 堆排序
        for (let i = arr.length - 1; i > 0; i--) {
            swap(arr, 0, i);
            move_num += 3;
            heapify(arr, 0, i);
        }
    }

    function start(){
        draw(lists);            //开始绘图
        var arr = cpy(lists);   //复制数组，下次可以重新开始动画
        index = 0;              //初始化延时计数
        var beginTime = +new Date();
        heapSort( arr);    //执行堆排序
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