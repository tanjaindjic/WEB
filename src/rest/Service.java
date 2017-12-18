package rest;

import java.net.URI;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import database.Users;
import model.User;

@Path("service")
public class Service {
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public Response start(){
		
		URI uri = URI.create("/start/index.html");
		return Response.temporaryRedirect(uri).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User u)
	{
		
		System.out.println("Testiranje");
		User response = null;	
		ArrayList<User> userslist = (ArrayList<User>) Users.Instance().getAllUsers();
		
		String uname = u.getUsername();
		String pass = u.getPass();
		
		for (User us : userslist) {
			if (us.getUsername().equals(uname) && us.getPass().equals(pass)) {
				response = us;
				System.out.println("salijem usera:" + us.getUsername());
				return Response.ok(response, MediaType.APPLICATION_JSON).build();
			}
		}
		
		System.out.println("Vracam NULL");
		return null;
	}
	/*
	@POST
	@Path("/search")
	@Consumes(MediaType.APPLICATION_JSON)
	public void searchResults(User u){
		System.out.println("hehheheheehheh");
		
	}*/
}
