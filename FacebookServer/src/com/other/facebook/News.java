package com.other.facebook;
import java.util.ArrayList;

import javax.jws.WebService;

import com.db.facebook.DBOperations;

@WebService
public class News {
	DBOperations db=new DBOperations();

	public Object[] getNews(String email) throws Exception{
		System.out.println("inside getprofile info ");
		ArrayList<String> result = null;
		result= db.news(email);
		Object[] resultArr = result.toArray();
		//return result;
		return resultArr;
	}
	


}
