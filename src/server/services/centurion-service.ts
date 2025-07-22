import { Service, OnStart } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";

@Service({})
export class CenturionService implements OnStart {
	onStart() {
		Centurion.server().start();
	}
}
