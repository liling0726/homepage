package swust.homepage.controller;


import swust.homepage.model.BasicInfo;
import swust.homepage.model.Data;

import com.jfinal.core.Controller;

/**
 * 
 * @author zengdan
 * 教师个人展示页面
 * 
 */
public class TeacherPersonalShowController extends Controller {
	
	public void index(){
		//setSessionAttr("user_id", 4);
		setAttr("teacherBasicInfo", BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")).get(0));
		setAttr("teacherDataName", Data.dao.getDataName(getSessionAttr("user_id")));
		//System.out.println(Data.dao.getDataName(getSessionAttr("user_id")));
		if(Data.dao.getDataContent(getParaToInt(1))==null){
			setAttr("teacherDataContent", Data.dao.getFaultDataContent());
		}
		render("/html/teacherPersonalShow.html");
	}
	
	public void dataContent(){
		setAttr("teacherDataContent", Data.dao.getDataContent(getParaToInt(1)));
		render("/html/teacherPersonalShow.html");
	}
	
}
