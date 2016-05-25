package com.validation.facebook;
import javax.jws.WebService;

import com.db.facebook.DBOperations;

@WebService
public class UserValidation {
	
	DBOperations db=new DBOperations(); 
	public String signUp(String username, String pwd, String firstName, String lastName)
	{
	System.out.println("inside signup");
	String result;
	result = db.signUp(username,pwd, firstName,lastName );
	return result;
	
	}
	
	public String signIn(String username, String pwd)
	{
	System.out.println("inside signin");
	String result;
	result = db.signIn(username,pwd );
	return result;
	
	}
	
	
}
