import { Controller, OnStart } from "@flamework/core";
import { client } from "@rbxts/charm-sync";
import { atoms } from "shared/store/sync/atoms";
import { Events } from "client/network";

const syncer = client({ atoms });

@Controller({})
export class SyncController implements OnStart {
	onStart() {
		Events.sync.connect((payload) => {
			syncer.sync(payload);
		});

		Events.init.fire();
	}
}
