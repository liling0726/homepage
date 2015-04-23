package swust.homepage.model;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class Acad extends Model<Acad> {
	private static final long serialVersionUID = 1897136132127624748L;
	public static final Acad dao = new Acad();
	
	/**
	 * @author ZengDan
	 * @return 含有acad表内所有学院的对象集
	 * */
	public List<Acad> acad(){
		return Acad.dao.find("select acad_name from acad");
	}
	
	/**
	 * @author ZengDan
	 * @return 含有acad表内所有学院以及dept表内对应学院包含的专业的对象集
	 * */
	public List<Acad> acadInfoMore() {//学院 -> 专业
		for(int i=0 ;i<Acad.dao.find("select dept_name, acad_name from dept, acad where dept_acad_id = acad_id").size();i++)
		{
			System.out.println(Acad.dao.find("select dept_name, acad_name from dept, acad where dept_acad_id = acad_id").get(i));
		}
		return Acad.dao.find("select dept_name, acad_name from dept, acad where dept_acad_id = acad_id");
	}
	/*
	 * 
	 * return List<List>
	 * @author CDK
	 * 
	 */
	//List<List<Dept>>
	public List<List<Dept>> academic()
	{
		List<List<Dept>> llist=new  ArrayList<List<Dept>>();
		List<Acad> academic=Acad.dao.find("select acad_id from acad");
		for(int i=0;i<academic.size();i++)
		{
			//llist.add(Dept.dao.find("select dept_name from dept where dept_acad_id =?",academic.get(i).getInt("acad_id")));
			List<Dept> depts=Dept.dao.find("select dept_name from dept where dept_acad_id =?",academic.get(i).getInt("acad_id"));
			System.out.println(Dept.dao.find("select dept_name from dept where dept_acad_id =?",academic.get(i).getInt("acad_id")));
			llist.add(depts);
		}
		
		return  llist;
		
	}
	public boolean delete(int id[])
	{
		boolean flag=true;
		for(int i=0;i<id.length;i++)
		{
		
			//Acad.dao.f
		}
		
		return flag;
		
	}
}
