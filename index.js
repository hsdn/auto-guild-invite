
module.exports = function GInvite(mod) {
	let enabled = false;

	const MIN_DELAY = 1000;
	const MAX_DELAY = 10000;

	mod.command.add(["ginv", "invg"], () => {
		enabled = !enabled;
		mod.command.message(`Module ${ enabled ? "enabled" : "disabled"}`);
	});

	mod.hook("S_SPAWN_USER", 17, event => {
		if (enabled) console.log(event.name, event.gameId);

		if (!event.guildName && enabled) {
			const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;

			mod.setTimeout(() => {
				mod.toServer("C_INVITE_USER_TO_GUILD", 1, { name: event.name });
			}, delay);
		}
	});
};
