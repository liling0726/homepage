package swust.homepage.controller;

import swust.homepage.model.BasicInfo;

import com.jfinal.core.Controller;

public class TeacherPersonalShowController extends Controller{
	public void Index(){
		setSessionAttr("user_id", 4);
		renderJson("teacherPersonalShow", BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")));
	}
}
