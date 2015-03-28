package swust.homepage.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class GenData {
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		String from = "jdbc:mysql://localhost:3306/nsims?characterEncoding=UTF-8";
		String to = "jdbc:mysql://localhost:3306/homepage?characterEncoding=UTF-8";
		String username = "root";
		String pwd = "5555";
		
		Connection connFrom =
				DriverManager.getConnection(from, username, pwd);
		Statement stmt = connFrom.createStatement();
		
		String querySql = "select `tea_name`, `tea_num` from teacher";
		ResultSet rs = stmt.executeQuery(querySql);
		List<Tuple2<String, String>> res = new ArrayList<>();
		while(rs.next()) {
			res.add(new Tuple2<String, String>(rs.getString("tea_name")
							, rs.getString("tea_num")));
			
		}
		
		rs.close(); stmt.close(); connFrom.close();
		
		Connection connTo =
				DriverManager.getConnection(to, username, pwd);
		String sql = "insert into user(user_name, user_num, user_dept_id) values(?, ?, ?)";
		PreparedStatement ps = connTo.prepareStatement(sql);
		for (Tuple2<String, String> t: res) {
			ps.setString(1, t.getFirst());
			ps.setString(2, t.getSecond());
			ps.setInt(3, 1);
			ps.execute();
		}
		ps.close(); connTo.close();
		System.out.println("success");
	}
}

class Tuple2<T, K> {
	private T first;
	private K second;
	
	Tuple2(T t, K k) {
		first = t;
		second = k;
	}
	void setFirst(T t) {
		first = t;
	}
	
	T getFirst() {
		return first;
	}
	
	void setSecond(K k) {
		second = k;
	}
	
	K getSecond() {
		return second;
	}
	
	@Override public String toString() {
		return first.toString() + "##" + second.toString();
	}
}
