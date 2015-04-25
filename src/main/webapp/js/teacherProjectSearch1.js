$(function(){
	var k=0,m=0,n=0,s=0;
	$("#addSearchDirection").click(function(){
		s++;
		if(s%2==0)
			$("#searchDirection").hide();
		else $("#searchDirection").show();
		$("#saveSearchDirection").text("保存");
	})
	$("#addSearchArea").click(function(){
		k++;
		if(k%2==0)
			$("#searchArea").hide();
		else
			$("#searchArea").show();
		$("#saveSearchArea").text("保存");
	})

	$("#updateSearchDirection").click(function(){
		m++;
		if(m%2==0)
			$("#searchDirection").hide();
		else $("#searchDirection").show();
		$("#saveSearchDirection").text("修改");
	})
	$("#updateSearchArea").click(function(){
		n++;
		if(n%2==0)
			$("#searchArea").hide();
		else $("#searchArea").show();
		$("#saveSearchArea").text("修改");
	})

})