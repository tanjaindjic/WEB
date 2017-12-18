package database;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.HashMap;

import javax.swing.JOptionPane;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.SubForum;
import model.User;
public class Database {
	
	public static String usersFileName = "\\USERS.tmp";
	public static String forumFileName = "\\FORUM.tmp";
	
	
	public static String GetServerPath()
	{
		String userDir = System.getProperty("user.dir");
		
		return userDir;
	}
	public static boolean SaveObject(Object o, String ft)
	{
		System.out.println("uso da cuva");
		String fileName = GetServerPath();
		switch(ft)
		{
			case "u": fileName += usersFileName; System.out.println("sacuvani useri"); break;
			case "f": fileName += forumFileName; System.out.println("sacuvani subovi"); break;
			default: System.out.println("ne cuva ni u ni f");
		}
		return SaveToFile(o,fileName);
	}
	
	private static boolean SaveToFile(Object o, String filePath)
	{
		System.out.println("pozvao savetofile");
	   /* FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(filePath);
			System.out.println("napravio fos: " + fos);
		} catch (FileNotFoundException e) {
			new File(filePath);
			return false;
		}
	    ObjectOutputStream oos;
		try {
			oos = new ObjectOutputStream(fos);
			oos.writeObject(o);
			oos.close();
			System.out.println("sacuvao");
		} catch (IOException e) {
			System.out.println("ne cuva");
		}*/
		
		ObjectMapper mapper = new ObjectMapper();
		File f= null;
		
		try{
    		f = new File(filePath);
    	}catch(Exception e){
    		JOptionPane.showMessageDialog(null, "Something went wrong during share. Changes are not saved.");
    	}
		try {
			mapper.writeValue(new File(filePath), o);
			
		} catch (IOException e) {
			JOptionPane.showMessageDialog(null, "Something went wrong during share. Changes are not saved.");
			return false;
		}
			
	    return true;
	}
	public static Object ReadObject(String ft)
	{
		
		String fileName = GetServerPath();
		switch(ft)
		{
			case "u": 
				fileName += usersFileName;
				return (HashMap<String,User>) ReadFromFile(fileName, "u");
			case "f": 
				fileName += forumFileName; 
				return (HashMap<String,SubForum>) ReadFromFile(fileName, "f");
			
		}
		return null;
	}
	private static Object ReadFromFile(String filePath, String ft)
	{
		/*
		FileInputStream fi = null;
		ObjectInputStream oi = null;
		Object retVal = null;
		try {
			fi = new FileInputStream(filePath);
			oi = new ObjectInputStream(fi);
			retVal = oi.readObject();
			oi.close();
			fi.close();
		} catch (FileNotFoundException e) {
			new File(filePath);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return retVal;
	}
	
	*/
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.WRAP_EXCEPTIONS, true);
	
		
			
			filePath= filePath.replace('\\', '/');
			System.out.println(filePath);
			switch(ft)
			{
				case "u": 
					HashMap<String,User> allusers = null;
					try {
						allusers = (HashMap<String, User>) mapper.readValue(new File(filePath), new TypeReference<HashMap<String, User>>() {});
					} catch (IOException e) {
						System.out.println("nema fajla");
						return null;
					}
					
					return allusers;
			
				case "f": 
					HashMap<String,SubForum> allsubs = null;
					try {
						allsubs = (HashMap<String, SubForum>) mapper.readValue(new File(filePath), new TypeReference<HashMap<String, SubForum>>() {});
					} catch (IOException e) {
						System.out.println("nema fajla");
						return null;
					}
					
					return allsubs;
					
				
			}
			return null;
	}
	
}
