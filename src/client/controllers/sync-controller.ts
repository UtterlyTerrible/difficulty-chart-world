import { Controller, OnStart } from "@flamework/core";

import { client } from "@rbxts/charm-sync";
import { Events } from "client/network";

import { atoms } from "shared/store/sync/atoms";

const syncer = client({ atoms });

@Controller({})
export class SyncController implements OnStart {
	onStart() {
		Events.sync.connect((payload) => {
			syncer.sync(payload);
		});
	}
}
