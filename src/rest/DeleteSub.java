package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.SubForums;
import model.SubForum;
@Path("/deletesub")
public class DeleteSub {

	@POST	
	@Produces (MediaType.APPLICATION_JSON)
	public void deleteSub(String s){
		SubForum sf = SubForums.Instance().findForum(s);
		System.out.println("brisemo" + s);
		if(sf != null){
			
			
				try {
					SubForums.Instance().removeSubForum(sf);
				
				} catch (Exception e) {
					// TODO Auto-generated catch block
					//e.printStackTrace();
					System.out.println("Greska kod brisanja SubForuma");
					
				}
			
			}
	}
}
