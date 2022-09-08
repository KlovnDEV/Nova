function Authorized(identifier, role)
--[[
	assert(identifier)
	assert(role)

	local clientRole = ESX.Roles.Get(identifier, role)
	if not clientRole or not clientRole.grade or clientRole.grade < 4 then
		return false
	end
]]--
	return true
end

function getJobInfo(source, role)
	local xPlayer = ESX.GetPlayerFromId(source)

	if not Authorized(xPlayer.identifier, role) then
		ESX.Error(string.format('Player "%s" tried to access JobInfo menu for role "%s" without having proper access rights!', xPlayer.identifier, tostring(role)), debug.traceback())
		return
	end

	local rolelist = ESX.Roles.ListPlayersWithRole(role)
	local gradelist = ESX.Roles.Grades.Get(role)
	local employees = {}
	local grades = {}

	for k,v in pairs(rolelist) do
		local identityResponse = exports['db'].post(0, 'identity/get', json.encode({
			["identifier"] = v.identifier,
		}))

		local charName = "Неизвестный"

		if identityResponse[1] == 200 then
			local identity = json.decode(identityResponse[2])
			if identity and #identity > 0 then
				charName = identity[1].firstname .. " " .. identity[1].lastname
			end
		end

		table.insert(employees, {
			["id"] = v.identifier,
			["name"] = charName,
			["grade"] = v.grade,
		})
	end

	for k,v in pairs(gradelist) do
		table.insert(grades, {
			["id"] = v.grade,
			["name"] = v.label,
			["salary"] = v.salary,
		})
	end

	return {
		["employees"] = employees,
		["grades"] = grades
	}
end

ESX.RegisterServerCallback('react_cad:getJobInfo', function(source, cb, role)
	cb(getJobInfo(source, role))
end)

RegisterNetEvent('react_cad:setJobSalary')
AddEventHandler('react_cad:setJobSalary', function(job, grade, salary)
	assert(job)
	assert(grade ~= nil)
	assert(salary ~= nil)

	local xPlayer = ESX.GetPlayerFromId(source)

	if not Authorized(xPlayer.identifier, job) then
		ESX.Error(string.format('Player "%s" tried to set job salary for role "%s" without having proper access rights!', xPlayer.identifier, tostring(role)), debug.traceback())
		return
	end

	if salary <= 0 then
		return
	end

	local identityResponse = exports['db'].post(0, 'roles/grades/setsalary', json.encode({
		["role"] = job,
		["grade"] = grade,
		["salary"] = salary,
	}))

end)

--[[
RegisterNetEvent('react_cad:setEmployeeGrade')
AddEventHandler('react_cad:setEmployeeGrade', function(role, identifier, grade)
	assert(role)
	assert(identifier)
	assert(grade)

	local xPlayer = ESX.GetPlayerFromId(source)

	if not Authorized(xPlayer.identifier, job) then
		ESX.Error(string.format('Player "%s" tried to set job grade for role "%s", identifier "%s" without having proper access rights!', xPlayer.identifier, tostring(role), tostring(identifier)), debug.traceback())
		return
	end

        if grade <= 0 then
		ESX.Roles.Remove(identifier, role)
        else
		ESX.Roles.Set(identifier, role, grade)
        end
end)
]]--
