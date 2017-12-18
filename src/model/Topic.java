package model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import database.Database;
import database.SubForums;


public class Topic implements Serializable{
	private String content;
	private String dateOfCreation;
	private String name;
	private String type;
	private String parentForum;
	private String author;
	private String id;
	private ArrayList<Comment> comments;
	private ArrayList<String> likedBy;
	private ArrayList<String> dislikedBy;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Topic(){}
	public Topic(String content, String dateOfCreation, String name, String type, String parentForum, String author, ArrayList<Comment> comments,
			ArrayList<String> likedBy,ArrayList<String> dislikedBy) {
		super();
		this.content = content;
		this.dateOfCreation = dateOfCreation;
		this.name = name;
		this.type = type;
		this.parentForum = parentForum;
		this.author = author;
		this.id = UUID.randomUUID().toString();
		this.comments = comments;
		this.likedBy = likedBy;
		this.dislikedBy = dislikedBy;
		
	}
	public ArrayList<Comment> getComments() {
		return comments;
	}
	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDateOfCreation() {
		return dateOfCreation;
	}
	public void setDateOfCreation(String dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getParentForum() {
		return parentForum;
	}
	public void setParentForum(String parentForum) {
		this.parentForum = parentForum;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public void removeComment(String c){
		
		for (Comment c1 : comments) {
			if(c1.getId().equals(c)){
				int idx = -1;
				idx = comments.indexOf(c1);
				if(idx!=-1){
					comments.remove(idx);
					Database.SaveObject(SubForums.Instance().getSubForums(), "f");
					return;
				}else{
					System.out.println("greska kod remove comments");
					return;
				}
			}
		}
		
	}
	
	
	
	
	public void editComment(Comment c){
		int idx = -1;
		for(int i = 0; i < comments.size(); i++){
			if(comments.get(i).getId().equals(c.getId())){
				idx = i;
				break;
			}
		}
		if(idx!=-1){
			comments.remove(idx);
			comments.add(c);
		}
		Database.SaveObject(SubForums.Instance().getSubForums(), "f");
		
	}
	
	public void addComment(Comment c){
		comments.add(c);
	}
	public ArrayList<String> getLikedBy() {
		return likedBy;
	}
	public void setLikedBy(ArrayList<String> likedBy) {
		this.likedBy = likedBy;
	}
	public ArrayList<String> getDislikedBy() {
		return dislikedBy;
	}
	public void setDislikedBy(ArrayList<String> dislikedBy) {
		this.dislikedBy = dislikedBy;
	}
	
	
	
}
