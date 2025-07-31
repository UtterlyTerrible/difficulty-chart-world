import Vide from "@rbxts/vide";
import { px } from "../composables/use-px";
import { Events } from "client/network";

import { Button } from "./button";

export function TapHere() {
	return (
		<Button
			onClick={() => Events.tap.fire()}
			text="Tap here!"
			anchor={new Vector2(1, 1)}
			position={() => new UDim2(1, -px(20), 1, -px(120))}
			size={() => new UDim2(0, px(170), 0, px(80))}
		>
			<uicorner CornerRadius={() => new UDim(0, px(20))} />
		</Button>
	);
}
