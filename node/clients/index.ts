import Analytics from "../clients/analytics";
import { IOClients } from "@vtex/api";
export class Clients extends IOClients {
  public get analytics() {
    return this.getOrSet("analytics", Analytics);
  }
}
