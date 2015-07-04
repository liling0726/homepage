package swust.homepage.controller;

import swust.homepage.model.BasicInfo;
import swust.homepage.model.Data;

import com.jfinal.core.Controller;

public class TeacherPersonalShowController extends Controller {
	
	public void index(){
		setSessionAttr("user_id", 4);
		renderJson("teacherPersonalShow",  BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")));
		//System.out.println(BasicInfo.dao.teacherPersonalShow(4));
		//renderJson("teacherPersonalShow",  BasicInfo.dao.teacherPersonalShow(4));
	}
	
	public void getTeacherDataContent(){
		setSessionAttr("user_id", 4);
		renderJson("teacherDataContent",  Data.dao.getDataContent(getSessionAttr("user_id")));
		//System.out.println(Data.dao.getDataContent(4));
		//renderJson("teacherDataContent",  Data.dao.getDataContent(4));
	}
}
