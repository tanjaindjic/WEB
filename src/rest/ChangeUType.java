package rest;

import java.util.HashMap;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.Users;
import model.User;

@Path("/changeutype")
public class ChangeUType {
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	
	public void updateUserType(HashMap<String, String> s){
		HashMap<String,User> users = Users.Instance().getUsers();
		for(String key : s.keySet()){
			if(users.containsKey(key)){
				users.get(key).setType(s.get(key));
			}
		}
		Users.Instance().saveUsers();
		
	}
}