const GAMEID = 2250500;
import { init, SteamCallback } from "steamworks.js";
export const client = init(GAMEID);
client.callback.register(SteamCallback.P2PSessionRequest, ({ remote }) => {
  console.log(`P2PSessionRequest from ${remote}`);
  client.networking.acceptP2PSession(remote as any);
});

client.callback.register(
  SteamCallback.P2PSessionConnectFail,
  ({ remote, error }) => {
    console.log(`Failed to connect to ${remote} with error ${error}`);
  }
);
interface MultiplayerMessage {
  steamId: string;
  data: Record<string, any>;
}

export class Client {
  static isHost: boolean = false;
  static isConnected: boolean = false;
  static lobby: Awaited<ReturnType<typeof client.matchmaking.createLobby>>;

  static startListening() {
    let packetSize: number;

    while ((packetSize = client.networking.isP2PPacketAvailable()) > 0) {
      const packet = client.networking.readP2PPacket(packetSize);
      if (this.isHost) this.broadcast(packet.data);
    }
  }

  static broadcast(message: Buffer) {
    if (!this.isHost) {
      return;
    }

    const members = this.lobby.getMembers();
    for (const member of members) {
      if (member.accountId == this.lobby.getOwner().accountId) continue;

      client.networking.sendP2PPacket(
        member.steamId64,
        client.networking.SendType.Reliable,
        message
      );
    }
  }

  static send(message: string) {
    if (this.isHost) {
      this.broadcast(Buffer.from(message));
      return;
    }

    const host = this.lobby.getOwner();
    client.networking.sendP2PPacket(
      host.steamId64,
      client.networking.SendType.Reliable,
      Buffer.from(message)
    );
  }
}

export async function connectTestserver() {
  const lobbies = await client.matchmaking.getLobbies();
  let lobby: Awaited<ReturnType<typeof client.matchmaking.createLobby>>;
  if (lobbies.length == 0) {
    lobby = await client.matchmaking.createLobby(
      client.matchmaking.LobbyType.Public,
      8
    );
  } else {
    lobby = lobbies[0];
  }

  lobby.join();

  if (lobby.getOwner().accountId == client.localplayer.getSteamId().accountId) {
    Client.isHost = true;
  }

  Client.isConnected = true;
  Client.lobby = lobby;

  Client.startListening();

  console.log(lobby.id);

  Client.send("Negro!");
}
