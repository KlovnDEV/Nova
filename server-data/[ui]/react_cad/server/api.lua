local cam

function dbPost(query, args)
    local res = exports['db'].post(0, query, json.encode(args))

    local status = res[1]
    local data = res[2]

    if data then
        data = json.decode(data)
    end

    return data
end

function dbPostOne(query, args)
    local data = dbPost(query, args)

    -- local status = res[1]
    -- local data = res[2]

    if data and #data > 0 then
        data = data[1]
    end

    return data
end

function getRecord(id)
    return dbPostOne('cad/record/get', { ["id"] = id })
end

function getOrganizations(name)
    return dbPost('organizations/get', { ["name"] = name })
end

function getBudget(name, cb)
    ESX.Money.Get('budget', 'police', function(budget_police)
    ESX.Money.Get('budget', 'ambulance', function(budget_ambulance)
    ESX.Money.Get('budget', 'oil', function(budget_oil)
    ESX.Money.Get('budget', 'government', function(budget_government)
        cb({200, {
        ["police"] = budget_police,
        ["ambulance"] = budget_ambulance,
        ["oil"] = budget_oil,
        ["government"] = budget_government,
    }})
    end)
    end)
    end)
    end)
end

function getBudgetHistory(name)
    if name then
        return dbPost('stats/budget', { ["name"] = "budget", ["identifier"] = name })
    else
        return dbPost('stats/budget', { ["name"] = "budget" })
    end
end

function getEmployees(name)
    local PlayersWithRole = ESX.Roles.ListPlayersWithRole(name)
    local identities = {}

    for k,v in pairs(PlayersWithRole) do
        print(json.encode(v))
        local identity = ESX.Identity.Get(v.identifier)
        if identity and identity.firstname then
            identity.grade = v.grade
            identity.name = identity.firstname .. " " .. identity.lastname
            identity.id = v.identifier
            table.insert(identities, identity)
	else
		table.insert(identities, { grade = v.grade, name = v.identifier, identifier = v.identifier })
        end
    end
--ESX.Identity.Get

    return {200, {["employees"] = identities}}
end

function getGrades(name)

    local grades = ESX.Roles.Grades.Get(name)
    print(json.encode(grades))

    return {200, {["grades"] = grades}}
end

function jobsChangeGrade(identifier, role, grade)
    ESX.Roles.Set(identifier, role, grade)

    return {
    ["role"] = role,
    ["grade"] = grade,
    ["identifier"] = identifier,
    }
end

function jobsChangeSalary(role, grade, salary)
    local identityResponse = exports['db'].post(0, 'roles/grades/setsalary', json.encode({
        ["role"] = role,
        ["grade"] = grade,
        ["salary"] = salary,
    }))

    return {200, {
        ["role"] = role,
        ["grade"] = grade,
        ["salary"] = salary,
    }}
end

function getRecords(archived, organization)

    local isArchived = 0
    if archived then
        isArchived = 1
    end

    return dbPost('cad/record/list', { ["archived"] = isArchived, ["organization"] = organization })
end

function getRecordsByName(organization, firstname, lastname)
    return dbPost('cad/participants/byname', { ["organization"] = organization, ["firstname"] = firstname, ["lastname"] = lastname })
end

function saveRecord(args)
    if args.id < 0 then
        return dbPost('cad/record/create', { ["data"] = args })
    else
        return dbPost('cad/record/update', { ["id"] = args.id, ["data"] = args })
    end
end

function getLaws()
    return dbPost('cad/laws/list', {})
end

function getCertificates()
    return dbPost('certificates/list', {})
end

function getCertificate(id)
    return dbPostOne('certificates/get', { ["id"] = id })
end

function getTaxList()
    return dbPost('tax/getlist', {})
end

function createPerson(person)
    return dbPost('cad/person/create', person);
end

  function updatePerson(person)
    return dbPost('cad/person/update', person);
end

  function searchPerson(firstname, lastname, phone, status)
    local response = dbPost('cad/person/search', {
        ["firstname"] = firstname,
        ["lastname"] = lastname,
        ["phone"] = phone,
        ["status"] = status,
    });
    return response;
end

  function getPerson(id)
    local response = dbPost('cad/person/get', {
        ["id"] = id
    });
    return response;
end

function closeViolation(id)
    return dbPost('cad/violations/close', { ["id"] = id });
end

function createViolation(firstname, lastname, recordId, lawId, fineAmount, detentionAmount, closed)
    return dbPost('cad/violations/create', {
        ["firstname"] = firstname,
        ["lastname"] = lastname,
        ["recordId"] = recordId,
        ["lawId"] = lawId,
        ["fineAmount"] = fineAmount,
        ["detentionAmount"] = detentionAmount,
        ["closed"] = closed
    });
end

function getViolations(firstname, lastname, recordId)
    return dbPost('cad/violations/list', {
        ["firstname"] = firstname,
        ["lastname"] = lastname,
        ["recordId"] = recordId
    });
end

ESX.RegisterServerCallback('react_cad:queryApi', function(source, cb, data)

    local xPlayer = ESX.GetPlayerFromId(source)

    local cmd = data.cmd
    local args = data.args

    print('queryApi '..tostring(cmd))

    -- Laws
    if cmd == "getLaws" then
        cb(getLaws())
	    return
    end

    -- Certificates
    if cmd == "getCertificates" then
        cb(getCertificates())
	    return
    end
    if cmd == "getCertificate" then
        cb(getCertificate(args.id))
	    return
    end
    if cmd == "takePhotoStart" then
--        cb(takePhotoStart())
	    return
    end
    if cmd == "takePhotoEnd" then
--        cb(takePhotoEnd(args.url))
	    return
    end

    -- Organizations
    if cmd == "getOrganizations" then
        cb(getOrganizations(args.name))
	    return
    end

    -- Organization
    if cmd == "getBudget" then
        getBudget(args.name, cb)
	    return
    end

    if cmd == "getBudgetHistory" then
        local budgetHistory = getBudgetHistory(args.name)
        cb(budgetHistory)
	    return
    end

    if cmd == "getEmployees" then
        cb(getEmployees(args.name))
	    return
    end

    if cmd == "getGrades" then
        cb(getGrades(args.name))
	    return
    end

    if cmd == "cad/jobs/hire" then
        local xTarget = ESX.GetPlayerFromId(args.target)

        local role = ESX.Roles.Get(xTarget.identifier, args.org)
        if role.grade >= 0 then
            cb({500, "Роль уже назначена!"})
            return
        end

        TriggerClientEvent("react_cad:showNotification", xPlayer.source, "Нанят!")
        xTarget.showNotification("Вы были наняты!")
        ESX.Roles.Set(xTarget.identifier, args.org, 0)
        return
    end

    -- Roles

    -- getRoles ???

    if cmd == "jobsChangeGrade" then
        cb(jobsChangeGrade(args.identifier, args.role, args.grade))
	    return
    end

    if cmd == "jobsChangeSalary" then
        cb(jobsChangeSalary(args.role, args.grade, args.salary))
	    return
    end

    -- Records
    if cmd == "getRecord" then
        cb(getRecord(args.id))
	    return
    end

    if cmd == "getRecords" then
        cb(getRecords(args.archived, args.organization))
    end

    if cmd == "getRecordsByName" then
        cb(getRecordsByName(args.organization, args.firstname, args.lastname))
	    return
    end

    if cmd == "saveRecord" then
        cb(saveRecord(args))
	    return
    end

    -- Violations

    if cmd == "getViolations" then
        cb(getViolations(args.firstname, args.lastname, args.recordId))
	    return
    end

    if cmd == "createViolation" then
        cb(createViolation(args.firstname, args.lastname, args.recordId, args.lawId, args.fineAmount, args.detentionAmount, args.closed))
	    return
    end

    if cmd == "closeViolation" then
        cb(closeViolation(args.id))
	    return
    end

    -- Person

    if cmd == "createPerson" then
        cb(createPerson(args))
	    return
    end

    if cmd == "updatePerson" then
        cb(updatePerson(args))
	    return
    end

    if cmd == "searchPerson" then
        cb(searchPerson(args.firstname, args.lastname, args.phone, args.status))
	    return
    end

    if cmd == "getPerson" then
        cb(getPerson(args.id))
	    return
    end

    -- Tax
    if cmd == "getTaxList" then
        cb(getTaxList())
	    return
    end

    return cb(dbPost(cmd, args));
end)
