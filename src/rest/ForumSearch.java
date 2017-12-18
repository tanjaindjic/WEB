package rest;

import java.util.HashMap;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import model.Search;

@Path("/search")
public class ForumSearch {
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	
	public Search search(HashMap<String, String> s){
		
		Search sr = new Search();
		
		return sr.doSearch(s.get("value"));
	}
}
