package com.other.facebook;
import java.util.ArrayList;

import javax.jws.WebService;

import com.db.facebook.DBOperations;

@WebService
public class Friends {
	DBOperations db=new DBOperations();

	public Object[] fetchFriends(String email) throws Exception{
		System.out.println("inside getprofile info ");
		ArrayList<String> result = null;
		result= db.getFriends(email);
		Object[] resultArr = result.toArray();
		//return result;
		return resultArr;
	}
	


}
