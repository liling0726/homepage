package swust.homepage.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import swust.homepage.model.*;

import com.jfinal.core.Controller;

public class AdminHomePageController extends Controller{
	List<String>defaultEndDates=null;
	List<Object> readAllNumbers=null;
	public void index()
	{
		
		readAllNumber();
		renderJson("ahslk");
		
	}
	public void getTime()
	{
		defaultEndDates=new ArrayList<String>();
		readAllNumbers=new ArrayList<Object>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Date date[]= new Date[12];
		Calendar calendar = Calendar.getInstance();  //得到日历
		date[0]=new Date();
		calendar.setTime(date[0]);//把当前时间赋给日历
		for(int i=1;i<12;i++)
		{
			 calendar.add(Calendar.DAY_OF_MONTH, -i);  //设置为前一天
			 date[i] = calendar.getTime();   //得到前一天的时间
			 calendar = Calendar.getInstance(); 
			
		}
		for(int i=0;i<12;i++)
		{
			
			 String defaultEndDate = sdf.format(date[i]); //格式化当前时间
			 defaultEndDates.add(defaultEndDate);
		//	 System.out.println(defaultEndDate);
			
		}
		
		
		
		
		
		
	}
	
	public void loginNumber()
	{
		getTime();
		LoginLog bl=LoginLog.dao.find("SELECT count(*) FROM login_log WHERE time>=?",defaultEndDates.get(0)).get(0);
		readAllNumbers.add(bl.get("count(*)"));
		for(int i=1;i<12;i++)
		{
			bl=LoginLog.dao.find("select count(*) from login_log where time>=? and time<?",defaultEndDates.get(i),defaultEndDates.get(i-1)).get(0);
			readAllNumbers.add(bl.get("count(*)"));
		}
		renderJson("loginNumber",readAllNumbers);
		
		
	}
	/**
	 * 这个地方用到的时间查询很关键哈，以后忘了可以再看看
	 */
	
	public void readAllNumber()
	{
		getTime();
		BrowseLog bl=BrowseLog.dao.find("SELECT count(*) FROM browse_log WHERE time>=?",defaultEndDates.get(0)).get(0);
		readAllNumbers.add(bl.get("count(*)"));
		for(int i=1;i<12;i++)
		{
			bl=BrowseLog.dao.find("select count(*) from browse_log where time>=? and time<?",defaultEndDates.get(i),defaultEndDates.get(i-1)).get(0);
			readAllNumbers.add(bl.get("count(*)"));
		}
		renderJson("readAllNumbers",readAllNumbers);
	//	renderJson("haha");
	}
	//这里的时间就是比肩关键的地方,我就把他们当作是更新时间来看
	public void readNumber()
	{
		List<User> users=User.dao.find("SELECT user_name ,user_count,user_update_time FROM `user`  ORDER BY user_count DESC LIMIT 10");
		renderJson("readNumber",users);
		
		
	}
	
	public void feedBack()
	{
		List<Feedback> feeds=Feedback.dao.find("select feedback_content,feedback_update_time from feedback WHERE feedback_is_ansered=0 order by feedback_update_time desc");
		renderJson("feeds",feeds);
		
		
	}

	/**
	 * 操作日志
	 * Jin Long
	 */
	public void opLog() {
		List<OpLog> opLogs = OpLog.dao.get5Log();
		renderJson("result", opLogs);
	}
}
