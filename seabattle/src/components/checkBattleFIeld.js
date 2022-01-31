export const checkBattleField = (x, y, shipDeck, field, shipDirection) => {
    const results = {
        cell: [],
        checkCell: '',
        shipCell: []
    }
    if(x>10||x<0||y>10||y<0){
        results.checkCell = false
        return results
    }else {
        const settings = itterableSettings(x, y, shipDeck, shipDirection)
        const { startXiterrable, startYitterable, endXiterrable, endYiterrable } = settings
        for (let i = startYitterable; i < endYiterrable; i++) {
            for (let j = startXiterrable; j < endXiterrable; j++) {
                if (field[i][j] !== undefined) {
                    results.cell.push(field[i][j])
                }
            }
        }
        if (shipDeck > 1) {
            if (shipDirection === 'horizontally' && y + shipDeck - 1 < 10) {
                let yEndShip = y + shipDeck
                let yStartShip = y
                for (let i = yStartShip; i < yEndShip; i++) {
                    results.shipCell.push(field[i][x])
                }
            } if (shipDirection === 'vertically' && x + shipDeck - 1 < 10) {
                let xEndShip = x + shipDeck
                let xStartShip = x
                for (let i = xStartShip; i < xEndShip; i++) {
                    results.shipCell.push(field[y][i])
                }
            }
        } else {
            results.shipCell.push(field[y][x])
        }
        if(results.shipCell.length === 0 ){
            results.checkCell= false
        }else{
            results.checkCell = results.shipCell.every((cell) => cell.block === false)
        }
        return results
    }

}
const itterableSettings = (x, y, shipDeck, shipDirection) => {
    let settings = {
        startXiterrable: x - 1,
        endXiterrable: x + shipDeck + 1,
        startYitterable: y - 1,
        endYiterrable: y + shipDeck
    }
    if (shipDeck === 1) {
        settings.endYiterrable = y + shipDeck + 1
    } if (shipDirection === 'vertically' && shipDeck > 1) {
        settings.endXiterrable = x + shipDeck+1
        settings.endYiterrable = y +2
        if (settings.endYiterrable > 10) {
            settings.endYiterrable = 10
        }
    }
    if (shipDirection === 'horizontally' && shipDeck > 1) {
        settings.endYiterrable = y + shipDeck+1
        settings.endXiterrable = x + 2
        if (settings.endYiterrable > 10) {
            settings.endYiterrable = 10
        }
    }
    if (y === 0) {
        settings.startYitterable = 0
    }
    if (x === 0) {
        settings.startXiterrable = 0
    }
    if (x === 9) {
        settings.endXiterrable = x + 1
    }
    if (y === 9) {
        settings.endYiterrable = y + 1
    }
    return settings
}
export const checkHit = (shipCell, shipId) => {
    const shipArr = shipCell.filter(item => item.shipId === shipId)
    let resultsCheck = shipArr.every((cell)=>cell.shot === true)
    return resultsCheck
}