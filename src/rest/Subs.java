package rest;

import java.util.Collection;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import database.Database;
import database.SubForums;
import database.Users;
import model.SubForum;
import model.User;

@Path("/subs")
public class Subs {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SubForum> allSubForums()
	{
		System.out.println("Trazi subove");
		
		return SubForums.Instance().getAllSubForums();
	}	
	
	
	
	
	
}
