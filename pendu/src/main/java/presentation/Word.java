package presentation;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import service.WordService;
import service.WordServiceImpl;

@Path("/mots")
public class Word {

	public WordService service;

	@Produces(value = "text/plain")
	@GET
	@Path("/get")
	public Response getWord() {
		return Response.status(200).entity(service.getRandomWord()).build();
	}

	public Word() {
		service = WordServiceImpl.getInstance();
	}

}
