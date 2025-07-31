import { cleanup } from "@rbxts/vide";

export function useEvent<T extends Callback>(event: RBXScriptSignal<T>, callback: T) {
	const connection = event.Connect(callback);
	cleanup(connection);
	return connection;
}
