package swust.homepage.util;

import java.sql.*;

/**
 * Jin Long
 * 2015/7/23
 */
public class DBUtils {

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/homepage?characterEncoding=UTF-8";
        Connection conn = DriverManager.getConnection(url, "root", "5555");

        Statement stmt = conn.createStatement();
        String sql = "SELECT user_id, user_url FROM user";
        ResultSet rs = stmt.executeQuery(sql);

        PreparedStatement ps = conn.prepareStatement("UPDATE user set user_url=? WHERE user_id=?");
        while (rs.next()) {
            String oldUrl = rs.getString("user_url");
            Integer id = rs.getInt("user_id");
            ps.setString(1, oldUrl.substring(5));
            ps.setInt(2, id);
            ps.execute();
        }
    }

}
