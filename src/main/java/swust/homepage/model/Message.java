package swust.homepage.model;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

public class Message extends Model<Message> {
	private static final long serialVersionUID = 3845170855212521938L;
	public static final Message dao = new Message();
	
	/**
	 * @param pageNumber查询页数
	 * @param pageSize每页的数量
	 * @return 含有所有留言信息的对象集
	 */
	public Page<Message> teacherMessage(int pageNumber, int pageSize, int userId) {
		return paginate(pageNumber, pageSize, "select message_email, message_content, user_name ", "from message, user where message_user_id = user_id and user_id = " + userId);
	}
}
