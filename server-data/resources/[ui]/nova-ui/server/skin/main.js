let ESX = null;
emit('esx:getSharedObject', (obj) => { ESX = obj });

ESX.RegisterCommand('skin', 'admin', function(xPlayer, args, showError) {
    xPlayer.triggerEvent('nova-ui:openSkinChanger')
}, false, {help: "Open skin menu"})
