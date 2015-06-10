package swust.homepage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Before;
import swust.homepage.AuthInterceptor;
import swust.homepage.model.Acad;
import swust.homepage.model.Dept;
import swust.homepage.model.User;

import com.jfinal.core.Controller;
/**
 * Controller for adminAcadInfo.html
 * @author CDK
 *
 */
@Before(AuthInterceptor.class)
public class AdminAcadInfoController extends Controller{
	public void index()
	{
	
		renderJson("result",Acad.dao.acadInfoMore());
	}
	public void findAcadOrDept(){
		renderJson("result",Acad.dao.findAcadOrDeptByKey(getPara("key")));
	}
	/**
	 * @author CDK
	 */
	public void addDept()
	{
		String oneDept=getPara("oneDept");
		String acadName=getPara("acadName");
		int id=Acad.dao.find("select acad_id from acad where acad_name=?",acadName).get(0).get("acad_id");
		Dept.dao.addDept(oneDept,id);
		index();
		
	}
	/**
	 * @author CDK
	 * 
	 */
	public void deleteDept()
	{
		String deptName=getPara("deptStr");
		String []delete=deptName.split("-");
		int id;
		for(int i=1;i<delete.length;i++)
		{
		
			id=	Dept.dao.find("select dept_id from dept where dept_name=?",delete[i]).get(0).getInt("dept_id");
			Dept.dao.deleteById(id);
		}
		System.out.println(deptName);
		index();
	}
}
