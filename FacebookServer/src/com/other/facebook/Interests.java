package com.other.facebook;
import java.util.ArrayList;

import javax.jws.WebService;

import com.db.facebook.DBOperations;

@WebService
public class Interests {
	DBOperations db=new DBOperations();

	public Object[] userInterests(String email) throws Exception{
		System.out.println("inside getprofile info ");
		ArrayList<String> result = null;
		result= db.interests(email);
		Object[] resultArr = result.toArray();
		//return result;
		return resultArr;
	}
	


}
