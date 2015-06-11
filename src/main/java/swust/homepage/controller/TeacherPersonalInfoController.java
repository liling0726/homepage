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
		BasicInfo basicinfo=BasicInfo.dao.find("select user_name,basic_info_id,basic_info_user_id,basic_info_title,basic_info_degree,basic_info_email,basic_info_phone,basic_info_address,basic_info_research,basic_info_allow_message,basic_info_model from user,basic_info where user_id=basic_info_user_id and user_id=?",user_id).get(0);;
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
//		getModel(BasicInfo.class).save();//必须要拿到id
		
		/**
		 *method 2 
		 *
		 */
		String []line=new String[8];

		int ID=getParaToInt("ID");
	//	int UserID=getParaToInt("userId");
	//一个for循环就可以了
		line[0]=getPara("name");
		line[1]=getPara("occupation");
		line[2]=getPara("degree");
		line[3]=getPara("academic");
		line[4]=getPara("email");
		line[5]=getPara("phone");
		line[6]=getPara("address");
		line[7]=getPara("way");
		line[8]=getPara("message");
		BasicInfo bI=BasicInfo.dao.findById(1);
		bI.set("basic_info_title",line[0]);
		bI.set("basic_info_degree",line[1]);
		bI.set("basic_info_email", line[2]);
		
		System.out.println(BasicInfo.dao.findById(1).get("basic_info_user_id"));
	}
	/**
	 * @CDK
	 * 为更多的请求按键做准备
	 */
	public void more()
	{
		
		
	}

}
