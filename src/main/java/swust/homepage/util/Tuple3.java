package swust.homepage.util;

/**
 * @author jinlong
 */
public class Tuple3<A, B, C> extends Tuple2<A, B> {
	private C _3;
	
	public Tuple3(A a, B b, C c) {
		super(a, b);
		_3 = c;
	}
	
	public C get3() {
		return _3;
	}

}
