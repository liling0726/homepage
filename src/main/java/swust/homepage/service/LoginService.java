package swust.homepage.service;

import java.util.Optional;

import swust.homepage.model.Admin;
import swust.homepage.model.User;
import swust.homepage.service.impl.LoginServiceImpl;

/** @author jinlong */
public interface LoginService {
	Optional<Admin> checkAdmin(String adminNum, String pwd);
	Optional<User> checkTeacher(String userNum, String pwd);
	
	static class IMPL {
		public static LoginService get() {
			return new LoginServiceImpl();
		}
	}
}
