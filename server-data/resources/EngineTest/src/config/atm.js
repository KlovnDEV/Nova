import { Vector3 } from '@nova/engine-lib/shared';

const Config = {};

Config.ZDiff        = 2.0;
Config.BlipSprite   = 431;

Config.Locale = 'ru';

Config.InterestInterval = 60 * 60000;
Config.InterestRate = 0.003;

Config.Zones = [
	{ 
		Position: new Vector3(148.78, -1039.67, 29.38),
	},
	{ 
		Position: new Vector3(-2963.18, 483.00, 15.7),
	},
	{
		Position: new Vector3(314.43, -278.53, 54.17),
	},
	{
		Position: new Vector3(-350.68, -49.37, 49.04),
	},
	{
		Position: new Vector3(-350.68, -49.37, 49.04),
	},
	{
		Position: new Vector3(1175.0, 2706.16, 38.06),
	},
	{
		Position: new Vector3(-111.30, 6467.703, 31.5),
	},
	{
		Position: new Vector3(246.40, 222.99, 106.27),
	},
	{
		Position: new Vector3(-1212.96, -330.3, 37.881),
	}
];

export default Config;