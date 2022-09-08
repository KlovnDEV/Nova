import { Controls } from '@nova/engine-lib/client/Input';
const Config = {};

// SilentSiren
Config.SILENTSIREN_PNAME = '_IS_SIREN_SILENT';
Config.SILENTSIREN_HOTKEY = Controls.THROW_GRENADE; // G
Config.SILENTHOTKEY_MAXTIMEOUT = 15;

// BlipSiren
Config.BLIPSIREN_PNAME = '_IS_SIREN_BLIP';

// SirenSound
Config.SIRENSOUND_PNAME = '_IS_SIREN_ALT_SOUND';
Config.SIRENSOUND_HOTKEY = Controls.SPRINT; // LEFT SHIFT

export default Config;