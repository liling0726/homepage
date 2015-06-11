$(function(){
	
	$("#imgcode").click(function(){
		 reloadcode();
	})
	$(".changeOne").click(function(){
		 reloadcode();
	})
	function reloadcode(){
		$("#imgcode").attr("src","checkcode.jsp?random="+Math.random());
	}
/*	
 * 管理员登录验证
  * 需要后参数： admin_num(管理员工号) 
  *          pwd(密码)
  *          checkcode(验证码)
  *          有错：验证码错误（后台）
 * by 李玲
	*/
	$("#login").click(function(){
		var adminNum=$("#adminNum").val();
		var adminPassword=$("#adminPassword").val();
		var adminAuthCode=$("#adminAuthCode").val();
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"../adminLogin/login",
			data:{
				admin_num:adminNum,
				pwd:adminPassword,
				checkcode:adminAuthCode
			},
			async:false,
			success:function(result){
				result=result.result
				
				if(result instanceof Object)
					{
				
					window.location.href="../html/adminHomePage.html"
					}
				else{
					alert(result);
					location.reload();
				}
			}
		});
	});
})