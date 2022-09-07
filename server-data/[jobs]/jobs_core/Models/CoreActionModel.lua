---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
CoreActionModel = class()

-- constructor --
function CoreActionModel:init(o)
    self.actionName = o.actionName 
    self.weightErrorMsg = o.weightErrorMsg
    self.weaponCheck = o.weaponCheck
    self.weaponModelName = o.weaponModelName
    self.weaponErrorMsg = o.weaponErrorMsg
    self.progressBarTimer = o.progressBarTimer
    self.progressMsg = o.progressMsg
    self.animationRepeat = o.animationRepeat
    self.animationTimer = o.animationTimer
    self.animationLib = o.animationLib
    self.animation = o.animation

    self.playerPed = PlayerPedId()
end

function CoreActionModel:Do()
    if self.weaponCheck and self.weaponModelName then
        local check = GetSelectedPedWeapon(self.playerPed) == GetHashKey(self.weaponModelName)

        if not check then 
            ESX.ShowNotification(self.weaponErrorMsg) 
            
            return 
        end
    end

    ESX.TriggerServerCallback('jobs_core:checkWeight', function(weightCheck) 
        if not weightCheck then
            ESX.ShowNotification(self.weightErrorMsg)

            return
        end

        InAction = true

        FreezeEntityPosition(self.playerPed, true)
        exports['fill_progress_bar']:StartProgressBar(self.progressBarTimer, self.progressMsg)

        for i = 1, self.animationRepeat, 1 do
            ESX.Animation.Start(self.animationLib, self.animation, self.animationTimer)
            
            Citizen.Wait(self.animationTimer)
        end
        
        FreezeEntityPosition(self.playerPed, false)
        TriggerServerEvent('jobs_core:proceed', self.actionName)

        InAction = false
    end, self.actionName)
end
