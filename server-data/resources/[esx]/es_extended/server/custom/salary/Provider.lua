ESX.Salary = {}

ESX.Salary.Get = function(role, grade, cb)
    if not cb then 
        ESX.Error(_F(C.CB_ERROR, C.F.SALARY_GET), debug.traceback())

        return
    elseif not role then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.ROLE, C.F.SALARY_GET))

        return 
    elseif not grade then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.GRADE, C.F.SALARY_GET))

        return
    end
    
    MySQL.Async.fetchAll('SELECT * FROM salary WHERE role = @role AND grade = @grade', 
    {
        ['@role'] = role, 
        ['@grade'] = grade 
    }, function(response)
        if not response or ESX.IsTableEmpty(response) then
            ESX.Error(_F(C.EMPTY_DB_RESPONSE, C.F.SALARY_GET), debug.traceback())
            cb(nil)

            return
        end

        cb(response[1])
    end) 
end

ESX.Salary.Set = function(role, grade, name, label, salary, cb)
    if not cb then 
        ESX.Error(_F(C.CB_ERROR, C.F.SALARY_SET), debug.traceback())

        return
    elseif not role then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.ROLE, C.F.SALARY_SET))

        return 
    elseif not grade then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.GRADE, C.F.SALARY_SET))

        return
    elseif not name then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.SALARY_SET))

        return
    elseif not label then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.LABEL, C.F.SALARY_SET))

        return
    elseif not salary then  
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.SALARY, C.F.SALARY_SET))

        return
    elseif tonumber(salary) < 0 then
        ESX.Error(_F(C.NEGATIVE_AMOUNT, C.F.SALARY_SET))
    end
    
    MySQL.Async.execute('INSERT INTO salary(role, grade, name, label, salary) VALUES(@role, @grade, @name, @label, @salary)', 
    {
        ['@role'] = role, 
        ['@grade'] = grade,
        ['@name'] = name,
        ['@label'] = label,
        ['@salary'] = salary
    }, function(rowsChanged)
        if not rowsChanged then
            ESX.Error(_F(C.INSERT_DB_ERROR, C.F.SALARY_SET), debug.traceback())
            cb(nil)

            return 
        end

        cb('success')
    end)
end
