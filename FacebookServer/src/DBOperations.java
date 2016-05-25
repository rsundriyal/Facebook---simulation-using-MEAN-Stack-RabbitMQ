
import java.sql.*;

import java.util.ArrayList;
public class DBOperations {
	JSONConversion objConvert = new JSONConversion();
	Connection con = null;
	static ResultSet rs;
    Statement stmt = null;
	
	public DBOperations(){		
		try {			
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306/facebook","root","");
				stmt = con.createStatement();
				if(!con.isClosed())
					System.out.println("Successfully Connected!!!");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}

	public String signUp(String userName, String pwd, String firstName, String lastName ){
		String result = "";
		int rowcount;
		try {
			String query = "Insert into users (email, user_password, first_name, last_name, city, dob, last_login) values ('" + userName + "', '" + pwd + "', '" + firstName + "','" + lastName + "', NOW())";
			System.out.println("query "+ query);
			rowcount=stmt.executeUpdate(query);
			if(rowcount > 0){
				result="true";
				System.out.println("User Created");
			}
			else{
				result="false: The data could not be inserted in the database.";
			}	
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	
	

	public String signIn(String userName, String pwd){
		String result = "";
		String password =pwd;
		
		try {
			String query ="SELECT COUNT(*) AS total, email, user_password from users where email='"+userName+"'";
			 ResultSet rs = stmt.executeQuery(query);
			
			 while(rs.next()){
				 String db_password = rs.getString("user_password");
				 System.out.println("db password "+db_password);
				 int count = rs.getInt("total");
			 if(count == 0){
				 System.out.println("Email not exists");
				 result ="The account does not exist!!";
			 }
			 else if(db_password.equals(password)){
				 result="loggedin";
				System.out.println("SignedIn Successful");
			}
			else{
				result="false: The data could not be inserted in the database.";
			}	
			 }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}


	public ArrayList<String> about(String email) throws Exception{
	ArrayList<String> al = new ArrayList<String>();
	ArrayList<String> list = new ArrayList<String>();
	String emailid =email;
	try {
		String query ="SELECT first_name, last_name, city, currently, dob FROM user where email='"+emailid+"'  ";
		ResultSet rs = stmt.executeQuery(query);
		
		 while(rs.next())
         {
              al.add(rs.getString("first_name"));
          al.add(rs.getString("last_name"));
          al.add(rs.getString("currently"));
          al.add(rs.getString("city"));
          al.add(rs.getString("dob"));
        
          
           
              list.addAll(al);
         }
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return list;
	 
	
	}

	

	
	
	

}
