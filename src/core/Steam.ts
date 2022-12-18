const GAMEID = 2250500;
import { init, SteamCallback } from "steamworks.js";
export const client = init(GAMEID);
interface MultiplayerMessage {
  steamId: string;
  data: Record<string, any>;
}

export class Client {
  static isHost: boolean = false;
  static isConnected: boolean = false;
  static lobby: Awaited<ReturnType<typeof client.matchmaking.createLobby>>;

  private static timer = 0;
  private static lastTime = Date.now();

  static listen() {
    this.timer = Date.now() - this.lastTime;
    if (this.timer > 1000) {
      this.timer = 0;
      this.lastTime = Date.now();
      this.lobby.getMembers().forEach((member) => {
        client.networking.sendP2PPacket(
          member.steamId64,
          client.networking.SendType.Reliable,
          Buffer.from(JSON.stringify({ type: "ping" }))
        );
      });
      console.log("Ping!");
    }
    let packetSize: number;
    while ((packetSize = client.networking.isP2PPacketAvailable()) > 0) {
      const packet = client.networking.readP2PPacket(packetSize);
      const data = JSON.parse(packet.data.toString());
      if (data.type == "ping") return;
      if (this.isHost) this.broadcast(packet.data);

      console.log(data);
    }
  }

  static broadcast(message: Buffer) {
    if (!this.isHost) {
      return;
    }
    console.log("broadcasting packet");

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
    const formatted = {
      t: 1,
      m: message,
    };
    if (this.isHost) {
      this.broadcast(Buffer.from(message));
      return;
    }

    console.log("sending packet");
    const host = this.lobby.getOwner();
    client.networking.sendP2PPacket(
      host.steamId64,
      client.networking.SendType.Reliable,
      Buffer.from(JSON.stringify(formatted))
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
    await client.matchmaking.joinJobby(lobby.id);
  }

  if (lobby.getOwner().accountId == client.localplayer.getSteamId().accountId) {
    Client.isHost = true;
  }

  Client.isConnected = true;
  Client.lobby = lobby;
}
