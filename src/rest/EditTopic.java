package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.SubForums;
import model.Topic;

@Path("/edittop")
public class EditTopic {
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void topEdit(Topic t	){
		System.out.println("OVDE JE USAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
		SubForums.Instance().editTopic(t);
		
	}
}
