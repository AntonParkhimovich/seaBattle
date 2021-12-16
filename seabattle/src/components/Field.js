import { useSelector } from "react-redux"
import { Row } from "./Row"
export const Field = () => {
    const move = useSelector(state => state.gameState.move)
    const field = useSelector(state => state[move].field)

    return (<div className={'field'}>
        <ul className={'field-header'}>
            <li className={'field-header__item'}>A</li>
            <li className={'field-header__item'}>B</li>
            <li className={'field-header__item'}>C</li>
            <li className={'field-header__item'}>D</li>
            <li className={'field-header__item'}>E</li>
            <li className={'field-header__item'}>F</li>
            <li className={'field-header__item'}>G</li>
            <li className={'field-header__item'}>H</li>
            <li className={'field-header__item'}>I</li>
            <li className={'field-header__item'}>K</li>
        </ul>
        <div className={'field-main'}>
            <ul className={'field-main__list'}>
                <li className={'field-main__item'}>1</li>
                <li className={'field-main__item'}>2</li>
                <li className={'field-main__item'}>3</li>
                <li className={'field-main__item'}>4</li>
                <li className={'field-main__item'}>5</li>
                <li className={'field-main__item'}>6</li>
                <li className={'field-main__item'}>7</li>
                <li className={'field-main__item'}>8</li>
                <li className={'field-main__item'}>9</li>
                <li className={'field-main__item'}>10</li>
            </ul>
            <div className={'game-field'}>
                {field.map((row, index) => <Row row={row} index={index} />)}
            </div>
        </div>
    </div>
    )
}