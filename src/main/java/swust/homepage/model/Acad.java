package swust.homepage.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import Freeze.Map;

import com.jfinal.plugin.activerecord.Model;
import swust.homepage.util.Tuple2;
import swust.homepage.util.Tuple3;

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
	 * @author ZengDan
	 * @return 含有acad表内所有学院以及dept表内对应学院包含的专业的对象集
	 * */
	public HashMap<String, List<String>> acadInfoDept() {//学院 -> 专业
		List<Acad> list = new ArrayList<Acad>();
		HashMap<String, List<String>> acadMap = new HashMap<String, List<String>>();
		
		list =  Acad.dao.find("select acad_id from acad");
		for(int i=0; i<list.size(); i++){
			List<Acad> acadList = new ArrayList<Acad>();
			List<Acad> acadNameList = new ArrayList<Acad>();
			List<String> deptList = new ArrayList<String>();
			
			//System.out.println("list"+i+"---------"+list.get(i).get("acad_id"));
			acadList = Acad.dao.find("select dept_name from dept, acad where dept_acad_id = acad_id and acad_id = "+list.get(i).get("acad_id"));
			
			for(int j=0; j<acadList.size(); j++){
				deptList.add("deptName:"+acadList.get(j).getStr("dept_name"));
				//System.out.println("acadList.dept_name--------"+acadList.get(j).getStr("dept_name"));
			}
			
			acadNameList = Acad.dao.find("select acad_name from acad where acad_id = "+list.get(i).get("acad_id"));
			acadMap.put("acadName:"+acadNameList.get(0).getStr("acad_name"), deptList);
			//System.out.println("acadName--------"+acadNameList.get(0).getStr("acad_name"));
			//System.out.println("deptList--------"+deptList);
			//System.out.println("acadMap---------"+acadMap);
		}
		return acadMap;
	}

	public List<Tuple3<Integer, String, List<Dept>>> acadWithDept() {
		List<Acad> acads = find("select * from acad");

		List<Tuple3<Integer, String, List<Dept>>> result = new ArrayList<>();
		for (Acad acad : acads) {
			List<Dept> depts = Dept.dao
					.find("select * from dept where dept_acad_id=" + acad.get("acad_id"));
			result.add(new Tuple3<>(acad.get("acad_id"), acad.get("acad_name"), depts));
		}

		return result;
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
