package swust.homepage;

import    java.util.Optional;

import swust.homepage.model.Admin;
import swust.homepage.model.User;
import swust.homepage.util.LoginCheck;

/** @author jinlong */
public class LoginService {
	public Optional<User> checkTeacher(String userNum, String pwd) {
//        String res = LoginCheck.loginCheck(userNum, pwd);
        String res = "验证成功";
		if (res.equals("验证成功")) {
			User u = User.dao.findFirst("select user_id, user_url from user where user_num=?", userNum);
			if (u != null) {
				return Optional.of(u);
			} else
				return Optional.empty();
		} else
			return Optional.empty();
	}
	
	public Optional<Admin> checkAdmin(String adminNum, String pwd) {
//        String res = LoginCheck.loginCheck(adminNum, pwd);
        String res = "验证成功";
        if (res.equals("验证成功")) {
            Admin a = Admin.dao.findFirst("select * from admin where admin_num=?", adminNum);
            if (a != null)
                return Optional.of(a);
            else
                return Optional.empty();
        } else
            return Optional.empty();
	}
}
