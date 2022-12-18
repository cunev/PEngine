const GAMEID = 2250500;
import { init } from "steamworks.js";
export const client = init(GAMEID);

interface MultiplayerMessage {
  steamId: string;
  data: Record<string, any>;
}

export class Client {
  static isHost: boolean = false;
  static isConnected: boolean = false;
  static lobby: Awaited<ReturnType<typeof client.matchmaking.createLobby>>;

  static startListening() {
    setInterval(() => {
      const packetSize = client.networking.isP2PPacketAvailable();
      if (packetSize) {
        const packet = client.networking.readP2PPacket(packetSize);
        if (this.isHost) this.broadcast(packet.data);
      }
    }, 16.6);
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

  Client.send("Negro!");
}
