package swust.homepage.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Model;

public class Acad extends Model<Acad> {
	private static final long serialVersionUID = 1897136132127624748L;
	public static final Acad dao = new Acad();
	
	/**
	 * @author ZengDan
	 * @return 含有acad表内所有学院的对象集
	 * */
	public List<Acad> acad(){
		return Acad.dao.find("select * from acad");
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
	/**
	 * @author BinJian
	 * @param key 
	 * @return
	 */
	public List<Acad> findAcadOrDeptByKey(String key){
		return Acad.dao.find("select acad.acad_name,dept.dept_name"
				+" from acad,dept where"
				+ " (acad_name like '%"+key+"%'"
				+ " or dept.dept_name like '%"+key+"%')"
				+ " and dept.dept_acad_id = acad.acad_id");
	}
	/*
	 * 
	 * return List<List>
	 * @author CDK
	 * 
	 */
	//List<List<Dept>>
	/*public Map<String,List<Dept>> academic()
	{
		List<List<Dept>> llist=new  ArrayList<List<Dept>>();
		Map<String,List<Dept>> map=new HashMap<String,List<Dept>>();
	
		List<Acad> academic=Acad.dao.find("select * from acad");
		for(int i=0;i<academic.size();i++)
		{
			
			List<Dept> depts=Dept.dao.find("select dept_name from dept where dept_acad_id =?",academic.get(i).getInt("acad_id"));
			
			map.put(academic.get(i).get("acad_name").toString(),depts);
			
		}
		
		return  map;
		
	}*/

	/*public boolean delete(int id[])
	{
		boolean flag=true;
		for(int i=0;i<id.length;i++)
		{
		
			//Acad.dao.f
		}
		
		return flag;
		
	
	}*/
}
