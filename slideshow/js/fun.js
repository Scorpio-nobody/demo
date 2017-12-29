(function(){
	var $carousel = $("#carousel");
	var $circles = $("#circles ol li");
	var $imgs = $("#imgs ul li");
	var $mask = $("#imgs .mask");
	var $close = $("#imgs .close");

	var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));

	// 将猫腻图的碎片保存在数组中
	var arr = [];
	for(var i = 0 ; i < 3 ; i ++){
		for(var j = 0 ; j < 6 ; j ++){
			arr.push($("<div></div>").css({
				"width":0,
				"height":0,
				"background":"url(images/slider-img1.jpg) no-repeat " + j * -138.33 + "px " + i * -143.66 + "px",
				"position":"absolute",
				"left":j * 138.33,
				"top": i * 143.66
			}).appendTo($maoni));
		}
	}
	// console.log(arr);

	// 页面加载完毕显示第一张图片的蒙版。
	$mask.eq(0).fadeOut(0).stop(true).fadeIn(1000);

	// 点击close该蒙版消失
	$close.click(function(){
		$(this).parent(".mask").stop(true).fadeOut(1000);
	});

	// 信号量
	// 大图信号量
	var idx = 0;
	// 小圆点信号量
	var small_idx = 0;

	// 函数截流
	// lock = true 表示锁打开，函数可以执行
	var lock = true;


	// 定时器
	var timer = setInterval(function(){
		// 小圆点的信号量改变
		small_idx ++;
		// 后验证
		if(small_idx > $circles.length - 1){
			small_idx = 0;
		}
		change.call($circles.eq(small_idx));
	}, 5000);

	// 鼠标进入轮播图停止定时器
	$carousel.mouseenter(function(){
		clearInterval(timer);
	});

	// 鼠标离开开启定时器
	$carousel.mouseleave(function(){
		// 设表先关
		clearInterval(timer);
		timer = setInterval(function(){
			// 小圆点的信号量改变
			small_idx ++;
			// 后验证
			if(small_idx > $circles.length - 1){
				small_idx = 0;
			}
			change.call($circles.eq(small_idx));
		}, 5000);
	});




	// 小圆点的点击事件
	$circles.click(change);
	function change(){
		if(!lock){
			return;
		}
		// 锁关闭，不能再次触发函数
		lock = false;

		// 保存点击小圆点的序号
		small_idx = $(this).index();
		// 当点击的小圆点的序号和当前大图的序号相同时。
		if(small_idx == idx){
			return;
		}
		$(this).addClass("cur").siblings().removeClass("cur");
		// 当前大图的蒙版消失
		$mask.eq(idx).stop(true).fadeOut(300);
		// 显示对应的猫腻图
		$maoni.addClass("active");
		// 碎图片换对应的大图图片
		// 所有碎图片显示完全用时是3300毫秒。
		$.each(arr,function(i,j){
			j.css("background-image","url(images/slider-img" + (small_idx + 1) + ".jpg)").animate({
				"width":138.33,
				"height":143.66
			},300 + Math.random()*3000);
		});

		setTimeout(function(){
			// 将大图信号量更改为点击小圆点的信号量
			idx = small_idx;
			// 显示真正的图片
			$imgs.eq(idx).addClass("active").siblings().removeClass("active");
			// 显示对应大图的蒙版
			$mask.eq(idx).stop(true).fadeIn(500);
			// 所有的碎图片恢复0,0宽高
			$.each(arr,function(i,j){
				j.css({
					"width":0,
					"height":0
				});
			});
			lock = true;
		},3300);
	}

})();