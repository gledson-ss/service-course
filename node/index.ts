import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method
} from "@vtex/api";
import { IOClients } from "@vtex/api";
import { analytics } from "./handlers/analytics";
import Analytics from "./clients/analytics";
// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 });
metrics.trackCache("status", memoryCache);

declare global {
  type Context = ServiceContext<Clients, State>;

  interface State extends RecorderState {
    code: number;
  }
}

export class Clients extends IOClients {
  public get analytics() {
    return this.getOrSet("analytics", Analytics);
  }
}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000
      }
    }
  },
  routes: {
    analytics: method({
      GET: [analytics]
    })
  }
});
