import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players } from "@rbxts/services";

interface Attributes {
	Amount: number;
}

@Component({
	tag: "Damage",
	defaults: {
		Amount: 100,
	},
})
export class DamageComponent extends BaseComponent<Attributes, BasePart> implements OnStart {
	damagePlayer(player: Player) {
		const character = player.Character!;
		const humanoid: Humanoid = character.FindFirstChildOfClass("Humanoid")!;

		if (humanoid.Health > 0) {
			humanoid.Health = humanoid.Health - this.attributes.Amount;
		}
	}

	onStart() {
		if (this.instance) {
			this.instance.Touched.Connect((touchedPart) => {
				if (touchedPart.Parent && touchedPart.Parent.FindFirstChild("Humanoid")) {
					const player: Player = Players.GetPlayerFromCharacter(touchedPart.Parent)!;
					this.damagePlayer(player);
				}
			});
		}
	}
}
