package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class Dept extends Model<Dept> {
	private static final long serialVersionUID = -450036181371802172L;
	public static final Dept dao = new Dept();
	/**
	 * @author 刘杰
	 * @param acadId 学院id
	 * @return 包含该学院下所有专业的List<Dept>
	 */
	public List<Dept> findByAcadId(int acadId){
		String sql="select * from dept where dept_acad_id="+String.valueOf(acadId);
		return find(sql);
	}
	/**
	 * @author CDK
	 * @param deptname
	 * @param id
	 * @for adminAcadInfo.html
	 */
	public void addDept(String deptname,int id)
	{
	
		Dept dept=new Dept();
		dept.set("dept_name", deptname);
		dept.set("dept_acad_id", id);
		dept.save();
		
		
	}
	/**
	 * 获取专业的id对应的学院的id
	 * @author 刘杰
	 * @param deptId 专业id
	 * @return 对应的学院的id
	 */
	public int getAcadIdByDeptId(int deptId){
		Dept dept=findById(deptId);
		int acadId=dept.getInt("dept_id");
		return acadId;
	}
}
