Citizen.CreateThread(function()
	while true do
        -- This is the Application ID (Replace this with you own)
		SetDiscordAppId(823487477410693131)

        -- Here you will have to put the image name for the "large" icon.
		SetDiscordRichPresenceAsset('512')
        
        -- (11-11-2018) New Natives:

        -- Here you can add hover text for the "large" icon.
        SetDiscordRichPresenceAssetText('Ищет баги')
       
        -- Here you will have to put the image name for the "small" icon.
        SetDiscordRichPresenceAssetSmall('512')

        -- Here you can add hover text for the "small" icon.
        SetDiscordRichPresenceAssetSmallText('Play your own L.I.F.E.')


        -- (26-02-2021) New Native:

        --[[ 
            Here you can add buttons that will display in your Discord Status,
            First paramater is the button index (0 or 1), second is the title and 
            last is the url (this has to start with "fivem://connect/" or "https://") 
        ]]--
        -- SetDiscordRichPresenceAction(0, "First Button!", "fivem://connect/localhost:30120")
        -- SetDiscordRichPresenceAction(1, "Second Button!", "fivem://connect/localhost:30120")

        -- It updates every minute just in case.
		Citizen.Wait(60000)
	end
end)