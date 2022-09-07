---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
CollectActionModel = class()

function CollectActionModel:init() 
    self.blipConfig = Config.Blips.collect
    self.actionConfig = Config.Collect
    self.markerPrompt = _U('collect_marker_prompt')
    self.actionName = 'rawWood'
    self.weightErrorMsg = _U('error_inventory_weight')
    self.blipDistance = 50
    self.markerDistance = 2.5
    self.weaponCheck = true
    self.weaponModelName = 'WEAPON_HATCHET'
    self.weaponErrorMsg = _U('error_no_hatchet')
    self.progressBarTimer = 10000
    self.progressMsg = _U('progress')
    self.animationRepeat = 5
    self.animationTimer = 2000
    self.animationLib = 'melee@hatchet@streamed_core'
    self.animation = 'plyr_front_takedown'

    self.playerPed = PlayerPedId()
    self.isDead = IsPedDeadOrDying(playerPed, 1)
    self.isInVehicle = IsPedInAnyVehicle(playerPed, true)
    self.coords = GetEntityCoords(playerPed)
end

function CollectActionModel:action() 
    if #(vector3(self.blipConfig.x, self.blipConfig.y, self.blipConfig.z) - vector3(self.coords.x, self.coords.y, self.coords.z)) < self.blipDistance then
        for _, v in pairs(self.actionConfig) do
            if #(vector3(v.x, v.y, v.z) - vector3(self.coords.x, self.coords.y, self.coords.z)) < self.markerDistance and not self.isDead then
                ESX.ShowHelpNotification(self.markerPrompt)

                if IsControlJustReleased(0, 38) and not self.isDead and not self.isInVehicle then
                    -- preparing object --
                    local obj = {
                        actionName = self.actionName,
                        weightErrorMsg = self.weightErrorMsg,
                        weaponCheck = self.weaponCheck,
                        weaponModelName = self.weaponModelName,
                        weaponErrorMsg = self.weaponErrorMsg,
                        progressBarTimer = self.progressBarTimer,
                        progressMsg = self.progressMsg,
                        animationRepeat = self.animationRepeat,
                        animationTimer = self.animationTimer,
                        animationLib = self.animationLib,
                        animation = self.animation,
                    }

                    local validation = ESX.ObjectValidation(obj, _collectValidationModel, 'CollectActionModel:action() jobs_lumberjack')

                    if not validation then 
                        -- notify player ???--
                        return
                    end
                
                    local _action = CoreActionModel(obj)
                
                    _action:Do()

                    return
                end
            end
        end
    end
end
