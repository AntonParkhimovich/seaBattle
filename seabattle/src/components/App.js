import StartComponent from "./GameComponents/Start";

class App {
    constructor(store, base) {
        this.store = store
        this.base = base
    }
    init() {
        this.base.init()
        StartComponent.init()
    }

}

export default App