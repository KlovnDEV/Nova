let ESX = null
const Delay = (ms) => new Promise(res => setTimeout(res, ms))

let myPhoneNumber = "empty"
let isPhoneShow = false
let BLOCK_KEYS = false

const KeyOpenClose = 288 // F1

const Contacts = []

function SendNUIMessage(data) {
    SendNuiMessage(JSON.stringify(data))
}

const tick = setTick(async () => {
    emit('esx:getSharedObject', obj => (ESX = obj))
    if (ESX) {
        clearTick(tick)
        myPhoneNumber = LocalPlayer.state.phone;

        SendNUIMessage({
            setPhoneNumber: true,
            phoneNumber: LocalPlayer.state.phone,
        })

        await Delay(1000);
        exports["mumble-voip"].removePlayerFromCall(1001)
        TriggerEvent("react_phone:setAnim", "out")
    }
})

setTick(() => {
    if (IsControlJustPressed(1, KeyOpenClose)) {
        isPhoneShow = !isPhoneShow
        setPhoneShow(isPhoneShow)
    }

    if (BLOCK_KEYS) {
        DisableControlAction(0, 1, true) // LookLeftRight
        DisableControlAction(0, 2, true) // LookUpDown
        DisableControlAction(0, 36, true) // CTRL, crouch
        DisableControlAction(0, 142, true) // MeleeAttackAlternate
        DisableControlAction(0, 106, true) // VehicleMouseControlOverride
        DisableControlAction(0, 12, true) // WeaponWheelUpDown
        DisableControlAction(0, 14, true) // WeaponWheelNext
        DisableControlAction(0, 15, true) // WeaponWheelPrev
        DisableControlAction(0, 16, true) // SelectNextWeapon
        DisableControlAction(0, 17, true) // SelectPrevWeapon
        DisableControlAction(0, 245, true) // T, Chat
        DisableControlAction(0, 140, true) // R, Melee attack
        DisableControlAction(0, 74, true) // H, Ragdoll
        DisableControlAction(0, 311, true) // K, Animations
        DisableControlAction(0, 29, true) // B, Point Finger
        DisableControlAction(0, 0, true) // V, Next camera
        DisableControlAction(0, 243, true) // ~, Player Menu
        DisableControlAction(0, 199, true) // P, Pause
        DisableControlAction(0, 200, true) // ESC
        DisableControlAction(0, 322, true) // ESC

        DisableControlAction(0, 25, true) // Right Mouse

        // enter
        DisableControlAction(0, 18, true)
        DisableControlAction(0, 176, true)
        DisableControlAction(0, 191, true)
        DisableControlAction(0, 201, true)
        DisableControlAction(0, 215, true)
    }
})

onNet('esx:playerLoaded', (xPlayer) => {
    ESX.TriggerServerCallback('react_phone:get_phone_number', function (num) {
        myPhoneNumber = num

        SendNUIMessage({
            setPhoneNumber: true,
            phoneNumber: myPhoneNumber,
        })
    })
})

function callStart(phone, cb) {
    ESX.TriggerServerCallback('react_phone:startCall', function (result) {
        if (result == "call-out") {
            exports["mumble-voip"].addPlayerToCall(1001);
            TriggerEvent("react_phone:setAnim", "call")
        }

        if (cb) cb([200, result]);
    }, myPhoneNumber, phone);
}

function callAccept(phone, cb) {
    ESX.TriggerServerCallback('react_phone:call_accept', function (result) {
        if (cb) cb(result);
    }, myPhoneNumber, phone);

    exports["mumble-voip"].addPlayerToCall(1001);
    TriggerEvent("react_phone:setAnim", "call")
}

function callEnd(cb) {
    ESX.TriggerServerCallback('react_phone:endCall', function (result) {
        if (cb) cb('ok');
    }, myPhoneNumber);
    exports["mumble-voip"].removePlayerFromCall(1001);
    TriggerEvent("react_phone:setAnim", "text")
}

onNet('react_phone:incomingCall', (from_phone, to_phone) => {
    if (to_phone != myPhoneNumber) return;

    SendNUIMessage({
        incomingCall: true,
        from_phone: from_phone,
        to_phone: to_phone,
    })

    setPhoneShow(true)
})

onNet('react_phone:callAccepted', (from_phone, to_phone) => {
    if (to_phone != myPhoneNumber && from_phone != myPhoneNumber) return;

    SendNUIMessage({
        callAccepted: true,
        from_phone: from_phone,
        to_phone: to_phone,
    })
})

onNet('react_phone:callEnded', (from_phone, to_phone) => {
    if (to_phone != myPhoneNumber && from_phone != myPhoneNumber) return;

    SendNUIMessage({
        callEnded: true,
        from_phone: from_phone,
        to_phone: to_phone,
    })

    exports["mumble-voip"].removePlayerFromCall(1001)
    TriggerEvent("react_phone:setAnim", "text")
})


function setPhoneShow(val) {
    if (!myPhoneNumber || myPhoneNumber == 'empty') {
        isPhoneShow = false
    } else {
        isPhoneShow = val
    }

    if (isPhoneShow) {
        SendNUIMessage({ showPhone: true })
        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(true)
        BLOCK_KEYS = true
        TriggerEvent("react_phone:setAnim", "text")
    } else {
        SendNUIMessage({ showPhone: false })
        SetNuiFocus(false)
        BLOCK_KEYS = false
        TriggerEvent("react_phone:setAnim", "out")
    }
}

RegisterNuiCallbackType('setPhoneShow');
on(`__cfx_nui:setPhoneShow`, (data, cb) => {
    setPhoneShow(data);
})

onNet('inventory:onInventoryUpdate', (inventory) => {
    const xPlayer = ESX.GetPlayerData();
    if (inventory.category == "player-inventory" && inventory.identifier == xPlayer.identifier) {
        TriggerServerEvent('react_phone:update')
    }
})

onNet('react_phone:phoneChanged', function (phone) {
    myPhoneNumber = phone
    SendNUIMessage({
        setPhoneNumber: true,
        phoneNumber: phone,
    })
})

on('onResourceStop', function (resource) {
    if (resource == GetCurrentResourceName()) {
        SetNuiFocus(false)
    }
})

function takePhoto(cb) {
  CreateMobilePhone(1)
  CellCamActivate(true, true)
  let frontCam = false

//  if hasFocus == true then
    SetNuiFocus(false, false)
//    hasFocus = false
//  end

  const tickId = setTick(async () => {
    if (IsControlJustPressed(1, 32)) { // Test
	console.log('aaa')
    } else if (IsControlJustPressed(1, 27)) { // Toggle Mode
      frontCam = !frontCam
      CellFrontCamActivate(frontCam)

    } else if (IsControlJustPressed(1, 177)) { // cancel
      DestroyMobilePhone()
      CellCamActivate(false, false)
      cb(null)
      clearTick(tickId)

    } else if (IsControlJustPressed(1, 176)) { // take picture
      exports['screenshot-basic'].requestScreenshotUpload(data.url, data.field, function(data) {
        const resp = json.decode(data)
        DestroyMobilePhone()
        CellCamActivate(false, false)
        cb(resp.files[1].url)
        clearTick(tickId)
      })
    }

    HideHudComponentThisFrame(7)
    HideHudComponentThisFrame(8)
    HideHudComponentThisFrame(9)
    HideHudComponentThisFrame(6)
    HideHudComponentThisFrame(19)
    HideHudAndRadarThisFrame()
  })
}

RegisterNuiCallbackType('query_api');
on(`__cfx_nui:query_api`, (data, cb) => {

    switch (data.cmd) {
        case 'phone/show':
            setPhoneShow(true);
            cb([200, 'ok']);
            return

        case 'phone/hide':
            setPhoneShow(false);
            cb([200, 'ok']);
            return

        case 'phone/call/start':
            callStart(data.args.phone, cb);
            return

        case 'phone/call/end':
            callEnd();
            cb([200, 'ok']);
            return

        case 'phone/call/accept':
            callAccept(data.args.phone)
            cb([200, 'ok']);
            return

        case 'phone/photo/start':
            takePhoto((res) => {
                console.log(res)
                cb([200, 'ok']);
            })
            return
    }

    ESX.TriggerServerCallback('react_phone:query_api', (res) => {
        //console.log(cmd, json.encode(cb), json.encode(res))
        cb(res);
    }, data);
});

DestroyMobilePhone()
CellCamActivate(false, false)
