package rest;

import java.util.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.Users;
import model.User;

@Path("/allusers")
public class GetUsers {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllUsers(){
		return Users.Instance().getAllUsers();
	}
}
