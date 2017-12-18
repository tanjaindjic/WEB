package model;

import java.util.ArrayList;

import database.SubForums;
import database.Users;

public class Search {

	private ArrayList<Topic> topics;
	private ArrayList<SubForum> subForums;
	private ArrayList<User> users;
	public ArrayList<Topic> getTopics() {
		return topics;
	}
	public void setTopics(ArrayList<Topic> topics) {
		this.topics = topics;
	}
	public ArrayList<SubForum> getSubForums() {
		return subForums;
	}
	public void setSubForums(ArrayList<SubForum> subForums) {
		this.subForums = subForums;
	}
	public ArrayList<User> getUsers() {
		return users;
	}
	public void setUsers(ArrayList<User> users) {
		this.users = users;
	}
	public Search() {
		super();
		this.topics= new ArrayList<Topic>();
		this.subForums = new ArrayList<SubForum>();
		this.users = new ArrayList<User>();
		
	}
	public Search(ArrayList<Topic> topics, ArrayList<SubForum> subForums, ArrayList<User> users) {
		super();
		this.topics = topics;
		this.subForums = subForums;
		this.users = users;
	}
	
	public Search doSearch(String s){
		
		ArrayList<Topic> allTopics = new ArrayList<Topic>();
		ArrayList<SubForum> allSubForums = (ArrayList<SubForum>) SubForums.Instance().getAllSubForums();
		ArrayList<User> allUsers = (ArrayList<User>) Users.Instance().getAllUsers();
		for (SubForum sub : allSubForums) {
			if(sub.getTopics()!=null){
				for (Topic	t : sub.getTopics()) {
					allTopics.add(t);
				}
			}
		}
		
		for (User user : allUsers) {
			if(user.getUsername().toLowerCase().contains(s.toLowerCase())){
				if(!users.contains(user))
				users.add(user);
			}
		}
		
		for (SubForum sub : allSubForums) {
			if(sub.getDescription().toLowerCase().contains(s.toLowerCase())){
				if(!subForums.contains(sub))
				subForums.add(sub);
			}
			if(sub.getName().toLowerCase().contains(s.toLowerCase())){
				if(!subForums.contains(sub))
					subForums.add(sub);
			}
			if(sub.getMainModerator().toLowerCase().contains(s.toLowerCase())){
				if(!subForums.contains(sub))
					subForums.add(sub);
			}
			
		}
		
		for (Topic t : allTopics) {
			if(t.getContent().toLowerCase().contains(s.toLowerCase()))
				if(!topics.contains(t))
					topics.add(t);
			if(t.getName().contains(s.toLowerCase()))
				if(!topics.contains(t))
					topics.add(t);
			if(t.getAuthor().toLowerCase().contains(s.toLowerCase()))
				if(!topics.contains(t))
					topics.add(t);
			if(t.getParentForum().toLowerCase().contains(s.toLowerCase()))
				if(!topics.contains(t))
					topics.add(t);
		}
		
		
		return this;
	}
	
}
