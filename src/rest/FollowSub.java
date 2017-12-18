package rest;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.Users;
import model.User;
@Path("/followsub")
public class FollowSub {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void followSF(User u){
		System.out.println("uso barem");
		Users.Instance().updateUser(u);
		
			
	}
}
