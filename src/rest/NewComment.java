package rest;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.Database;
import database.SubForums;
import model.Comment;
import model.SubForum;
import model.Topic;

@Path("/newcomment")
public class NewComment {
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void newCom(Comment c){
		if(c.getDateOfCreation().equals("")){
			int day = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
			int month = Calendar.getInstance().get(Calendar.MONTH);
			int year = Calendar.getInstance().get(Calendar.YEAR);
			String date = String.valueOf(day) + "-" + String.valueOf(month) + "-" + String.valueOf(year);
			c.setId(UUID.randomUUID().toString().toString());
			c.setDateOfCreation(date);
		
		}
		SubForum parent = null;
		int topIdx = -1;
		boolean found = false;
		for(SubForum sf : SubForums.Instance().getAllSubForums()){
			if(sf.getTopics()!=null){
				if(sf.getTopics().size()>0){
					for(int i = 0; i < sf.getTopics().size(); i++){
						if(sf.getTopics().get(i).getId().equals(c.getTopicId())){
							parent = sf;
							topIdx = i;
							
							break; 
						}
						if(sf.getTopics().get(i).getComments()!=null){
							if(sf.getTopics().get(i).getComments().size()>0){
								for(int j = 0; j < sf.getTopics().get(i).getComments().size(); j++){
									if(sf.getTopics().get(i).getComments().get(j).getId().equals(c.getTopicId())){
										sf.getTopics().get(i).getComments().get(j).getChildCommentIds().add(c);
										found = true;
										break;
									}else{
										found = searchComments(sf.getTopics().get(i).getComments(), c);
									}
								}
								
							}
						}
					}
	
					if(parent!=null && topIdx!=-1)
						break;

				}
			}
		}
		
		if(found){
			Database.SaveObject(SubForums.Instance().getAllSubForums(), "f");
			return;
		}
		System.out.println("parent: " + parent.getName() + " idx: " + topIdx);
		if(parent!=null && topIdx!=-1){
			if(parent.getTopics().get(topIdx).getComments()==null){
				ArrayList<Comment> comments = new ArrayList<Comment>();
				comments.add(c);
				parent.getTopics().get(topIdx).setComments(comments);	
				SubForums.Instance().editSubForum(parent);
				return;
			}else if(parent.getTopics().get(topIdx).getComments().size()==0){
				parent.getTopics().get(topIdx).getComments().add(c);
				
				SubForums.Instance().editSubForum(parent);
				return;
			}else{
				boolean exists=false;
				for(Comment cc : parent.getTopics().get(topIdx).getComments()){
					if(cc.getId().equals(c.getId())){
						exists = true;
					}
				}
				if(!exists){
					parent.getTopics().get(topIdx).getComments().add(c);
					
					SubForums.Instance().editSubForum(parent);
					return;
				}else{
					System.out.println("postoji komentar");
					return;
				}
			}
		
		}
		
			
		
		
	}
	public boolean searchComments(ArrayList<Comment> list, Comment comment){
	
		for(Comment c : list){
			if(c.getChildCommentIds()!=null){
				if(!c.getChildCommentIds().isEmpty()){
					for(int i = 0; i < c.getChildCommentIds().size(); i++){
						if(c.getChildCommentIds().get(i).getId().equals(comment.getTopicId())){
							c.getChildCommentIds().get(i).getChildCommentIds().add(comment);
							return true;
						}
						else{
							for(int j = 0; j < c.getChildCommentIds().size(); j++){
								searchComments(c.getChildCommentIds().get(j).getChildCommentIds(), comment);
							}
						}
					}
				}
			}
		}
		return false;
	}
	
	
}
