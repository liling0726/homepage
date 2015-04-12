package swust.homepage.service;

import swust.homepage.service.impl.LoginServiceImpl;
import swust.homepage.util.Tuple2;

/**
 * @author jinlong
 */
public interface LoginService {
	Tuple2<Boolean, String> loginCheck(String userNum);
	
	static class I {
		public static LoginService get() {
			return new LoginServiceImpl();
		}
	}
}
