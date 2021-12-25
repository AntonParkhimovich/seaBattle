import './style/main.scss';
import{ ChangePlayer} from './components/gameStateComponents/ChangePlayer'
import{ Start } from './components/gameStateComponents/Start'
import{ Arragement } from './components/gameStateComponents/Arragement'
import { Game } from './components/gameStateComponents/Game';
import { Win } from './components/gameStateComponents/Win';
import {useSelector} from 'react-redux'


function App() {
  const component =  useSelector(state=> state.gameState.component)
  const components = {
    start: Start,
    arragement: Arragement,
    changePlayer: ChangePlayer,
    game: Game,
    win: Win
  }
  const RenderComponent = components[component]

  return (
    <div className="App">
    <RenderComponent/>
    </div>
  );
}

export default App;
