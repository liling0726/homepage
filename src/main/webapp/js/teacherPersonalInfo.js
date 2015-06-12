/*
 * by 李玲

*/
$(function(){
	//查出登录的老师信息
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherPersonInfo",
		async:false,
		success:function(result){
			result=result.basicInfo;
			$("#teaInfoId").val(result.basic_info_id);
			$("#name").val(result.user_name);
			$("#occupation").val(result.basic_info_title);
			$("#acaddegree").val(result.basic_info_degree);
			$("#acad").val("计算机科学与技术学院");
			$("#email").val(result.basic_info_email);
			$("#phone").val(result.basic_info_phone);
			$("#address").val(result.basic_info_address);
			$("#way").val(result.basic_info_research);
$("input[name='isMessage']").each(function(){
	alert($(this).val()==result.basic_info_allow_message);
	if($(this).val()==result.basic_info_allow_message)
		{
		$(this).attr("checked","checked");
		}
})
			
		}
	})
	//修改老师信息
	/*
	*还没完成
	*后台参数：id（老师信息Id）
		  *title（职称）
		  *degree（学位）
		  *email（邮箱）
		  *phone（电话）
		 * address（办公地址）
		 * research（研究方向）
		 *message（是否留言）
		 * model（模板）

	*/
	$("#save").click(function(){
		var teaInfoId=$("#teaInfoId").val();
		var teaOcc=$("#occupation").val();
		var teaDegree=$("#acaddegree").val();
		var teaEmail=$("#email").val();
		var teaPhone=$("#phone").val();
		var teaAddress=$("#address").val();
		var teaIsmMessage=$("#isMessage").val();
		var teaSearch=$("#way").val();
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"../teacherPersonInfo/save",
			data:{
				id:teaInfoId,
				title:teaOcc,
				degree:teaDegree,
				email:teaEmail,
				phone:teaPhone,
				address:teaAddress,
				message:teaIsmMessage,
				model:"1"
			},
			async:false,
			success:function(result){

				}
	})
	
})
})