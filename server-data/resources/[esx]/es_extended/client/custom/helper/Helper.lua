---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
ESX.IsTableEmpty = function(self)
    for _, _ in pairs(self) do
        return false
    end
    
    return true
end

ESX.ObjectValidation = function(obj, validationObject, func) 
    if ESX.IsTableEmpty(obj) or ESX.IsTableEmpty(validationObject) then
        ESX.Error('Object is emtpy in the function: ' .. func)

        return false
    end

    for k, _ in pairs(validationObject) do
        if not ESX.CheckIfValueInTable(obj, k) then
            ESX.Error('Error in the object validation in in the function: ' .. func)

            return false
        end
    end

    return true
end

ESX.CheckIfValueInTable = function(obj, value) 
    return obj[value] ~= nil
end

ESX.IsPlayerDead = function(playerPed) 
    return IsPedDeadOrDying(playerPed, 1)
end
