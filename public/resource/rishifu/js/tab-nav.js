$(document).ready(function(){
	$(".main").css("margin-top","30px");
});

$(function(){		
		$('.title-list li').mouseover(function(){
		$(".product").removeClass("show");
		$(".main").addClass('moveup')
		var liindex = $('.title-list li').index(this);
		$(this).addClass('on').siblings().removeClass('on');
		$('.product-wrap div.product').eq(liindex).fadeIn(10).siblings('div.product').hide();
		var liWidth = $('.title-list li').width();
		$('.tab-nav .title-list p').stop(false,true).animate({'left' : liindex * liWidth + 'px'},300);
	});
	// $('.title-list li').mouseout(function(){
	// 	$(".product").removeClass("show");
	// });
	//设计案例hover效果
	// $('.product-wrap .product li').hover(function(){
	// 	$(this).css("border-color","#ff6600");
	// 	$(this).find('p > a').css('color','#ff6600');
	// },function(){
	// 	$(this).css("border-color","#fafafa");
	// 	$(this).find('p > a').css('color','#fff');
	// });
	});
