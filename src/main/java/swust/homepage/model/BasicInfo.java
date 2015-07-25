package swust.homepage.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

public class BasicInfo extends Model<BasicInfo> {
	private static final long serialVersionUID = 854052385309622998L;
	public static final BasicInfo dao = new BasicInfo();
	
	public List<BasicInfo> teacherPersonalShow(String userUrl){
		return find("select basic_info.*, user_name, user_url from basic_info, user where basic_info_user_id = user_id and user_url  = " + userUrl);
	}
	//老师对应的所有栏目
	public List<BasicInfo> teacherPersonalData(String userUrl){
		return find("select data_id, data_name, data_url from user, data"
				+ " where data_user_id = user_id and user_url  = " + userUrl);
	}
}
