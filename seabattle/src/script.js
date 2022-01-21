import './style.css'
import App from "./components/App";
import store from "./components/GameStateStore";
import base from  "./components/BaseInit"

const app = new App(store, base)
app.init()