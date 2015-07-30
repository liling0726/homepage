package swust.homepage.controller;


import java.util.ArrayList;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sun.prism.impl.Disposer;
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

	public void view() {
		if (getPara(1) == null) { // 只有一个参数

			Record basicInfo = Db.findFirst("select basic_info.*, user_name, user_url " +
					"from basic_info, user where basic_info_user_id = user_id and user_url = '" + getPara(0) + "'");
			setAttr("basicInfo", basicInfo);
			System.out.println(basicInfo);

			Record dataContent = Db.findFirst("select data_content from data" +
					" where data_user_id=(select user_id from user where user_url = '" + getPara(0) +
					"') order by data_order limit 1");
			setAttr("dataContent", dataContent);
			System.out.println(dataContent);

			List<Record> urlInfo = Db.find("select data_name, data_url from data, user" +
					" where data_user_id = user_id and user_url = '" + getPara(0) + "' order by data_order");
			setAttr("urlInfo", urlInfo);
			System.out.println(urlInfo);

		} else if (getPara(2) == null) { // 只有两个参数

			Record basicInfo = Db.findFirst("select basic_info.*, user_name, user_url " +
					"from basic_info, user where basic_info_user_id = user_id and user_url = '" + getPara(0) + "'");
			setAttr("basicInfo", basicInfo);

			Record dataContent = Db.findFirst("select data_content from data" +
					" where data_user_id=(select user_id from user where user_url = '" + getPara(0) +
					"') and data_url = '" + getPara(1) + "'");
			setAttr("dataContent", dataContent);

			List<Record> urlInfo = Db.find("select data_name, data_url from data, user" +
					" where data_user_id = user_id and user_url = '" + getPara(0) + "' order by data_order");
			setAttr("urlInfo", urlInfo);
		}

		render("/html/teacherPersonalShow.html");
	}
	
}
