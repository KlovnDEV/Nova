math.randomseed(GetGameTimer())

function subtable(o1, o2)
    if o1 == o2 then return true end
    local o1Type = type(o1)
    local o2Type = type(o2)
    if type(o1) ~= 'table' then return false end
    if type(o2) ~= 'table' then return false end

    for key1, value1 in pairs(o1) do
        local value2 = o2[key1]
        if value2 == nil or subtable(value1, value2) == false then
            return false
        end
    end

    return true
end

function tablesEqual(t1,t2)
	if type(t1) == 'number' and type(t2) == 'number' then
		if math.abs(t1-t2) < 1e-7 then
			return true
		end
	end

	if type(t1) ~= 'table' or type(t2) ~= 'table' then
		return t1 == t2
	end

	for k,v in pairs(t1) do
		if not tablesEqual(t1[k], t2[k]) then
			return false
		end
	end

	for k,v in pairs(t2) do
		if not tablesEqual(t1[k], t2[k]) then
			return false
		end
	end

	return true
end

function generateString(length, charset)
--    math.randomseed(GetGameTimer())
    if length > 0 then
	local n = math.random(1, #charset)
        return generateString(length - 1, charset) .. charset:sub(n, n)
    else
        return ""
    end
end
