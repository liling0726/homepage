package swust.homepage.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sun.prism.impl.Disposer;
import swust.homepage.model.BasicInfo;
import swust.homepage.model.Data;

import com.jfinal.core.Controller;
import swust.homepage.util.Tuple2;

/**
 * 
 * @author zengdan
 * 教师个人展示页面
 * 
 */
public class TeacherPersonalShowController extends Controller {

    private Record basicInfo;
	
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

    // 一团乱麻！！！如何是好
	public void view() {
		String userUrl = getPara(0);
		if (userUrl == null || !exist(userUrl)) {
			redirect("/html/homePage.html");
			return;
		} else {
			if (getPara(1) == null) { // 只有一个参数

				setBasicInfo(); // 设置基本信息

				Record dataContent = Db.findFirst("select data_content, data_type from data" +
						" where data_user_id=(select user_id from user where user_url = '" + getPara(0) +
						"') order by data_order limit 1");
				setAttr("dataContent", dataContent);

				setUrlInfo(); // 设置URL信息

			} else if (getPara(2) == null) { // 只有两个参数 可能是栏目 可能是新闻列表

				setBasicInfo();

				Record dataContent = Db.findFirst("select data_id, data_content, data_type, data_url from data" +
						" where data_user_id=(select user_id from user where user_url = '" + getPara(0) +
						"') and data_url = '" + getPara(1) + "'");

				if (dataContent.getInt("data_type") == 1) { // 如果是新闻则返回新闻列表
					List<Record> newsList = Db.find("select news_title, news_num, news_create_time, news_update_time, news_istop" +
							" from news where news_data_id=" + dataContent.get("data_id"));
					setAttr("dataContent", dataContent);
					setAttr("newsList", newsList);
				} else
					setAttr("dataContent", dataContent);

				setUrlInfo();

			} else if (getPara(3) == null) { // 有三个参数 即详细的新闻内容

				setBasicInfo();

				Record dataContent = Db.findFirst("select data_id, data_content, data_type, data_url from data where" +
						" data_user_id=(select user_id from user where user_url = '" + getPara(0) +
						"') and data_url = '" + getPara(1) + "'");
				setAttr("dataContent", dataContent);

				// 查询新闻内容
				Record newsContent = Db.findFirst("select news_title, news_content, news_create_time, news_update_time" +
						" from news where news_user_id=" + basicInfo.get("user_id") +
						" and news_data_id=" + dataContent.get("data_id") + " and news_num=" + getPara(2));
				setAttr("newsContent", newsContent);


				setUrlInfo();

				setAttr("detail", true);
			} else {
				return;
			}
		}
		render("/html/teacherPersonalShow.html");
	}

	// ------------------------Help Functions-------------------------------------------

	private void setBasicInfo() {
        basicInfo = Db.findFirst("select basic_info.*, user_name, user_url " +
                "from basic_info, user where basic_info_user_id = user_id and user_url = '" + getPara(0) + "'");
        setAttr("basicInfo", basicInfo);
    }

    private void setUrlInfo() {
        List<Record> urlInfo = Db.find("select data_name, data_url, data_type, data_nature from data, user" +
                " where data_user_id = user_id and user_url = '" + getPara(0) + "' order by data_order");
        setAttr("urlInfo", urlInfo);
    }

	private boolean exist(String userUrl) {
		Integer userID = Db.queryInt("select user_id from user where user_url='" + userUrl +"'");
		if (userID == null)
			return false;
		else
			return true;
	}
}
