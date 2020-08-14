
module.exports = function GInvite(mod) {
	let enabled   = false,
		min_delay = 1000,
		max_delay = 10000;

	mod.command.add('ginv', () => {
		enabled = !enabled;
		mod.command.message('Module ' + (enabled ? 'enabled' : 'disabled'));
	});

	mod.hook('S_SPAWN_USER', 15, event => {
		if (!event.guildName && enabled) {
			let delay = Math.random() * (max_delay - min_delay) + min_delay;
			
			setTimeout(()=> {
				mod.toServer('C_INVITE_USER_TO_GUILD', 1, {
					name: event.name
				});
			}, delay);
		}
	});
}
