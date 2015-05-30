package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class Feedback extends Model<Feedback>{
	private static final long serialVersionUID = -2086698502681557133L;
	public static final Feedback dao = new Feedback();

	/**
	 * @param pageNumber查询页数
	 * @param pageSize每页的数量
	 * @return 含有所有反馈信息的对象集
	 */
	public Page<Feedback> teacherFeedback(int pageNumber, int pageSize, int userId) {
		return paginate(pageNumber, pageSize, "select feedback.*, user_name ", "from feedback, user where feedback_user_id = user_id and user_id = " + userId);
	}
}
