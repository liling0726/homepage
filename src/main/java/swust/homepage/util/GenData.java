package swust.homepage.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

public class GenData {
	public static void main(String[] args) throws SQLException, ClassNotFoundException, ParseException {
        Class.forName("com.mysql.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/nsims?characterEncoding=UTF-8&user=root&password=5555";
        String url2 = "jdbc:mysql://localhost:3306/homepage?characterEncoding=UTF-8&user=root&password=5555";
        Connection conn = openMySqlConn(url).get();
        Connection conn2 = openMySqlConn(url2).get();

//        String start = "2015-1-21 12:55:33", end = "2015-3-25 20:34:12";

        Statement st = conn2.createStatement();
        ResultSet rs = st.executeQuery("select user_id from user");
        PreparedStatement ps = conn2.prepareStatement("update user set user_count=? where user_id=?");

        Random r = new Random();
        while (rs.next()) {
            ps.setInt(1, r.nextInt(2500));
            ps.setInt(2, rs.getInt("user_id"));
            ps.execute();
        }
        conn.close(); conn2.close();
        System.out.println("success");

    }

    static Optional<Connection> openMySqlConn(String url) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            return Optional.of(DriverManager.getConnection(url));
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return Optional.<Connection>empty();
    }

    static String randomDatetime(String beginDate, String endDate) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date start = format.parse(beginDate);
        Date end = format.parse(endDate);

        if (start.getTime() >= end.getTime())
            return null;

        long date = random(start.getTime(), end.getTime());
        return format.format(new Date(date));
    }

    static long random(long begin, long end) {
        long res;
        do {
           res = begin + (long)(Math.random() * (end - begin));
        } while (res == begin || res == end);
        return res;
    }
}
