---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
StartCountdown = function(time)
	SendNUIMessage({time = time})
end

StopCountdown = function()
	SendNUIMessage({stop = true})
end
