AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'strength', 1000000, '#CFAD0F', function(status)
		return true
	end, function(status)
		status.remove(math.floor(status.getPercent()*0.08))
	end)

	TriggerEvent('esx_status:registerStatus', 'agility', 1000000, '#0C98F1', function(status)
		return true
	end, function(status)
		status.remove(math.floor(status.getPercent()*0.06))
	end)

	TriggerEvent('esx_status:registerStatus', 'endurance', 1000000, '#0C98F1', function(status)
		return true
	end, function(status)
		status.remove(math.floor(status.getPercent()*0.05))
	end)


	TriggerEvent('esx_status:registerStatus', 'intelligence', 1000000, '#0C98F1', function(status)
		return true
	end, function(status)
		status.remove(math.floor(status.getPercent()*0.04))
	end)
end)
