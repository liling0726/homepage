var currentPage=1;//当前页
var pageNum;//总条数
var totalPage;//总页数
var pageMax;//每页最大的条数
var startTime="";//开始时间
var endTime="";//结束时间
$(function(){
	pageMax=$("#pageMax").val();
	
	/*
	 * 显示日志
	 * @param:pageMax(每页显示最大条数)
	 *       currentPage（当前页）
	 */
	selectLog();
	/*
	 * 根据开始时间和结束时间查找
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 */
	$("#searchByTime").click(function(){
		currentPage=1;
		selectByOption();
	});
	/*
	 * 上一页
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 *        pageMax(每页显示最大条数)
	 *        currentPage（当前页）
	 *    
	 */
	$("#pagebackward").click(function(){
		if(currentPage==1)
			{
			alert("当前页为首页！");
			return ;
			}
		
		currentPage=parseInt($("#currentPage").text())-1;
	
		if(startTime==""&&endTime=="")
			selectLog();
		else selectByOption();
	});
	/*
	 * 下一页
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 *        pageMax(每页显示最大条数)
	 *        currentPage（当前页）
	 */
	$("#pageforward").click(function(){
		if(currentPage==totalPage)
		{
		alert("当前页为末页！");
		return ;
		}
		currentPage=parseInt($("#currentPage").text())+1;
		//alert(currentPage);
		if(startTime==""&&endTime=="")
			selectLog();
		else selectByOption();
	});	
	/*
	 * 改变每页显示最大页数
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 *        pageMax(每页显示最大条数)
	 *        currentPage（当前页）
	 */
	$("#pageMax").bind("change",function(){
		pageMax=$(this).val();
		//alert(pageMax);
		if(startTime==""&&endTime=="")
			selectLog();
		else selectByOption();
	});
	/*
	 *  跳转
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 *        pageMax(每页显示最大条数)
	 *        currentPage（当前页）
	 */	
	$("#goto").bind("click",function(){
		currentPage=$("#gotoPage").val();
		if(currentPage>totalPage)
		{
		alert("超过总页数");
		return ;
		}
		else if(currentPage<1)
		{
		alert("不能小于1");
		return ;
		}
		//alert(currentPage);
		if(startTime==""&&endTime=="")
			selectLog();
		else selectByOption();
	});
})
function selectLog(){
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../opLog/find",
		data:{
			page:currentPage,
			rpp:pageMax
		},
		async:false,
		success:function(result){
			var totalNum=result.result["1"];//返回的日志信息
			pageNum=parseInt(result.result["2"]);//总条数
			var html="";
			if(pageNum%pageMax==0)
				totalPage=pageNum/pageMax;
			else{
				totalPage=parseInt(pageNum/pageMax)+1;
			}
			for(var i=0;i<totalNum.length;i++){
				html+="<tr><td>"+parseInt((currentPage-1)*pageMax+i+1)+"</td>"
				+"<td>"+totalNum[i].time+"</td>"
				+"<td>"+totalNum[i].user_name+"</td>"
				+"<td>"+totalNum[i].op+"</td></tr>"
			}
			$("#logShow").html(html);
			$("#currentPage").html(currentPage);
			$("#totalPage").html(totalPage);
			$("#pageNum").html(pageNum);
		}
	});
}
function selectByOption(){
	startTime=$("#startTime").val();
	endTime=$("#endTime").val();
	//alert(endTime);
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../opLog/findByTime",
		data:{
			page:currentPage,
			rpp:pageMax,
			startTime :startTime ,
			endTime:endTime
		},
		async:false,
		success:function(result){
			var totalNum=result.result["1"];//返回的日志信息
			pageNum=parseInt(result.result["2"]);//总条数
			var html="";
			if(pageNum%pageMax==0)
				totalPage=pageNum/pageMax;
			else{
				totalPage=parseInt(pageNum/pageMax)+1;
			}
			for(var i=0;i<totalNum.length;i++){
				html+="<tr><td>"+parseInt((currentPage-1)*pageMax+i+1)+"</td>"
				+"<td>"+totalNum[i].time+"</td>"
				+"<td>"+totalNum[i].user_name+"</td>"
				+"<td>"+totalNum[i].op+"</td></tr>"
			}
			$("#logShow").html(html);
			$("#currentPage").html(currentPage);
			$("#totalPage").html(totalPage);
			$("#pageNum").html(pageNum);
			return;
		}
	})
}