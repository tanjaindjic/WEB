package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.SubForums;
import model.SubForum;

@Path("/editsub")
public class EditSub {
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void editSubForum(SubForum sf){
		System.out.println("USAOO DA EIDTUJE SUB");
		SubForums.Instance().editSubForum(sf);
		
	}
}
