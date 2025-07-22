import { Controller, OnStart } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";
import { CenturionUI } from "@rbxts/centurion-ui";

@Controller({})
export class CenturionController implements OnStart {
	onStart() {
		Centurion.client()
			.start()
			.then(() => CenturionUI.start(Centurion.client(), {}))
			.catch((err) => warn("Failed to start Centurion:", err));
	}
}
