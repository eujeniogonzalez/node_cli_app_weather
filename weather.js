#!/ust/bin/env node

import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.services.js'
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token wasn't send")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved')
    } catch (error) {
        printError(error.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError("City wasn't send")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City saved')
    } catch (error) {
        printError(error.message)
    }
}

const getForcast = async (city) => {
    try {
        const city = process.env.city ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('City is wrong')
        } else if (e?.response?.status == 401) {
            printError('Token is wrong')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        return printHelp()
    }

    if (args.s) {
        return saveCity(args.s)
    }

    if (args.t) {
        return saveToken(args.t)
    }
    return getForcast(args.s)
}

initCLI()
