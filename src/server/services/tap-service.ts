import { Service, OnStart } from "@flamework/core";
import { updatePlayerData } from "shared/store/datastore";
import { Events } from "server/network";

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
