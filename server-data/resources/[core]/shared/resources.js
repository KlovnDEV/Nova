const Delay = (ms) => new Promise(res => setTimeout(res, ms));

const ResourceScripts = {};

const shared = {};
const custom = {};

custom.setTimeout = async function(code, ts, resourceName, scriptName) {
	const i = setTimeout(async () => {
		try {
			await code();
			delete ResourceScripts[resourceName].timeouts[i];

		} catch (e) {
			delete ResourceScripts[resourceName].timeouts[i];
			console.error(`Error in setTimeout called by ${resourceName}@${scriptName}: ${JSON.stringify(e.message)}\n${JSON.stringify(e.stack)}`);
			}
	}, ts);

	ResourceScripts[resourceName].timeouts[i] = i;

	return i;
}

custom.clearTimeout = function(ind, resourceName, scriptName) {
	clearTimeout(ind);
	delete ResourceScripts[resourceName].timeouts[ind];
}

custom.setInterval = async function(code, ts, resourceName, scriptName) {
	const i = setInterval(async () => {
		try {
			await code();
		} catch (e) {
			clearInterval(i);
			delete ResourceScripts[resourceName].intervals[i];
			console.error(`Error in setInterval called by ${resourceName}@${scriptName}: ${JSON.stringify(e.message)}\n${JSON.stringify(e.stack)}`);
		}
	}, ts);

	ResourceScripts[resourceName].intervals[i] = i;

	return i;
}

custom.clearInterval = function(ind, resourceName, scriptName) {
	clearInterval(ind);
	delete ResourceScripts[resourceName].intervals[ind];
}

custom.setTick = function(func, resourceName, scriptName) {
	const i = setTick(async () => {
		try {
			await func();
		} catch (e) {
			clearTick(i);
			delete ResourceScripts[resourceName].ticks[i];
			console.error(`Error in setTick called by ${resourceName}@${scriptName}: ${JSON.stringify(e.message)}\n${JSON.stringify(e.stack)}`);
		}
	});

	ResourceScripts[resourceName].ticks[i] = i;

	return i;
}

custom.clearTick = function(ind, resourceName, scriptName) {
	clearTick(ind);
	delete ResourceScripts[resourceName].ticks[i];
}

custom.setImmediate = function(code, resourceName, scriptName) {
	const i = setImmediate(() => {
		try {
			code();
		} catch (e) {
			console.error(`Error in setImmediate called by ${resourceName}@${scriptName}: ${JSON.stringify(e.message)}\n${JSON.stringify(e.stack)}`);
		}
	});

	return i;
}

custom.consoleLog = function(resourceName, scriptName, ...args) {
	console.log(`^4${resourceName}:${scriptName}^2`, ...args, '^0');
}

custom.consoleError = function(resourceName, scriptName, ...args) {
	console.error(`^4${resourceName}:${scriptName}^1`, ...args, '^0');
}

function ___stopResource(resourceName) {
	if (!ResourceScripts[resourceName]) {
		console.error(`Resource ${resourceName} does not exist!`);
		return
	}

	const script = ResourceScripts[resourceName];

	Object.values(script.intervals).forEach((i) => clearInterval(i));
	Object.values(script.timeouts).forEach((i) => clearTimeout(i) );
	Object.values(script.ticks).forEach((i) => clearTick(i) );

	delete ResourceScripts[resourceName]
}

function ___loadResourceScript(resourceName, scriptName) {
		const scriptText = LoadResourceFile(resourceName, scriptName);

	const runnableCode = `
async function ______scriptstart(resourceName, scriptName) {
	try {
		const setTimeout = (...args) => custom.setTimeout(...args, resourceName, scriptName);
		const clearTimeout = (...args) => custom.clearTimeout(...args, resourceName, scriptName);
		const setInterval = (...args) => custom.setInterval(...args, resourceName, scriptName);
		const clearInterval = (...args) => custom.clearInterval(...args, resourceName, scriptName);
		const setImmediate = (...args) => custom.setImmediate(...args, resourceName, scriptName);
		const setTick = (func) => custom.setTick(func, resourceName, scriptName);
		const clearTick = (...args) => custom.clearTick(...args, resourceName, scriptName);
		const console = {
			log: (...args) => custom.consoleLog(resourceName, scriptName, ...args),
			error: (...args) => custom.consoleError(resourceName, scriptName, ...args),
		};

		${scriptText}
	} catch (e) {
		console.error('Error in ' + resourceName + "@" + scriptName + ":", e.message, e.stack);
		___stopResource(resourceName);
		throw e;
	}
}

______scriptstart('${resourceName}', '${scriptName}');
`;


		if (!ResourceScripts[resourceName]) {
			ResourceScripts[resourceName] = {
				timeouts: {},
				intervals: {},
				ticks: {},
			}
		}

		eval(runnableCode);
}

const resourceStart = (resourceName) => {
	const isServer = global['FlagServerAsPrivate'] !== undefined;

	const metaName = isServer ? 'server_nova' : 'client_nova';

	for (let i = 0; i < GetNumResourceMetadata(resourceName, metaName); i += 1) {
		const scriptName = GetResourceMetadata(resourceName, metaName, i);

		try {
			___loadResourceScript(resourceName, scriptName);
		} catch (e) {
			console.error(`Error in load resource script ${resourceName}@${scriptName}`, e.message, e.stack);
		}
	}
}

if (IsDuplicityVersion()) {
	on("onResourceStart", resourceStart);
} else {
	on("onClientResourceStart", resourceStart);
}

on("onResourceStop", function (res) {
	if (ResourceScripts[res]) {
		___stopResource(res);
	}
});
