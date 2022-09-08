import { LocalPlayer, PedConfigFlag } from '@nova/engine-lib/client/Game';
import { showNotification } from '@nova/engine-lib/client/UI';
import { clamp, Delay, Log, Random, Vector3 } from '@nova/engine-lib/shared';
import { PedBones, PedBoneZones } from './bones';

let lastHealth = -1;
let airTime = 0;
let lastVelocity = 0;

const DAMAGE_TYPES = {
  '-1569615261': 'Melee',
  WEAPON_WRENCH: 'Melee',
  WEAPON_POOLCUE: 'Melee',
  WEAPON_KNUCKLE: 'Melee',
  WEAPON_FLASHLIGHT: 'Melee',
  WEAPON_NIGHTSTICK: 'Melee',
  WEAPON_HAMMER: 'Melee',
  WEAPON_BAT: 'Melee',
  WEAPON_CROWBAR: 'Melee',
  '-1786099057': 'Melee',
  WEAPON_GOLFCLUB: 'Melee',
  '-2067956739': 'Melee',
  '-868994466': 'Melee',
  WEAPON_UNARMED: 'Melee',

  '-1716189206': 'Knife',
  '1223143800': 'Knife',
  '-1955384325': 'Knife',
  '-1833087301': 'Knife',
  '910830060': 'Knife',
  WEAPON_KNIFE: 'Knife',
  WEAPON_BOTTLE: 'Knife',
  WEAPON_DAGGER: 'Knife',
  WEAPON_HATCHET: 'Knife',
  WEAPON_MACHETE: 'Knife',
  WEAPON_SWITCHBLADE: 'Knife',
  WEAPON_BATTLEAXE: 'Knife',

  WEAPON_PISTOL: 'Pistol',
  WEAPON_VINTAGEPISTOL: 'Pistol',
  WEAPON_COMBATPISTOL: 'Pistol',
  WEAPON_APPISTOL: 'Pistol',
  WEAPON_PISTOL50: 'Pistol',
  WEAPON_SNSPISTOL: 'Pistol',
  WEAPON_HEAVYPISTOL: 'Pistol',
  WEAPON_MARKSMANPISTOL: 'Pistol',
  WEAPON_REVOLVER: 'Pistol',

  WEAPON_PUMPSHOTGUN: 'Shotgun',
  WEAPON_BULLPUPSHOTGUN: 'Shotgun',
  WEAPON_ASSAULTSHOTGUN: 'Shotgun',
  WEAPON_SAWNOFFSHOTGUN: 'Shotgun',
  WEAPON_HEAVYSHOTGUN: 'Shotgun',
  WEAPON_DBSHOTGUN: 'Shotgun',
  WEAPON_AUTOSHOTGUN: 'Shotgun',

  WEAPON_ASSAULTRIFLE: 'SMG',
  WEAPON_MG: 'SMG',
  WEAPON_COMBATMG: 'SMG',
  WEAPON_MICROSMG: 'SMG',
  WEAPON_SMG: 'SMG',
  WEAPON_ASSAULTSMG: 'SMG',
  WEAPON_MACHINEPISTOL: 'SMG',
  WEAPON_MINISMG: 'SMG',

  WEAPON_CARBINERIFLE: 'Rifle',
  WEAPON_ADVANCEDRIFLE: 'Rifle',
  WEAPON_SPECIALCARBINE: 'Rifle',
  WEAPON_BULLPUPRIFLE: 'Rifle',
  WEAPON_MUSKET: 'Rifle',
  WEAPON_MARKSMANRIFLE: 'Rifle',
  WEAPON_COMPACTRIFLE: 'Rifle',

  WEAPON_SNIPERRIFLE: 'Sniper',
  WEAPON_HEAVYSNIPER: 'Sniper',
  WEAPON_REMOTESNIPER: 'Sniper',
  WEAPON_RAILGUN: 'Sniper',

  '-100946242': 'Animal',
  '148160082': 'Animal',

  '-842959696': 'Fall',
  '4164886': 'Fall',

  '-1568386805': 'Explosion',
  WEAPON_PROXMINE: 'Explosion',
  WEAPON_GRENADELAUNCHER_SMOKE: 'Explosion',
  WEAPON_HOMINGLAUNCHER: 'Explosion',
  '-1312131151': 'Explosion',
  '375527679': 'Explosion',
  '324506233': 'Explosion',
  '1752584910': 'Explosion',
  '-1813897027': 'Explosion',
  WEAPON_RPG: 'Explosion',
  WEAPON_STICKYBOMB: 'Explosion',
  WEAPON_GRENADE: 'Explosion',
  WEAPON_SMOKEGRENADE: 'Explosion',
  WEAPON_GRENADELAUNCHER: 'Explosion',
  '-37975472': 'Explosion',
  '539292904': 'Explosion',
  '341774354': 'Explosion',
  '-1090665087': 'Explosion',
  WEAPON_COMPACTLAUNCHER: 'Explosion',
  WEAPON_PIPEBOMB: 'Explosion',

  '-1600701090': 'Gas',

  WEAPON_MOLOTOV: 'Burn',
  WEAPON_PETROLCAN: 'Burn',
  '-544306709': 'Burn',

  '-10959621': 'Drown',
  '1936677264': 'Drown',

  '133987706': 'Car',
  '-1553120962': 'Car',

  WEAPON_STUNGUN: 'Other',
  GADGET_PARACHUTE: 'Other',
  WEAPON_FIREEXTINGUISHER: 'Other',
  WEAPON_DIGISCANNER: 'Other',
  WEAPON_GUSENBERG: 'Other',
  WEAPON_FLAREGUN: 'Other',
  WEAPON_FIREWORK: 'Other',
  WEAPON_COMBATPDW: 'Other',

  // Unknown Bullet
  // -1716589765, -270015777, -1074790547, -2084633992, -1357824103, -1660422300, -494615257, -1654528753, WEAPON_MINIGUN
};

function GetEntityDamageType(handle: number) {
  for (const [key, val] of Object.entries(DAMAGE_TYPES)) {
    if (HasEntityBeenDamagedByWeapon(handle, key, 0)) {
      return val;
    }
  }

  return `Unknown`;
}

setTick(async () => {
  await Delay(1000);

  const { ped } = LocalPlayer;

  const { status } = LocalPlayer.state;

  if (!status) return;

  const isLegFractured = status['trauma-fracture-rleg'] || status['trauma-fracture-lleg'];
  const isLegDislocated = status['trauma-dislocation-rleg'] || status['trauma-dislocation-lleg'];
  const injured = isLegDislocated || isLegFractured;

  ped.setConfigFlag(PedConfigFlag.IsInjured, injured);

  if (ped.isSprinting && isLegFractured) {
    SetPedToRagdoll(ped.handle, 1000, 1000, 0, false, false, false);
  }
});

function damageKnifeTick(limb: string, damage: number) {
  showNotification(`Порез ${limb} ${damage}`);
}

function damageFireTick(limb: string, damage: number) {
  showNotification(`Ожог ${limb} ${damage}`);
}

function damageAnimalTick(limb: string, damage: number) {
  showNotification(`Укус ${limb} ${damage}`);
}

function damageMeleeTick(limb: string, damage: number) {
  if (damage > 80) {
    if (limb == 'head') {
      emitNet('health:trauma', 'trauma-concussion', limb, damage);
    }

    showNotification(`Перелом кости`);
    emitNet('health:trauma', 'fracture', limb, damage);
  } else if (damage > 60 && limb != 'torso') {
    showNotification(`Вывих конечности`);
    emitNet('health:trauma', 'dislocation', limb, damage);
  } else if (damage > 10) {
    showNotification(`Ушиб`);
    emitNet('health:trauma', 'bruises', limb, damage);
  }
}

function damageShotTick(limb: string, weapon: string, damage: number) {
  showNotification(`Ранение (${weapon}) ${damage}`);
}

setTick(async () => {
  const { ped } = LocalPlayer;

  const { health } = ped;
  let damage = lastHealth - health;

  // luck
  damage -= Random.randint(0, 20);
  damage = clamp(damage, 0, 100);

  const velocity = ped.velocity.length;
  const velocityDrop = clamp(lastVelocity - velocity, 0, 1000);

  if (lastVelocity - velocity > 10.0) {
    Log.info(`Velocity drop ${velocityDrop}, airTime: ${airTime}, score: ${airTime * velocityDrop}`);
  }

  if (ped.collisionDisabled || LocalPlayer.coords.z < -10) {
    airTime = 0;
  }

  if (ped.isInAir) {
    airTime += GetFrameTime();
  } else {
    const score = airTime * airTime * velocity;

    if (score > 1.0) Log.info(`Padenie score ${airTime * velocity}, air time ${airTime}, velocity ${velocity}`);

    if (score > 10.0) {
      const limb = Random.choice(['lleg', 'rleg']);
      if (score > 30) {
        showNotification(`Перелом от падения`);
        emitNet('health:trauma', 'fracture', limb, score * 3.3);
      } else if (score > 18) {
        showNotification(`Вывих от падения`);
        emitNet('health:trauma', 'dislocation', limb, score * 3.3);
      } else {
        showNotification(`Ушиб от падения`);
        emitNet('health:trauma', 'bruises', limb, score * 3.3);
      }

      airTime = 0;
    }
    // if (airTime > 0.1) {
    //   Log.info(`Fall time: ${airTime}, vel: ${velocity}, velDrop: ${velocityDrop}, score: ${velocity * airTime}}`);
    // }
    airTime = 0;
  }
  const [haveDamage, bone] = GetPedLastDamageBone(ped.handle);

  if (damage > 0) {
    const damageType = GetEntityDamageType(ped.handle);

    Log.info(`Bone damaged. Bone: ${bone}, damage: ${damage}, type: ${damageType}, air time: ${airTime}`);

    const boneName = PedBones[bone] || 'torso';
    const limb = PedBoneZones[boneName] || boneName;

    switch (damageType) {
      case 'Melee':
        damageMeleeTick(limb, damage);
        break;

      case 'Knife':
        damageKnifeTick(limb, damage);
        break;

      case 'Animal':
        damageAnimalTick(limb, damage);
        break;

      case 'Explosion':
      case 'Burn':
        damageFireTick(limb, damage);
        break;

      case 'Pistol':
      case 'Shotgun':
      case 'SMG':
      case 'Sniper':
      case 'Rifle':
        damageShotTick(limb, damageType.toLowerCase(), damage);
        break;

      default:
      /* none */
    }

    ClearEntityLastDamageEntity(ped.handle);
    ClearEntityLastWeaponDamage(ped.handle);
    ClearPedLastDamageBone(ped.handle);
  }

  lastHealth = health;
  lastVelocity = velocity;
});
