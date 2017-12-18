package model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.UUID;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class User implements Serializable{
	private String username;
	private String pass;
	private String firstname;
	private String lastname;
	private String email;
	private int phone;
	private ArrayList<String> following;
	private ArrayList<String> savedTopics;
	private ArrayList<Comment> savedComments;
	private int likes;
	private int dislikes;
	private String type;
	public ArrayList<String> getSavedTopics() {
		return savedTopics;
	}
	public void setSavedTopics(ArrayList<String> savedTopics) {
		this.savedTopics = savedTopics;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public User(){}
	public User(String username, String pass, String firstname, String lastname, String email, int phone, 
			ArrayList<String> following, String type, ArrayList<String> savedTopics, ArrayList<Comment> savedComments, int likes, int dislikes) {
		super();
		this.username = username;
		this.pass = pass;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.following = following;
		this.type = "regular";
		this.savedTopics = savedTopics;
		this.savedComments = savedComments;
		this.likes = likes;
		this.dislikes = dislikes;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getPhone() {
		return phone;
	}
	public void setPhone(int phone) {
		this.phone = phone;
	}
	public User updateUser(User u){
		
		this.pass = u.pass;		
		this.username = u.username;
		this.following = u.following;
		this.savedTopics = u.savedTopics;
		this.savedComments = u.savedComments;
		this.dislikes = u.dislikes;
		this.likes = u.likes;
		return this;
		
	}
	public ArrayList<String> getFollowing() {
		return following;
	}
	public void setFollowing(ArrayList<String> following) {
		this.following = following;
	}
	public ArrayList<Comment> getSavedComments() {
		return savedComments;
	}
	public void setSavedComments(ArrayList<Comment> savedComments) {
		this.savedComments = savedComments;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getDislikes() {
		return dislikes;
	}
	public void setDislikes(int dislikes) {
		this.dislikes = dislikes;
	}
	
}
