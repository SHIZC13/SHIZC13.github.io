    function CountingSort(arr)
    {
        if (arr.length == 0) return arr;
        var bias, min = arr[0], max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max)
                max = arr[i];
            if (arr[i] < min)
                min = arr[i];
        }//求最值
        bias = 0 - min;//偏移
        var bucket = new Array(max - min + 1).full(0);//创建数组
        for (let i = 0; i < array.length; i++) {
            bucket[arr[i] + bias]++;
        }
        var index = 0, i = 0;
        //计数
        while (index < arr.length) {
            if (bucket[i] != 0) {
                arr[index] = i - bias;
                bucket[i]--;
                index++;
            } else
                i++;
        }
        return arr;
    }