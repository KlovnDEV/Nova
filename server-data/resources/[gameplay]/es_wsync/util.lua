
function timeToHMS(time)
	time = time

	hour = math.floor(((time)/3600)%24)
	minute = math.floor(((time)/60)%60)
	second = math.floor(time)%60

	return hour, minute, second
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
