package model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Comment implements Serializable{
	private String topicId;
	private String author;
	private String dateOfCreation;
//	private String parentCommentId;
	private ArrayList<Comment> childCommentIds;
	private String content;
	private boolean edited;
	private String id;
	private boolean deleted;
	private ArrayList<String> likedBy;
	private ArrayList<String> dislikedBy;
	
	public Comment(){}
	public Comment(String author, String dateOfCreation, String content, boolean edited, boolean deleted,
			ArrayList<String> likedBy,ArrayList<String> dislikedBy /*, String parentCommentId*/, ArrayList<Comment> childCommentIds ) {
		super();
		this.topicId = UUID.randomUUID().toString();
		this.author = author;
		this.dateOfCreation = dateOfCreation;
		this.content = content;
		this.edited = edited;
		this.id=UUID.randomUUID().toString();
		this.deleted = deleted;
		this.setLikedBy(likedBy);
		this.setDislikedBy(dislikedBy);
		//this.parentCommentId = parentCommentId;
		this.childCommentIds = childCommentIds;
	}
	public String getTopicId() {
		return topicId;
	}
	public void setTopicId(String topicId) {
		this.topicId = topicId;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getDateOfCreation() {
		return dateOfCreation;
	}
	public void setDateOfCreation(String date) {
		this.dateOfCreation = date;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public boolean isEdited() {
		return edited;
	}
	public void setEdited(boolean edited) {
		this.edited = edited;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
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
	/*	public String getParentCommendId() {
		return parentCommentId;
	}
	public void setParentCommendId(String parentCommendId) {
		this.parentCommentId = parentCommendId;
	}
*/	public ArrayList<Comment> getChildCommentIds() {
		return childCommentIds;
	}
	public void setChildCommentIds(ArrayList<Comment> childCommentIds) {
		this.childCommentIds = childCommentIds;
	}
	
	
}
