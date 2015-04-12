package swust.homepage.service.impl;

import swust.homepage.model.User;
import swust.homepage.service.LoginService;
import swust.homepage.util.Tuple2;

/**
 * @author jinlong
 */
public class LoginServiceImpl implements LoginService {

	@Override
	public Tuple2<Boolean, String> loginCheck(String userNum) {
		User u = User.dao.findFirst("select user_id, user_url from user where user_num="+userNum);
		Integer id = u.getInt("user_id");
		String url = u.getStr("user_url");
		if (id != null)
			return new Tuple2<>(true, url);
		else
			return new Tuple2<>(false, "");
	}

}
