package swust.homepage.controller;


import swust.homepage.model.BasicInfo;
import swust.homepage.model.Data;

import com.jfinal.core.Controller;

/**
 * 
 * @author zengdan
 * 教师个人展示页面
 */
public class TeacherPersonalShowController extends Controller {
	
	public void index(){
		setSessionAttr("user_id", 4);
		//renderJson("teacherPersonalShow",  BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")));
		
		setAttr("teacherBasicInfo", BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")));
		render("/html/teacherPersonalShow.html");
	}
	
	//获取教师栏目内容
	public void getTeacherDataContent(){
		setSessionAttr("user_id", 4);
		//renderJson("teacherDataContent",  Data.dao.getDataContent(getSessionAttr("user_id")));
		
		setAttr("teacherDataContent", BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")));
		render("/html/teacherPersonalShow.html");
	}
}
