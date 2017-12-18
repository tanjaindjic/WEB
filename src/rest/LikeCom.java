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

@Path("/likecom")
public class LikeCom {
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void newCom(Comment c){
		
		SubForum parent = null;
		int topIdx = -1;
		boolean found = false;
		for(SubForum sf : SubForums.Instance().getAllSubForums()){
			if(sf.getTopics()!=null){
				if(sf.getTopics().size()>0){
					for(int i = 0; i < sf.getTopics().size(); i++){
						if(sf.getTopics().get(i).getComments()!=null){
							if(sf.getTopics().get(i).getComments().size()>0){
								for(int j = 0; j < sf.getTopics().get(i).getComments().size(); j++){
									if(sf.getTopics().get(i).getComments().get(j).getId().equals(c.getId())){
										sf.getTopics().get(i).getComments().set(j, c);
										found = true;
										break;
									}else{
										found = searchComments(sf.getTopics().get(i).getComments(), c);
									}
								}								
							}
						}
					}
				}
			}
		}
		if(found){
			Database.SaveObject(SubForums.Instance().getAllSubForums(), "f");
			return;
		}
		
	}
	public boolean searchComments(ArrayList<Comment> list, Comment comment){
	
		for(Comment c : list){
			if(c.getChildCommentIds()!=null){
				if(!c.getChildCommentIds().isEmpty()){
					for(int i = 0; i < c.getChildCommentIds().size(); i++){
						if(c.getChildCommentIds().get(i).getId().equals(comment.getId())){
							c.getChildCommentIds().set(i, comment);
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
