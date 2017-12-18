package model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

import database.Database;
import database.SubForums;
@XmlRootElement
public class SubForum implements Serializable{
	private String description;
	private String name;
	private ArrayList<String> rules;
	private ArrayList<String> moderators;
	private String mainModerator;
	private ArrayList<Topic> topics;
	
	public ArrayList<Topic>  getTopics() {
		return topics;
	}
	public void setTopics(ArrayList<Topic>  topics) {
		this.topics = topics;
	}
	public SubForum(String description, String name, ArrayList<String> rules, ArrayList<String> moderators,
			String mainModerator, ArrayList<Topic>  topics) {
		super();
		this.description = description;
		this.name = name;
		this.rules = rules;
		this.moderators = moderators;
		this.mainModerator = mainModerator;
		this.topics = topics;
	}
	public SubForum(){}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<String> getRules() {
		return rules;
	}
	public void setRules(ArrayList<String> rules) {
		this.rules = rules;
	}
	public ArrayList<String> getModerators() {
		return moderators;
	}
	public void setModerators(ArrayList<String> moderators) {
		this.moderators = moderators;
	}
	public String getMainModerator() {
		return mainModerator;
	}
	public void setMainModerator(String mainModerator) {
		this.mainModerator = mainModerator;
	}
	public void addTopic(Topic t) {
		if(topics==null){
			topics = new ArrayList<>();
			topics.add(t);
			
			return;
		}
		for (Topic t1 : topics) {
			if(t1.getId().toString().equals(t.getId().toString())){
				System.out.println("potoji tema");
				return;
			}
		}
		topics.add(t);
		return;
	}
}
