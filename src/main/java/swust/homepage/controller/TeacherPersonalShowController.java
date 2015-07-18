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
	//	int user_id=getSessionAttr("user_id");
		setSessionAttr("user_id", 4);
		//renderJson("teacherPersonalShow",  BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")));
		
		setAttr("teacherBasicInfo", BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")).get(0));
		setAttr("teacherDataContent", Data.dao.getDataName(getSessionAttr("user_id")));
		render("/html/teacherPersonalShow.html");
	}
	
	public void dataContent(){
		setAttr("teacherDataContent", Data.dao.getDataContent(getParaToInt("data")));
		render("/html/teacherPersonalShow.html");
	}
	
}
