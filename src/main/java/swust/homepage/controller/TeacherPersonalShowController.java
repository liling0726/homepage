package swust.homepage.controller;


import java.util.ArrayList;
import java.util.List;

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
		//setAttr("teacherBasicInfo", BasicInfo.dao.teacherPersonalShow(getSessionAttr("user_id")).get(0));
		//setAttr("teacherDataName", Data.dao.getDataName(getSessionAttr("user_id")));
		List<BasicInfo> list1 = new ArrayList<BasicInfo>();
		list1 = BasicInfo.dao.teacherPersonalShow(getPara(0));
		List<BasicInfo> list2 = new ArrayList<BasicInfo>();
		list2 = BasicInfo.dao.teacherPersonalData(getPara(0));
		List<List<BasicInfo>> list = new ArrayList<List<BasicInfo>>();
		list.add(list1);
		list.add(list2);
		setAttr("teacherBasicInfo", list);
		//System.out.println(Data.dao.getDataName(getSessionAttr("user_id")));
		if(getPara(1)==null){
			setAttr("teacherDataContent", Data.dao.getDefaultDataContent(getPara(0)));
		}
		render("/html/teacherPersonalShow.html");
	}
	
	public void dataContent(){
		setAttr("teacherDataContent", Data.dao.getDataContent(getPara(0), getPara(1)));
		render("/html/teacherPersonalShow.html");
	}
	
}
