package database;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import model.SubForum;
import model.Topic;

public class SubForums {

	private static SubForums instance = null;
	private HashMap<String,SubForum> allSubForums;
	
	@SuppressWarnings("unchecked")
	private SubForums(){
		
		HashMap<String,SubForum> load = (HashMap<String,SubForum>)Database.ReadObject("f");
		if(load == null){
			allSubForums = new HashMap<String,SubForum>();
			SubForum s = new SubForum();
			s.setName("Prvi Sub");
			s.setDescription("Prvi subforum hohohohohooh");
			s.setMainModerator("admin");
			
			allSubForums.put(s.getName(),s);
			
			SubForum s2 = new SubForum();
			s2.setName("Drugi Sub");
			s2.setDescription("Drugi subforum hohohohohooh al me vozi matori");
			s2.setMainModerator("admin");
			allSubForums.put(s2.getName(),s2);
			}else {
				allSubForums = load;
			}
		
	}
		public static SubForums Instance()
		{
			if(instance == null)
				instance = new SubForums();
			return instance;
		}
		
		public SubForum getSubForum(String s){
			
				return allSubForums.get(s);
			}
			
			public Collection<SubForum> getAllSubForums() // vracam listu
			{
				
				//System.out.println("U getallSubs je ");
				ArrayList<SubForum> subF= new ArrayList<SubForum>();
				for (SubForum sf : allSubForums.values()) {
					subF.add(sf);
				}
				return subF;
			}
			
			public SubForum findForum(String s){
				
				if(allSubForums.containsKey(s))
					return allSubForums.get(s);
				
				return null;
				
			}
			
			
			public void addNewSubForum(SubForum sf) 
			{
				if(!allSubForums.containsKey(sf.getName()))
				{
					allSubForums.put(sf.getName(), sf);
					
					saveSubs();
					
				}else{
					
				}
			}
			
			public void editSubForum(SubForum sf)
			{
				if(allSubForums.containsKey(sf.getName()))
				{
					
					allSubForums.put(sf.getName(), sf);
					saveSubs();
					
				}else{
					
				}
			}
			public void setAllSubForums(HashMap<String, SubForum> allsubs) {
				// TODO Auto-generated method stub
				this.allSubForums = allsubs;
				
			}
			public HashMap<String,SubForum> getSubForums() {
				// TODO Auto-generated method stub
				return allSubForums;
			}
			
			public void saveSubs(){
				Database.SaveObject(allSubForums, "f");
			}
			public void removeSubForum(SubForum sf) {
				// TODO Auto-generated method stub
				if(sf!=null){
					allSubForums.remove(sf.getName());
				Database.SaveObject(allSubForums, "f");
				System.out.println("obrisao: " + sf.getName());
				Users.Instance().updateFollowing(sf.getName());
				System.out.println("zavrsio sa update usera");
				}
			}
			public void editTopic(Topic t) {
				System.out.println(t.getParentForum());
				try {
					SubForum sf = allSubForums.get(t.getParentForum());
					int idx = -1;
					for(int i = 0; i < sf.getTopics().size(); i++){
						if(sf.getTopics().get(i).getId().equals(t.getId())){
							idx = i;
							break;
						}
					}
					if(idx!=-1){
						sf.getTopics().remove(idx);
						sf.addTopic(t);
						saveSubs();
					}
				} catch (Exception e) {
					System.out.println("greska kod edita topica");
				}
				
			}
			
	
}
