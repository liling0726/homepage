package swust.homepage.util;

/**
 * @author 龙
 */
public class Tuple4<A, B, C, D> extends Tuple3<A, B, C> {
	private D _4;
	
	public Tuple4(A a, B b, C c, D d) {
		super(a, b, c);
		_4 = d;
	}
	
	public D get4() {
		return _4;
	}
}
