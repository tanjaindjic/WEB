package rest;

import java.util.Calendar;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import database.SubForums;
import model.SubForum;
import model.Topic;

@Path("/newtopic")
public class NewTopic {
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void newTop(Topic t){
		SubForum sf = SubForums.Instance().getSubForums().get(t.getParentForum());
		if(t.getDateOfCreation().equals("")){
			int day = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
			int month = Calendar.getInstance().get(Calendar.MONTH);
			int year = Calendar.getInstance().get(Calendar.YEAR);
			String date = String.valueOf(day) + "-" + String.valueOf(month) + "-" + String.valueOf(year);
			t.setId(UUID.randomUUID().toString().toString());
			t.setDateOfCreation(date);
			System.out.println(t.getDateOfCreation());
		}
		sf.addTopic(t);
		SubForums.Instance().saveSubs();
	}
}
