package com.other.facebook;
import java.util.ArrayList;

import javax.jws.WebService;

import com.db.facebook.DBOperations;

@WebService
public class About {
	DBOperations db=new DBOperations();

	public Object[] userAbout(String email) throws Exception{
		System.out.println("inside getprofile info ");
		ArrayList<String> result = null;
		result= db.about(email);
		Object[] resultArr = result.toArray();
		//return result;
		return resultArr;
	}
	


}
