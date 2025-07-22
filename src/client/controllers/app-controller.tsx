import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import Vide, { mount } from "@rbxts/vide";

import { App } from "client/ui/app/app";

@Controller({})
export class AppController implements OnStart {
	onStart() {
		mount(() => <App />, Players.LocalPlayer.WaitForChild("PlayerGui"));
	}
}
