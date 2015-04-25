package swust.homepage.service.impl;

import java.util.Optional;

import swust.homepage.model.Admin;
import swust.homepage.model.User;
import swust.homepage.service.LoginService;

/** @author jinlong */
public class LoginServiceImpl implements LoginService {

	@Override
	public Optional<User> checkTeacher(String userNum, String pwd) {
		User u = User.dao.findFirst("select user_id, user_url from user where user_num=?", userNum);
		if (u != null) {
			return Optional.of(u);
		}
		else
			return Optional.empty();
	}
	
	@Override
	public Optional<Admin> checkAdmin(String adminNum, String pwd) {
		Admin a = Admin.dao.findFirst("select * from admin where admin_num=?", adminNum);
		if (a != null)
			return Optional.of(a);
		else
			return Optional.empty();
	}
}