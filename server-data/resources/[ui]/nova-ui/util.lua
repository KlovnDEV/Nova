local DIFF_PERSISTENCE = {}

function TableDifference(table1, table2)
	local res = {}

	for k,v in pairs(table1) do
		if v ~= table2[k] then
			res[k] = v
		end
	end

	for k,v in pairs(table2) do
		if v ~= table1[k] then
			res[k] = table1[k]
		end
	end

	return res
end


function MakeDifference(name, table1)
	local persistent = DIFF_PERSISTENCE[name]

	if persistent == nil then
		DIFF_PERSISTENCE[name] = table1
		return table1
	end

	local diff = TableDifference(table1, persistent)
	DIFF_PERSISTENCE[name] = table1
	return diff
end

function MakeDifferentialQuery(query)
	local queryLine = query.query

	local res = MakeDifference(query.query, query)
	res.query = nil

	if next(res) == nil then
		return false
	end

	res.query = queryLine
	SendNUIMessage(res)

--	SendNUIMessage(query)
	return true
end