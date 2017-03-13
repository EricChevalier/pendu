package presentation;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Path("/")
public class Login {

	private Map<String, String> map;
	
	public Login() {
		this.map = new HashMap<String, String>();
		map.put("password", "user");
		map.put("toto", "toto");
		map.put("lemonde", "bonjour");
		map.put("securisee", "appli");
		map.put("mdp", "tata");
		
	}
	
	@Produces(value="text/plain")
	@GET
	@Path("/login")
	public Response log(@QueryParam("login") String login, @QueryParam("password") String password){
		if(this.map.containsKey(password)){
			if(this.map.get(password).equals(login)){
				return Response.status(200).entity("ok").build();
			} else {
				return Response.status(200).entity("ko").build();
			}
		} else {
			return Response.status(200).entity("ko").build();
		}
	}

}
