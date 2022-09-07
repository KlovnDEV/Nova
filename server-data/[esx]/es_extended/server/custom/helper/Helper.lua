-- copyright 2020 --
ESX.IsTableEmpty = function(self)
    for _, _ in pairs(self) do
        return false
    end
    
    return true
end
