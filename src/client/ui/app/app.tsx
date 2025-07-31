import Vide from "@rbxts/vide";
import { Money } from "../components/money";
import { TapHere } from "../components/tap-here";
import { usePx } from "../composables/use-px";

export function App() {
	usePx();

	return (
		<screengui>
			<Money />
			<TapHere />
		</screengui>
	);
}
