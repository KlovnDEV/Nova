---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
InAction = false

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        
        if InAction then
            for _, controlIndex in pairs(Config.DisableKeys) do
                DisableControlAction(0, controlIndex)
            end
        end
    end
end)
