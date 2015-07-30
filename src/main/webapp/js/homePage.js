/*
 * @author:李玲；
*/
$(function(){
//首页随机显示12位教师头像及名字
$.ajax({
	type:"post",
	content : "application/x-www-form-urlencoded;charset=UTF-8",
	url:"../index/random",
	dataType:'json',
	async:false,
	success:function(result){
		var html="";
		result=result.user;
		for(var i=0;i<result.length;i++)
			{
			html+="<div class='col-md-2'>"
    +"<div class='thumbnail'>"
      +"<a href='#'><img src='../img/mould.png' alt='...'></a>"
    +"</div>"
    +"<div class='personName'>"
    +"<a title='...' href='"+result[i].user_url +"'>"+result[i].user_name
    +"</a></div>"
    +"</div>";
			}  
		$("#userRandom").append(html);
	}
});
/*
 * 教师个人主页的首页：点击量
 * 显示点击量排名前12位
*/
$.ajax({
	type:"post",
	content:"application/x-www-form-urlencoded;charset=UTF-8",
	url:"../index/topUserCount",
	dataType:"json",
	async:false	,
	success:function(result){
    var data=result.topUserCount;
    var html="";
    for(var i=0;i<data.length;i++)
    	{
    	html+="<li><a href='#' id='"+data[i].user_id+"' class='col-md-4'> "+data[i].user_name+"</a></li>"
    	
    	}
    $("#teacherRankByCount").append(html);
	},
	error:function(e){
		console.log("错误："+e.message);
	}
	
});
/*
 * 教师个人主页的首页--院系列表的显示
*/
$.ajax({
	type:"post",
	content:"application/x-www-form-urlencoded;charset=UFT-8",
	url:"../index/acadName",
	async:false,
	success:function(result){
		var data=result.acadName,html="<tr>";
		for(var i=0;i<data.length;i++){
		 if(i!=0&&(i+1)%3==0&&i!=data.length-1)
			 {
				html+="<td><a href='#'><span class='glyphicon glyphicon-globe'></span>&nbsp;&nbsp;"+data[i].acad_name+"</a></td></tr><tr>";
			 }
			else html+="<td><a href='#'><span class='glyphicon glyphicon-globe'></span>&nbsp;&nbsp;"+data[i].acad_name+"</a></td>"
					
		}
		html+="</tr>";
		$("#acadNameShow").append(html);
	}
	
});
/*
 * 教师个人主页的首页--最近更新的显示,显示12位老师
*/
$.ajax({
	type:"post",
	content:"application/x-www-form-urlencoded;charset=UFT-8",
	url:"../index/searchFlesh",
	async:false,
	success:function(result){
		var data=result.Searchs,html="";
		for(var i=0;i<data.length;i++){
		html+="<li><a id="+data[i].user_id+" class='col-md-4' href="+data[i].user_ur+">"+data[i].user_name+"</a></li>" 	
		}
		
		$("#recentUpUser").append(html);
	}
	
});

$("#search").bind("click", function () {
    window.location = "teacherShowMore.html?searchWords=" + $("#searchWords").val();
});

})