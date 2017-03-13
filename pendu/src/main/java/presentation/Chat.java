package presentation;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import metier.ChatRoom;
import metier.ChatRoomService;
import metier.ChatRoomServiceImpl;

@Path("/chat")
public class Chat {

	private ChatRoomService service;

	public Chat() {
		service = ChatRoomServiceImpl.getInstance();
	}

	@GET
	@Produces("text/plain")
	@Path("/newroom")
	public Response addChatRoom(@QueryParam("room") String room) {
		service.addChatRoom(room);
		return Response.status(200).entity("Ajout de la salle de chat " + room).build();
	}
	
	@GET
	@Produces("text/json")
	@Path("/rooms")
	public Response getAllChatRoom() {
		Gson gson = new Gson();
		return Response.status(200).entity(gson.toJson(service.getAllChatRooms())).build();
	}

	@GET
	@Produces("text/json")
	@Path("/newmessages")
	public Response addMessage(@QueryParam("room") String room, @QueryParam("author") String author,
			@QueryParam("content") String content) {
		service.addMessage(room, author, content);
		return Response.status(200).entity("Message ajouté").build();
	}

	@GET
	@Produces("text/json")
	@Path("/messages")
	public Response loadChat(@QueryParam("room") String room) {
		ChatRoom chatRoom = service.getChatRoomByName(room);
		Gson gson = new Gson();
		return Response.status(200).entity(gson.toJson(chatRoom.getLstMessages())).build();
	}

}
