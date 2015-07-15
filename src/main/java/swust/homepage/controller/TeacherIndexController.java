package swust.homepage.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import swust.homepage.model.BrowseLog;
import swust.homepage.model.Feedback;
import swust.homepage.model.Message;
import swust.homepage.model.Data;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;

public class TeacherIndexController extends Controller {
	public void index() {
		setSessionAttr("user_id", 4);
		renderJson("teacherMessage", Message.dao.teacherMessage(getParaToInt(0, 1), getParaToInt(1, 10), getSessionAttr("user_id")));
		
	}

	public void message() {
		renderJson("message", Message.dao.teacherMessage(
				getParaToInt("pageNumber", 1), getParaToInt("pageSize", 3),
				getParaToInt("userId",5)));
	}

	public void feedback() {
		renderJson("feedback", Feedback.dao.teacherFeedback(
				getParaToInt("pageNumber", 1), getParaToInt("pageSize", 3),
				getParaToInt("userId")));
	}

	public void data() {
		renderJson("data", Data.dao.findAllOrderByCount(getParaToInt("userId")));
	}

	@SuppressWarnings("static-access")
	public void dayBrowse() {
		int dayNum = getParaToInt("dayNum");
		Long[] dayBrowse = new Long[dayNum];
		//Map<String, Long> dayBrowse = new HashMap<String, Long>();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		for (int i = 0; i < dayNum; i++) {
			Date date1 = new Date();// 取时间
			Date date2 = new Date();
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(date1);
			calendar.add(calendar.DATE, 0 - i);// 把日期往后增加一天.整数往后推,负数往前移动
			date1 = calendar.getTime(); // 这个时间就是日期往后推一天的结果
			calendar.add(calendar.DATE, 1);
			date2 = calendar.getTime();
			//Long x 
			dayBrowse[i]= Db
					.queryLong("select count(*) from browse_log where browse_log.user_id="
							+ getPara("userId")
							+ " and browse_log.time>='"
							+ df.format(date1)
							+ "' and browse_log.time<'"
							+ df.format(date2) + "'");
			//System.out.println(df.format(date1) + " " + x);
			//dayBrowse.put(df.format(date1), x);

		}
		renderJson("dayBrowse", dayBrowse);
	}
}
