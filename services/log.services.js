import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed(` Error `) + error)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(` SUCCESS `) + message)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] - погода в определённом городе
        -h - вывод помощи
        -t [API_KEY] - для сохранения токена`
    )
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgBlueBright(' WEATHER ')}
        Погода в городе ${res.name}
        ${icon}  ${res.weather[0].description}
        Температура ${res.main.temp} (ощущается как ${res.main.feels_like})
        Вланость: ${res.main.humidity}
        Скорость ветра: ${res.wind.speed}`
    )
}

export { printError, printSuccess, printHelp, printWeather }
