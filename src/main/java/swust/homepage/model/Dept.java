package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

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
}
