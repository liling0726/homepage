var myDate = new Date();
var currentPage, // 当前页
totalNum, // 共多少页
maxPage;// 一页多少条
$(document)
		.ready(
				function() {
					$("#alertdiv").hide();// 面包屑下面的警告框
					currentPage = $("#currentPage").val();
					maxPage = $("#max").val();
					// alert(maxPage);
					if (currentPage == "undefined" || currentPage == "")
						currentPage = 1;
					// 初始化
					initial();

					$("#confirm")
							.on(
									"click",
									function() {
										var text = $("#textarea1").val();
										if (text == "") {
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>没有文字！";
											$("#alertdiv").html(html);
										} else {
											var date = new Date();
											var year = date.getFullYear();
											var month = date.getMonth() + 1;
											var day = date.getDate();
											var hour = date.getHours();
											var minute = date.getMinutes();
											var second = date.getSeconds();
											var time = year + '-' + month + '-'
													+ day + ' ' + hour + ':'
													+ minute + ':' + second;

											/*
											 * $("#suggestion") .append( "<li><a
											 * href=\"#\">" + text + "<span
											 * class=\"label label-info\">已解决</span><span>" +
											 * time + "</span></a></li>");
											 */
											$
													.ajax({
														type : "post",
														content : "application/x-www-from-urlencoded;charset=UTF-8",
														dataType : "json",
														url : "../teacherFeedback/save",
														data : "feedback.feedback_content="
																+ text
																+ "&feedback.feedback_anser_content="
																+ "kkk"
																+ "&feedback.feedback_is_ansered="
																+ 0
																+ "&feedback.feedback_update_time="
																+ time
																+ "&feedback.feedback_user_id="
																+ 4,
														async : false,
														success : function(
																result) {
															$("#alertdiv")
																	.show();
															var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
																	+ "<span aria-hidden=\"true\">&times;</span></button>"
																	+ result.result;
															$("#alertdiv")
																	.html(html);
															initial();
														},
														error : function(e) {
															console
																	.log("错误："
																			+ e.message);
														}
													});
										}

										$("#textarea1").val("");
									});

					/*
					 * 初始化页面
					 */
					function initial() {
						$
								.ajax({
									type : "post",
									content : "application/x-www-form-urlencoded;charset=UTF-8",
									dataType : "json",
									url : "../teacherFeedback/" + currentPage
											+ "-" + maxPage,
									async : "false",
									success : function(result) {
										var data = result.teacherFeedback.list;
										var html = "";
										for (var i = 0; i < data.length; i++) {
											if (data[i].feedback_is_ansered == true) {
												html += "<li id=\""
														+ data[i].feedback_id
														+ "\"><a href=\"#\">"
														+ data[i].feedback_content
														+ "<span class=\"label label-info\">"
														+ "已解决"
														+ "</span><span name=\"deleteSpan\">×</span><span>"
														+ data[i].feedback_update_time
														+ "</span><span>"
														+ data[i].user_name
														+ "</span></a></li>";
											} else {
												html += "<li id=\""
														+ data[i].feedback_id
														+ "\"><a href=\"#\">"
														+ data[i].feedback_content
														+ "<span class=\"label label-info\">"
														+ "未解决"
														+ "</span><span name=\"deleteSpan\">×</span><span>"
														+ data[i].feedback_update_time
														+ "</span><span>"
														+ data[i].user_name
														+ "</span></a></li>";
											}
										}
										$("#suggestion").html(html);
										currentPage = result.teacherFeedback.pageNumber;
										totalNum = result.teacherFeedback.totalPage;
										$("#currentPage").html(currentPage);
										$("#totalPage").html(totalNum);

										$("#suggestion li").find(
												"span[name='deleteSpan']")
												.hide();
										$("#suggestion li")
												.mouseover(
														function() {
															$(this)
																	.find(
																			"span[name='deleteSpan']")
																	.show();
														});
										$("#suggestion li")
												.mouseleave(
														function() {
															$(this)
																	.find(
																			"span[name='deleteSpan']")
																	.hide();
														});
										$("span[name='deleteSpan']")
												.click(
														function() {
															var id = $(this)
																	.parents(
																			"li")
																	.attr("id");
															$
																	.ajax({
																		type : "post",
																		content : "application/x-www-form-urlencoded;charset=UTF-8",
																		dataType : "json",
																		url : "../teacherFeedback/delete",
																		data : {
																			ID : id
																		},
																		async : "false",
																		success : function(
																				result) {
																			$(
																					"#alertdiv")
																					.show();
																			var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
																					+ "<span aria-hidden=\"true\">&times;</span></button>"
																					+ result.result;
																			$(
																					"#alertdiv")
																					.html(
																							html);
																			initial();
																		},
																		error : function(
																				e) {
																			console
																					.log("错误:"
																							+ e);
																		}
																	});
														});
									},
									error : function(e) {
										console.log("错误：" + e);
									}
								});
					}
					// 添加过后要刷新！！！！！！！！！！！！！！！！！！！
					// 跳转
					$("#goto")
							.bind(
									"click",
									function() {
										var gotopage = $("#gotoPage").val();
										if (!gotopage.match("^\\d+$")) {// 判断是否为数字
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>请输入规范的页码！";
											$("#alertdiv").html(html);
											return;
										}
										if (gotopage < 1 || gotopage > totalNum) {
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>超出总页数！";
											$("#alertdiv").html(html);
											return false;
										} else {
											currentPage = gotopage;
											// 调用查询
											initial();
										}

									});
					// 下一页
					$("#pageforward")
							.bind(
									"click",
									function() {

										if (currentPage < totalNum) {
											currentPage = parseInt(currentPage) + 1;
											// 调用查询
											initial();
										} else {
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>超出总页数！";
											$("#alertdiv").html(html);
											return;
										}

									});
					// 上一页
					$("#pagebackward")
							.bind(
									"click",
									function() {

										if (currentPage > 1) {
											currentPage = parseInt(currentPage) - 1;
											// 调用查询
											initial();
										} else {
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>小于总页数！";
											$("#alertdiv").html(html);
											return;
										}

									});
					// 点击首页，显示第一页数据
					$("#firstPage")
							.bind(
									"click",
									function() {
										if (currentPage == 1) {
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>已经第一页了！";
											$("#alertdiv").html(html);
											return false;
										} else {
											currentPage = 1;
											// 调用查询
											initial();
										}
									});
					// 点击末页，显示最后页数据
					$("#lastPage")
							.bind(
									"click",
									function() {
										if (currentPage == totalNum) {
											$("#alertdiv").show();
											var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
													+ "<span aria-hidden=\"true\">&times;</span></button>已经最后一页了！";
											$("#alertdiv").html(html);
											return false;
										} else {
											currentPage = totalNum;
											// 调用查询
											initial();
										}
									});
					// 每页显示页数
					$("#max")
							.bind(
									"change",
									function() {
										maxPage = $("#max").val();
										currentPage = 1;
										$("#alertdiv").show();
										var html = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"
												+ "<span aria-hidden=\"true\">&times;</span></button>每页显示"
												+ maxPage + "条!";
										$("#alertdiv").html(html);
										// alert(maxPage);
										// 调用查询
										initial();
									});
				});
// 只是為了測試一下
// @Author zengdan
/*
 * $("#add").click( function() { var feedbackContent = "hphp;h;ge";
 * feedbackAnserContent = "我也不知道啊啊"; feedbackIsAnsered = "1"; feedbackUpdateTime =
 * "2015-05-14 17:45:33"; feedbackUserId = "4"; // alert(isSetAdmin); $.ajax({
 * type : "post", content : "application/x-www-from-urlencoded;charset=UTF-8",
 * dataType : "json", url : "../teacherFeedback/save", data :
 * "feedback.feedback_content=" + feedbackContent +
 * "&feedback.feedback_anser_content=" + feedbackAnserContent +
 * "&feedback.feedback_is_ansered=" + feedbackIsAnsered +
 * "&feedback.feedback_update_time=" + feedbackUpdateTime +
 * "&feedback.feedback_user_id=" + feedbackUserId, async : false, success :
 * function(result) { alert(result.result); window.location.reload(); }, error :
 * function(e) { console.log("错误：" + e.message); } }); });
 */
// 測試到此為止
