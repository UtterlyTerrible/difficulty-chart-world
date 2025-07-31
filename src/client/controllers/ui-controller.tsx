import { Controller, OnStart } from "@flamework/core";
import Vide, { mount } from "@rbxts/vide";
import { Players } from "@rbxts/services";

import { App } from "client/ui/app/app";

@Controller({})
export class UiController implements OnStart {
	onStart() {
		mount(() => <App />, Players.LocalPlayer.WaitForChild("PlayerGui"));
	}
}
