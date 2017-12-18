package rest;

import java.util.HashMap;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import database.SubForums;
import model.SubForum;

@Path("/newsub")
public class NewSub {
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addSub(SubForum sf)
	{
		System.out.println("uso da doda nov sf:" + sf.getName());
		HashMap<String, Object> response = new HashMap<String, Object>();	
		HashMap<String,SubForum> allSubForums = SubForums.Instance().getSubForums();
		
		
			if (allSubForums.containsKey(sf.getName())) {
				response.put("sf", null);
				System.out.println("salijem null sub");
				return Response.ok(response, MediaType.APPLICATION_JSON).build();
			}
		
			SubForums.Instance().addNewSubForum(sf);
			System.out.println("dodao sf:" + sf.getName());
		
		response.put("sf", sf);
		System.out.println("salijem sf:" + sf.getName());
		return Response.ok(response, MediaType.APPLICATION_JSON).build();
	}
}
