package database;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import model.User;

public class Users {
	
	private HashMap<String,User> allUsers;
	private static Users instance = null;
	
	@SuppressWarnings("unchecked")
	private Users(){
		HashMap<String,User> load = (HashMap<String,User>) Database.ReadObject("u");
		if(load == null){
			allUsers = new HashMap<String,User>();
			User admin = new User();
			
			admin.setUsername("admin");
			admin.setPass("admin");
			admin.setType("admin");
			allUsers.put(admin.getUsername(), admin);
		}else{
			allUsers = load;
		}
	}
	public void setAllUsers(HashMap<String,User> allUsers) {
		this.allUsers = allUsers;

	}
	public static Users Instance()
	{
		if(instance == null)
			instance = new Users();
		return instance;
	}
	public User updateUser(User u){
		
		User us=null;
		
		if(allUsers.containsKey(u.getUsername()))
			 us = allUsers.get(u.getUsername()).updateUser(u);
		saveUsers();
		return us;
	}
	
	public Collection<User> getAllUsers() {
		Collection<User> retVal = null;
		try{
			retVal  = new ArrayList<User>(allUsers.values());
		}catch(NullPointerException e)
		{
			retVal = new ArrayList<User>();
		}
		return retVal;
	}
	public HashMap<String,User> getUsers() {
		
		return allUsers;
	}
	public void addNewUser(User u)
	{
		if(!allUsers.containsKey(u.getUsername()))
		{
			allUsers.put(u.getUsername(), u);
			saveUsers();
		}else{
			System.out.println("user postoji vec");
		}
	}
	public void removeUser(User u)
	{
		if(allUsers.containsKey(u.getUsername()))
		{
			allUsers.remove(u.getUsername());
			saveUsers();
			
		}else
			System.out.println("user ne postoji vec");
			
	}
	
	public void saveUsers(){
		Database.SaveObject(allUsers, "u");
	}
	
	public void updateFollowing(String name){
		int idx = -1;

		for (User u : allUsers.values()) {
			if(u.getFollowing()!=null){
				if(!u.getFollowing().isEmpty()){
				   for(String sfname : u.getFollowing()){
					   if(sfname.equals(name)){
						   idx = u.getFollowing().indexOf(name);
						   break;
					   }
				   }
				   if(idx!=-1){
					   u.getFollowing().remove(idx);
					  System.out.println("uklonio: " + name);
				   }
				}
			}
		}
		 saveUsers();
	}
	
}
