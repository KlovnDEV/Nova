function ArrayToDict(arr, field)
	tmpArr = {}
	for k,v in pairs(arr) do
		tmpArr[v[field]] = v
	end
	return tmpArr
end
