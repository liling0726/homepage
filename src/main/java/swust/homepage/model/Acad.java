package swust.homepage.model;

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
		return Acad.dao.find("select dept_name, acad_name from dept, acad where dept_acad_id = acad_id");
	}
}
