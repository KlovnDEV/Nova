let ESX = null;
let isMenuShown = false;
let isPageChanged = false;
let page = 'register';

function colorToRGBStr(rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

let hairColors = [];
let makeupColors = [];

function preprocessSkin(skin) {
    if (skin['beard_3'] < 0) skin['beard_2'] = 0;
    if (skin['blush_1'] < 0) skin['blush_2'] = 0;

    if (skin['blush_3'] < 0) skin['blush_2'] = 0;

    if (skin['makeup_4'] < 0) skin['makeup_2'] = 0;

    if (skin['lipstick_3'] < 0) skin['lipstick_2'] = 0;

    return skin;
}

function applySkin(skin, identity, cb) {
        emit('skin:loadSkin', preprocessSkin(skin), () => {
            skin = preprocessSkin(skin);
            TriggerServerEvent('skin:save', skin);
            closeSkinChanger(true);
            if (identity) ESX.Identity.Set(identity.firstname, identity.lastname, identity.sex, identity.age, identity.height || 180);
            cb('');
        })
}

for (let i=0;i<64;i++) {
    let rgb = GetPedHairRgbColor(i)
    hairColors.push({ color: colorToRGBStr(rgb), value: i })
}

for (let i=0;i<64;i++) {
    let rgb = GetPedMakeupRgbColor(i)
    makeupColors.push({ color: colorToRGBStr(rgb), value: i })
}

function openSkinChanger(shopType) {
    ESX.TriggerServerCallback('skin:getPlayerSkin', function(skin) {

        SendNuiMessage(JSON.stringify({
            query: 'skin/show',
            skin,
            hairColors,
            makeupColors,
            shopType
        }));

        SetNuiFocus(true, true);
        SetNuiFocusKeepInput(true)
        CreateSkinCam(GetEntityCoords(PlayerPedId()), GetEntityHeading(PlayerPedId())+90.0, 1.0, 2.0 );
        emit('dpemotes:emote', 't2')
        FreezeEntityPosition(PlayerPedId(), true);
        isMenuShown = true;
        isPageChanged = false;
        page = 'register';
    });
}

function closeSkinChanger(success) {
    SendNuiMessage(JSON.stringify({
        query: 'skin/hide',
    }));

    SetNuiFocus(false);
    isMenuShown = false;
    DeleteSkinCam();
    ClearPedTasks(PlayerPedId());
    FreezeEntityPosition(PlayerPedId(), false);

    if (!success) {
      ESX.TriggerServerCallback('skin:getPlayerSkin', function(skin) {
         emit('skin:loadSkin', skin)
      })
    }

}

setTick(() => {
    if (ESX === null) {
        emit('esx:getSharedObject', (obj) => { ESX = obj });
    }

    if (isMenuShown) {
        if (IsDisabledControlJustReleased(0, 322)) {
            closeSkinChanger(false)
        }
        DisableAllControlActions(0)
        const target = [0,0,0];
	SetIkTarget(PlayerPedId(), 1, PlayerPedId(), 0, target[0], target[1], target[2]+0.6, 0, 100, 100)
    }

})


RegisterNuiCallbackType('query_api')
on('__cfx_nui:query_api', (data, cb) => {
    const {cmd, args} = data;

    if (cmd == 'skin/update') {
        emit('skin:loadSkin', preprocessSkin(args.skin), () => {
            cb('');
            if (page === 'register') emit('dpemotes:emote', 't2')
        })

        return;
    }

    if (cmd == 'skin/apply') {
        applySkin(args.skin, args.identity, cb);
        return;
    }

    if (cmd == 'skin/buy') {
        applySkin(args.skin, null, cb);
        return;
    }

    if (cmd == 'skin/page/set') {
	    TriggerEvent('nova-ui:setSkinchangerPage', args, cb)
	    return
    }
})

RegisterNuiCallbackType('skinSetSex')
on('__cfx_nui:skinSetSex', (data, cb) => {
	if (!isPageChanged) {
		emit('skin:loadDefaultCharacter', data.sex);
	}

	cb('');
});

//RegisterNuiCallbackType('setSkinchangerPage')
//on('__cfx_nui:setSkinchangerPage', (data, cb) => {
on('nova-ui:setSkinchangerPage', (data, cb) => {
    isPageChanged = true;
    page = data.page;
    UpdateSkinCam()

    SetSkinCamControls(data.page !== 'register');

    var coords = GetEntityCoords(PlayerPedId());

	if (data.page === "face" || data.page === "head") {
		coords[2] += 0.65;
		SetSkinCamDistance(0.4, 0.7)
		SetSkinCamTarget(coords)
	} else if (data.page === "morphology") {
		coords[2] += 0.4;
		SetSkinCamDistance(1.0, 2.0)
		SetSkinCamTarget(coords)
	}

    cb('');
});

onNet('nova-ui:openSkinChanger', (shopType) => {
    openSkinChanger(shopType);
});

onNet('nova-ui:closeSkinChanger', () => {
    closeSkinChanger(true);
});
