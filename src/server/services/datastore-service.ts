import { Service, OnStart } from "@flamework/core";
import { effect } from "@rbxts/charm";
import { Collection, createCollection } from "@rbxts/lapis";
import { t } from "@rbxts/t";
import { deletePlayerData, getPlayerData, PlayerData, setPlayerData } from "shared/store/datastore";
import { Players } from "@rbxts/services";

const defaultData: PlayerData = {
	money: 0,
};

@Service({})
export class DatastoreService implements OnStart {
	private collection: Collection<PlayerData>;

	constructor() {
		this.collection = createCollection<PlayerData>("dev-0", {
			defaultData,
			validate: t.interface({
				money: t.number,
			}),
		});
	}

	onPlayerAdded(player: Player) {
		this.loadPlayerData(player).catch((err) => {
			warn(`Failed to load document for player ${player.Name}: ${err}`);
			setPlayerData(player.Name, defaultData);
		});
	}

	onPlayerRemoving(player: Player) {
		deletePlayerData(player.Name);
	}

	async loadPlayerData(player: Player) {
		const document = await this.collection.load(`${player.UserId}`, [player.UserId]);

		if (!player.IsDescendantOf(Players)) {
			document.close();
			return;
		}

		const unsubscribe = effect(() => {
			const data = getPlayerData(player.Name);

			if (data) {
				document.write(data);
			}
		});

		setPlayerData(player.Name, document.read());

		Promise.fromEvent(Players.PlayerRemoving, (left) => player === left)
			.then(() => unsubscribe())
			.then(() => document.close());
	}

	onStart() {
		Players.PlayerAdded.Connect((player) => {
			this.onPlayerAdded(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.onPlayerRemoving(player);
		});

		for (const player of Players.GetPlayers()) {
			this.onPlayerAdded(player);
		}
	}
}
