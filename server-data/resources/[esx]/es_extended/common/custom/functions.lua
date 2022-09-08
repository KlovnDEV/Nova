function timestampstr()
	if os then
		return os.date('%Y-%m-%d %H:%M:%S ')
	else
		return ""
	end
end

ESX.Debug = function(msg)
	print(('%s[^2DEBUG^7] %s^7'):format(timestampstr(), msg))
end

ESX.Error = function(msg, trace)
	if trace then
		print(('%s[^1ERROR^7] %s^7\n^1%s^7'):format(timestampstr(), msg, trace))
	else
		print(('%s[^1ERROR^7] %s^7'):format(timestampstr(), msg))
	end
end

ESX.Warn = function(msg)
	print(('%s[^3WARN^7] %s^7'):format(timestampstr(), msg))
end

ESX.Info = function(msg)
	print(('%s[^2INFO^7] %s^7'):format(timestampstr(), msg))
end
