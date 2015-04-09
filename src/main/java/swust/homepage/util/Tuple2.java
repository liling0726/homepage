package swust.homepage.util;

/**
 * 
 * @author jinlong
 *
 */
public class Tuple2<A, B> {
	private A _1;
	private B _2;
	
	public Tuple2(A a, B b) {
		_1 = a; _2 = b;
	}
	
	public A get1() {
		return _1;
	}
	
	public B get2() {
		return _2;
	}
}
