function replacePlate(textureDict, plate_to_replace)

	if not HasStreamedTextureDictLoaded(textureDict) then
		RequestStreamedTextureDict(textureDict, true)
		while not HasStreamedTextureDictLoaded(textureDict) do
			Citizen.Wait(0)
		end
	end

	AddReplaceTexture('vehshare', plate_to_replace, textureDict, plate_to_replace)
end

AddEventHandler('playerSpawned', function(spawn)
	replacePlate('vehshare_replace', 'yankton_plate')
end)

Citizen.CreateThread(function()
	Citizen.Wait(1000)
	replacePlate('vehshare_replace', 'yankton_plate')
end)
