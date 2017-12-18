package rest;
import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

import database.Database;
import database.Users;
import model.User;

@Path("/register")
public class Register {
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User u)
	{
		
		HashMap<String, Object> response = new HashMap<String, Object>();	
		ArrayList<User> korisnici = (ArrayList<User>) Users.Instance().getAllUsers();
		
		String korisnickoIme = u.getUsername();
		String lozinka = u.getPass();
		
		for (User k : korisnici) {
			if (k.getUsername().equals(korisnickoIme)) {
				response.put("user", null);
				System.out.println("salijem null usera");
				return Response.ok(response, MediaType.APPLICATION_JSON).build();
			}
		}
		korisnici.add(u);
		HashMap<String,User> allUsers = Users.Instance().getUsers();
		allUsers.put(u.getUsername(), u);
		Users.Instance().setAllUsers(allUsers);
		
		response.put("user", u);
		System.out.println("salijem usera:" + u.getUsername() +"sacuvao: " + Database.SaveObject(allUsers, "u"));
		return Response.ok(response, MediaType.APPLICATION_JSON).build();
	}
}
