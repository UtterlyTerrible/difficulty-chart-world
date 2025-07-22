import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { updatePlayerData } from "shared/store/datastore";

@Service({})
export class TapService implements OnStart {
	onStart() {
		Events.tap.connect((player) => {
			updatePlayerData(player.Name, (data) => ({
				...data,
				money: data.money + 1,
			}));
		});
	}
}
