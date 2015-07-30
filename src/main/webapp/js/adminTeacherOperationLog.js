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
		startTime=$("#startTime").val();
		endTime=$("#endTime").val();
		if(startTime==""&&endTime=="")
			selectLog();
		else selectByOption();
	});
	/*
	 * 查看昨天的操作日志
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 *        pageMax(每页显示最大条数)
	 *        currentPage（当前页）
	 */
	$("#yesterdayLog").click(function(){
		
		 startTime=GetDateStr(-1);
		 endTime=startTime;
		//alert(startTime);
		selectByOption();
		
		
	})
	/*
	 * 查看今天的操作日志
	 * @param startTime(开始时间)
	 *        endTime(结束时间)
	 *        pageMax(每页显示最大条数)
	 *        currentPage（当前页）
	 */
	$("#todayLog").click(function(){
		 startTime=GetDateStr(0);
		 endTime=startTime;
		selectByOption();
		
		
	})
	
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
			//alert("查询");
			return;
		}
	})
}
/*
 * 获取某天的时间
 * @param AddDayCount(距离今天相隔的天数)
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
}