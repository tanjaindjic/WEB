package model;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import javax.swing.JOptionPane;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonModel {
	
	private Boolean uspesno;
	
	public JsonModel() {

	}
/*	
	public void saveExistingModel(Workspace workspace){
		
		ObjectMapper mapper = new ObjectMapper();
		
		File f= null;
		File copy= null;
		
		try{
    		f = new File(workspace.getPath());
    		copy = new File(workspace.getPath()+"copy");
    		copyFile(f, copy);
    		f.delete();
    	}catch(Exception e){
    	}
		try {
			
			
			mapper.writeValue(new File(workspace.getPath()), workspace);
			
		} catch (IOException e) {
			JOptionPane.showMessageDialog(null, "Something went wrong during share. Changes are not saved.");
			
			if(copy !=null && f !=null){
				try {
					copyFile(copy, f);
					copy.delete();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			return;
		}
		

		
	}
	
	private void copyFile(File source, File dest) throws IOException {
	    InputStream is = null;
	    OutputStream os = null;
	    try {
	        is = new FileInputStream(source);
	        os = new FileOutputStream(dest);
	        byte[] buffer = new byte[1024];
	        int length;
	        while ((length = is.read(buffer)) > 0) {
	            os.write(buffer, 0, length);
	        }
	    } finally {
	        is.close();
	        os.close();
	    }
	}
/*	
	public void saveModel(Workspace workspace, String path){		
		ObjectMapper mapper = new ObjectMapper();
		
		uspesno = true;
		
		
		
		if(path == null){
			
			path= (System.getProperty("user.dir")+"/src/model/"+workspace.getName()+workspace.getUniqueID()+".work");
		}else
			path= path+workspace.getUniqueID()+".work";
		try{
    		File file = new File(path);
    		file.delete();
    	}catch(Exception e){
    	}
		try {
			
			workspace.setPath(path);
		
			mapper.writeValue(new File(path), workspace);
			
			
			
		} catch (IOException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, "Something went wrong. Changes are not saved.");
			uspesno = false;
			return;
		}
		
		saveProjects(workspace);
		
		if(uspesno)
		JOptionPane.showMessageDialog(null, "Saved");
	}
/*	
	public void saveModel(Workspace workspace){		
		ObjectMapper mapper = new ObjectMapper();
		
		uspesno = true;
		
		String path = GeRuDokModel.getInstance().getCurrentUser().getPathToUsersFolder();
		
		
		if(path == null){
			
			path= (System.getProperty("user.dir")+"/src/model/"+workspace.getName()+workspace.getUniqueID()+".work");
		}else
			path= path+"/"+workspace.getName()+workspace.getUniqueID()+".work";
		
	

		try{
    		File file = new File(path);
    		file.delete();
    	}catch(Exception e){
    	}
		try {
			
			workspace.setPath(path);
		
			mapper.writeValue(new File(path), workspace);
			
			
			
		} catch (IOException e) {
			JOptionPane.showMessageDialog(null, "Something went wrong. Changes are not saved.");
			uspesno = false;
			return;
		}
		
		saveProjects(workspace);
		
		if(uspesno)
		JOptionPane.showMessageDialog(null, "Saved");
	}
	
	
	
	public void saveProjects(Workspace workspace){
		
		
		
		
		ObjectMapper mapper = new ObjectMapper();
		
		
		if(!(workspace.getProjects() != null)){
			
			return;
		}
		
		for(Project p : workspace.getProjects() ){
			String path = GeRuDokModel.getInstance().getCurrentUser().getPathToUsersFolder();
			if(path == null){
				
				path= (System.getProperty("user.dir")+"/src/model/"+p.getName() + p.getUniqueID() +".proj");
			}else
				path= path+"/"+p.getName()+p.getUniqueID()+".proj";
			
			try{
	    		File file = new File(path);
	    		file.delete();
	    	}catch(Exception e){
	    	}
			try {
				
				if(!isSharedProject(p)){
						p.setPath(path);
						mapper.writeValue(new File(path), p);
					
					}else
						mapper.writeValue(new File(p.getPath()), p);
						
				saveGeRuDokuments(p);
				
			} catch (IOException e) {
				JOptionPane.showMessageDialog(null, "Something went wrong. Changes are not saved.");
				uspesno = false;
				return;
			}

		}
		
	}
	
	
	public void saveGeRuDokuments(Project p){
		
		ObjectMapper mapper = new ObjectMapper();
		
		
		if(!(p.getGerudokuments() != null)){
			
			return;
		}
		
		for(GeRuDokument g : p.getGerudokuments() ){
			String path = GeRuDokModel.getInstance().getCurrentUser().getPathToUsersFolder();
			if(path == null){
				
				path= (System.getProperty("user.dir")+"/src/model/"+g.getName() + g.getUniqueID() +".gerudok");
			}else
				path= path+"/"+g.getName()+g.getUniqueID()+".gerudok";
			
			try{
	    		File file = new File(path);
	    		file.delete();
	    	}catch(Exception e){
	    	}
			try {
				if(!isSharedGeRuDokument(g, p)){
					g.setPath(path);
					mapper.writeValue(new File(path), g);
				}else
					mapper.writeValue(new File(g.getPath()), g);
				
			} catch (IOException e) {
				JOptionPane.showMessageDialog(null, "Something went wrong. Changes are not saved.");
				uspesno = false;
				return;
			}
		}
		
	}
	
	
	
	public Workspace loadWorkspaceFromJSon(String path){
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.WRAP_EXCEPTIONS, true);
		Workspace ws = null;
		try {
			
			path= path.replace('\\', '/');
			ws = mapper.readValue(new File(path), Workspace.class);
		} catch (IOException e) {
			JOptionPane.showMessageDialog(null, "Something went wrong. Please restart application");
			ws=null;
			
		}
		return ws;
	}
	
	
	public Project loadProjectFromJSon(String path){
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.WRAP_EXCEPTIONS, true);
		Project proj = null;
		try {
			path= path.replace('\\', '/');
			proj = mapper.readValue(new File(path), Project.class);
		} catch (IOException e) {
			proj=null;
			
		}
		return proj;
		
	}
	
	
	
	public void shareProject(String workPath, Project p, ShareTypes s){
		
		Workspace ws=loadWorkspaceFromJSon(workPath);
		
		if(p.getPath().equals("")){
			String path= (GeRuDokModel.getInstance().getCurrentUser().getPathToUsersFolder()+ "/"+ p.getName() + p.getUniqueID() +".proj");
			p.setPath(path);
			}
		if(s == ShareTypes.COPY){
			String workpath = ws.getPath();
			String [] delovi = workPath.split("/");
			int index =delovi.length;
			StringBuilder sb = new StringBuilder();
			for(int i=0; i<index-1; i++){
				sb.append(delovi[i]);
			}
			p.setPath(sb.toString() +  "/"+ p.getName() + p.getUniqueID() +".proj" );
		}
		ws.getProjects().add(p);
		ws.getProjectPaths().add(p.path);
		saveExistingModel(ws);
		
	}
	
*/
}
