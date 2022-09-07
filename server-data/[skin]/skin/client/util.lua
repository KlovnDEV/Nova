ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(10)
	end
end)

function Set (list)
  local set = {}
  for _, l in ipairs(list) do set[l] = true end
  return set
end

function string:split(delimiter)
  local result = { }
  local from  = 1
  local delim_from, delim_to = string.find( self, delimiter, from  )
  while delim_from do
    table.insert( result, string.sub( self, from , delim_from-1 ) )
    from  = delim_to + 1
    delim_from, delim_to = string.find( self, delimiter, from  )
  end
  table.insert( result, string.sub( self, from  ) )
  return result
end

function format_part(text, arg1)
	if text == "" then
		return ""
	end

	local words = string.split(text,"|")
	local words2 = {}

	for key, val in pairs(words) do
		if string.sub(val, 1, 1) == "#" then
			local arr = string.split(string.sub(val,2), ":")

			for key2, val2 in pairs(string.split(arr[1], ",")) do
				if val2 == tostring(arg1) then
					table.insert(words2, arr[2])
					break
				end
			end

		else
			table.insert(words2, val)
		end
	end

	return table.concat(words2,"")
end
