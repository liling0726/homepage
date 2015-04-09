package swust.homepage.service;

import swust.homepage.service.impl.LoginService;
import swust.homepage.util.Tuple2;

/**
 * @author jinlong
 */
public interface SLogin {
	Tuple2<Boolean, String> loginCheck(String userNum);
	
	static class I {
		public static SLogin get() {
			return new LoginService();
		}
	}
}
