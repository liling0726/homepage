package swust.homepage.controller;

import java.util.List;

import swust.homepage.model.BasicInfo;
import swust.homepage.model.User;

import com.jfinal.core.Controller;

public class TeacherPersonalInfoController extends Controller {
	
	/**
	 * @CDK
	 * 
	 * and = 才行
	 */
	
	public void index()
	{
		int user_id=getSessionAttr("user_id");
		BasicInfo basicinfo=BasicInfo.dao.find("select user_name,dept_name,basic_info_id,basic_info_title,basic_info_degree,basic_info_email,basic_info_phone,basic_info_address,basic_info_research,basic_info_allow_message,basic_info_model from user,dept,basic_info where user_dept_id=dept_id AND user_id=basic_info_user_id and user_id=?",user_id).get(0);;
		renderJson("basicInfo",basicinfo);

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
		 * method 1 	
		 */
			BasicInfo basicinfo=getModel(BasicInfo.class);
			basicinfo.set("basic_info_user_id",getSessionAttr("user_id"));
			if(basicinfo.save())
			{
				
				System.out.println("chenggong");
				
			}
			else
			{
				System.out.println("cuocuo");
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
