let ESX = null
emit('esx:getSharedObject', obj => {
  ESX = obj
})

/*
RegisterServerEvent('esx_inventory:actionUseRecipe')
AddEventHandler('esx_inventory:actionUseRecipe', function(recipeName) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	var inv = getInventory("player", xPlayer.identifier)
	var recipeItem = inv.findItem({name: "recipe", extra: {name: recipeName}})

	if (!recipeItem) {
		TriggerClientEvent('esx:showNotification', xPlayer.source, "~r~Рецепт не найден!")
		return
	}

	if (inv.removeItem(recipeItem, 1, false)) {
		TriggerEvent('esx_datastore:getDataStore', 'user_recipes', xPlayer.identifier, function(store) {
			store.set(recipeName, 1)
			TriggerClientEvent('esx:showNotification', xPlayer.source, "~g~Изучен рецепт: ~b~"+recipeItem.extra.title+"~g~!")
		})
	}
})

RegisterServerEvent('esx_inventory:actionEditPaper')
AddEventHandler('esx_inventory:actionEditPaper', function(originaltitle, originaltext, title, textid) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (xPlayer == null) {
		print("actionEditPaper Unknown player!")
		return
	}

	if (title.count > 200) {
		return
	}

	var inv = getInventory("player", xPlayer.identifier);

	var paperItem = CreateItem("paper", {"title": originaltitle, "text": originaltext}, 1)

	if (inv.findItem(paperItem).count < 1) {
		TriggerClientEvent('esx:showNotification', xPlayer.source, "~r~Бумага не найдена!")
		return
	}

	if (inv.removeItem(paperItem, 1, true)) {
		var newPaperItem = CreateItem("paper", {"title": title, "textid": textid}, 1)
		inv.addItem(newPaperItem, 1, true)
		TriggerClientEvent('esx:showNotification', xPlayer.source, "~g~Бумага изменена!")
	}
})

function clothHasConflicts(item1, item2) {
	for (let k in item1.extra.outfit) {
		if (item2.extra.outfit[k] != null) return true;
	}

	for (let k in item2.extra.outfit) {
		if (item1.extra.outfit[k] != null) return true;
	}

	return false;
}

function updateOutfit(xPlayer) {
	var inv = getInventory("clothes", xPlayer.identifier);
	var res = {};

	for (let k in inv.items) {
		var item = inv.items[k];

		for (let p in item.extra.outfit) {
			res[p] = item.extra.outfit[p];
		}
	}

	return res;
}

RegisterServerEvent('esx_inventory:outfitWear')
AddEventHandler('esx_inventory:outfitWear', function(item) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	var inv_clothes = getInventory("clothes", xPlayer.identifier);
	var inv_pocket = getInventory("player", xPlayer.identifier);

	for (var k in inv_clothes.items) {
		var item2 = inv_clothes.items[k];

		if (clothHasConflicts(item, item2)) {
			inv_clothes.removeItem(item2, 1, true);
			inv_pocket.addItem(item2, 1, true);
			break;
		}
	}

	if (inv_pocket.removeItem(item, 1, true)) {
		inv_clothes.addItem(item, 1, true);
		var outfit = updateOutfit(xPlayer);
		TriggerClientEvent("esx_inventory:outfitWear", xPlayer.source, outfit);
	}
})

RegisterServerEvent('esx_inventory:outfitUndress')
AddEventHandler('esx_inventory:outfitUndress', function(item) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	var inv_clothes = getInventory("clothes", xPlayer.identifier);
	var inv_pocket = getInventory("player", xPlayer.identifier);

	if (inv_clothes.removeItem(item, 1, true) == true) {
		inv_pocket.addItem(item, 1, true);
		var outfit = updateOutfit(xPlayer);

		TriggerClientEvent("esx_inventory:outfitWear", xPlayer.source, outfit);
	}
})

RegisterServerEvent('esx_inventory:actionUnpackMoney')
AddEventHandler('esx_inventory:actionUnpackMoney', function(item) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	var inv = getInventory("player", xPlayer.identifier)

	if (inv.removeItem({name: item.name, extra: item.extra, amount: 1}) == true) {
		xPlayer.addMoney(item.extra["cash"])
		xPlayer.addAccountMoney('black_money', item.extra["black"])
	}
})

RegisterServerEvent('esx_inventory:unequipWeapon')
AddEventHandler('esx_inventory:unequipWeapon', function(weaponName, ammo, config) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	var inv = getInventory("player", xPlayer.identifier)

	if (inv.addItem({name: "weapon", extra: { "weapon_name": weaponName, "ammo": ammo }, amount: 1})) {
		inv.onChange();
	}
})


RegisterServerEvent('esx_inventory:equipWeapon')
AddEventHandler('esx_inventory:equipWeapon', function(item) {
	var xPlayer = ESX.GetPlayerFromId(source)
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	if (xPlayer.hasWeapon(item.extra.weapon_name)) {
		TriggerClientEvent("esx:showNotification", xPlayer.source, _U("already_equipped"))
		return
	}

	var inv = getInventory("player", xPlayer.identifier)

	if (inv.removeItem({name: "weapon", extra: item.extra, amount: 1})) {
		TriggerClientEvent("esx_inventory:equipWeapon", source, item)
	}
})

function dropItem(xPlayer, item) {
	if (!xPlayer) { throw new Error("Unknown xPlayer!") }

	if (players[xPlayer.source] == null) {
		print("esx_inventory:dropItem Unknown player coords!")
		return
	}

	var inv = getInventory("player", xPlayer.identifier)
	var actualItem = inv.findItem(item)

	if (inv.removeItem(item)) {
		if (createPickup(xPlayer.source, actualItem, item.amount, actualItem.label) == false) {
			inv.addItem(item)
		}
	}
}

RegisterServerEvent('esx_inventory:dropItem')
AddEventHandler('esx_inventory:dropItem', function(item) {
	var xPlayer = ESX.GetPlayerFromId(source)
	dropItem(xPlayer, item)
})
*/

RegisterServerEvent('esx_inventory:quickAction')
AddEventHandler('esx_inventory:quickAction', function(uid) {
	var xPlayer = ESX.GetPlayerFromId(source)

	var inv = ESX.Custom.Inventory.Get("player-inventory", xPlayer.identifier)
	var foundItems = ESX.Custom.Inventory.Search(inv, { uid: uid })
        if (foundItems.length == 0) {

		var nested_invs = ESX.Custom.Inventory.GetNested("player-inventory", xPlayer.identifier)
		for (var key in nested_invs) {
			inv = nested_invs[key];
			foundItems = ESX.Custom.Inventory.Search(inv, { uid: uid })

			if (Object.keys(foundItems).length > 0) break;
		}
	}

	
        if (Object.keys(foundItems).length == 0) return;

	var foundItem = foundItems[uid];

	if (!foundItem.actions || !foundItem.actions.player) return;

	var actions = Object.entries(foundItem.actions.player).map(([key,val]) => ({
		key: key,
		priority: val.priority
	})).sort((a,b) => b.priority - a.priority);

	if (actions.length == 0) return;

	var act = actions[0].key

	ESX.Custom.Inventory.RunItemAction(xPlayer, inv, foundItem, act)
})
