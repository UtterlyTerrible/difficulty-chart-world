import { Service, OnStart } from "@flamework/core";

import { server } from "@rbxts/charm-sync";
import { Events } from "server/network";

import { atoms } from "shared/store/sync/atoms";
import { filterPayload } from "shared/store/sync/utils/filter-payload";

const syncer = server({ atoms });

@Service({})
export class SyncService implements OnStart {
	onStart() {
		syncer.connect((player, payload) => {
			Events.sync(player, filterPayload(player, payload));
		});

		Events.init.connect((player) => {
			syncer.hydrate(player);
		});
	}
}
