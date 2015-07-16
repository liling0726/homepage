package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.BasicInfo;
import swust.homepage.model.User;

import com.jfinal.core.Controller;

public class TeacherPersonalInfoController extends Controller {
	
	/**
	 * @CDK
	 *要有判定才行，，，，
	 * and = 才行
	 */
	
	public void index()
	{
		int user_id=getSessionAttr("user_id");
		if(BasicInfo.dao.findFirst("select * from basic_info where basic_info_user_id=?",user_id)==null)
		{
		
			User basicinfo= User.dao.findFirst("select user_name ,user_url,dept_name from user,dept where user_id=?",user_id);
			renderJson("basicInfo",basicinfo);
		}
		else
		{
	
			BasicInfo basicinfo=BasicInfo.dao.find("select user_name,user_url,dept_name,basic_info_id,basic_info_title,basic_info_degree,basic_info_email,basic_info_phone,basic_info_address,basic_info_research,basic_info_allow_message,basic_info_model from user,dept,basic_info where user_dept_id=dept_id AND user_id=basic_info_user_id and user_id=?",user_id).get(0);;
			renderJson("basicInfo",basicinfo);
		}
		
	}
	/**
	 * @CDk
	 * 方法一
	 * 	所表单有ID
	 *  命名方式如下BasicInfo。XXX
	 * 方法二
	 * 前台所传数据，表单元素,且所传值有隐藏ID,前台必须要有ID
	 * <hide userId>
	 * <line1 name="name">
	 * <line2 name="occupation">
	 * <line3 name="degree">
	 * <line4 name="academic">
	 * <line5 name="email">
	 * <line6 name="phone">
	 * <line7 name="address">
	 * <line8 name="way">
	 * <line9 name="message">
	 */
	public void save()
	{
		/**
		 * 保存的应该是都有id的
		 * method 1
		 * 这张表中一定有id 	
		 * 后台添加判空机制
		 */

		String[]info={"title","degree","email","phone","address","research"};
		String[]basic={"basic_info_title","basic_info_degree","basic_info_email","basic_info_phone","basic_info_address","basic_info_research"};
		String[]infoget=new String[6];
		if(getParaToInt("id")==null)//新增加一个
		{
			BasicInfo bi=new BasicInfo();
			User user=User.dao.findById(getSessionAttr("user_id"));
			user.set("user_url", getPara("setsite"));
			bi.set("basic_info_user_id",getSessionAttr("user_id"));
			for(int i=0;i<info.length;i++)
			{
				if((infoget[i]=getPara(info[i]))=="")
				{
					
					infoget[i]="暂无数据";
					
				}
				bi.set(basic[i], infoget[i]);
			}
			int message=getParaToInt("message");
			int model=getParaToInt("model");
			bi.set("basic_info_allow_message",message);
			bi.set("basic_info_model",model);
			System.out.println(bi);
			
			if(bi.save()&&user.update())
			{
				
				renderJson("result","success");
				
			}
			else
			{
				
				renderJson("result","false");
				
			}
			
		
		}
		else
		{
			User user=User.dao.findById(getSessionAttr("user_id"));
			user.set("user_url", getPara("setsite"));
			BasicInfo basicinfo=BasicInfo.dao.findById(getParaToInt("id"));
			for(int i=0;i<info.length;i++)
			{
				if((infoget[i]=getPara(info[i]))=="")
				{
					
					infoget[i]="暂无数据";
					
				}
				basicinfo.set(basic[i], infoget[i]);
			}
			
			int message=getParaToInt("message");
			int model=getParaToInt("model");
			basicinfo.set("basic_info_allow_message",message);
			basicinfo.set("basic_info_model",model);
			
			if(basicinfo.update()&&user.update())
			{
				
				renderJson("result","success");
				
			}
			else
			{
				renderJson("result","false");
			}
			
		}
		
	}
	/**
	 * @CDK
	 * 为更多的请求按键做准备
	 */
	public void more()
	{
		
		
	}

}
