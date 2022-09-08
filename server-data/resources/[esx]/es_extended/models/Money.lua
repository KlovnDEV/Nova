---------------------------------
-- copyright (c) Fill & Sadler -- 
--     All rights reserved     --
---------------------------------
MoneyModel = class()

function MoneyModel:init(name, identifier, amount) 
    self.name = name
    self.identifier = identifier
    self.amount = amount
end

function MoneyModel:setName(name) 
    self.name = name
end

function MoneyModel:setIdentifier(identifier) 
    self.identifier = identifier
end

function MoneyModel:setAmount(amount) 
    self.amount = amount
end

function MoneyModel:getObject() 
    return {
        name = self.name,
        identifier = self.identifier,
        amount = self.amount
    }
end
