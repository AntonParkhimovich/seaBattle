import DataParser from "./DataParser";
import base from "../BaseInit";
import ArragementSceneData from "../../Scene Data/ArragementScene";
import * as THREE from "three";
import { checkBattleField } from "./../checkBattleFIeld";
import Game from "./Game";
import changeMove from "./ChangeMoove";
import store from "../GameStateStore";
class Arragement extends DataParser {
  draggableObject = null;
  plane = [];
  ships = [];
  startShipPosition = new THREE.Vector3();
  directionShips = "horizontally";
  mouseMoveListener;
  listenerOnClick;
  constructor(base, data, store) {
    super(base, data);
    this.store = store;
  }

  async init() {
    await super.init();
    this.addListenerOnClick();
    this.addEventListenerOnMouseMove();
    this.addButton();
    this.sortSceneModels();
    this.store.dispatchActions({ type: "initField", value: null });
  }
  addListenerOnClick() {
    const listenerOnClick = () => {
      if (this.draggableObject) {
        this.onDragEnd();
      } else {
        this.onDragStart();
      }
    };
    window.addEventListener("click", listenerOnClick);
    this.listenerOnClick = listenerOnClick;
  }

  addEventListenerOnMouseMove() {
    const mouseMoveListener = () => {
        this.intersectPlane = this.store.initialState.gameState.move === 'player1'?this.base.scene.children[2].children[2]: this.base.scene.children[2].children[3]
      const intersect = this.base.raycaster.intersectObject(
        this.intersectPlane
      );
      if (this.draggableObject !== null) {
        if(intersect.length!== 0){
            const intersectPosition = intersect[0].point;
            this.draggableObject.position.x = intersectPosition.x;
            this.draggableObject.position.y = 0.5;
            this.draggableObject.position.z = intersectPosition.z;
        }
      }
    };
    window.addEventListener("mousemove", mouseMoveListener);
    this.mouseMoveListener = mouseMoveListener;
  }
  onDragEnd() {
    let { x, y } = this.base.normalizeCoordinates(
      this.draggableObject.position,
      this.store.initialState.gameState.move,
      "arragement"
    );
    this.addShipOnPlane(x, y);
  }
  onDragStart() {
    const intersectObjects = this.base.raycaster.intersectObjects(this.ships);
    if (intersectObjects.length > 0) {
      this.draggableObject = intersectObjects[0].object.parent;
      this.startShipPosition.x = this.draggableObject.position.x;
      this.startShipPosition.z = this.draggableObject.position.z;
      this.startShipPosition.y = this.draggableObject.position.y;
    }
  }
  addButton() {
    const button = document.createElement("button");
    button.textContent = "Change Direction";
    button.className = "button";
    document.body.appendChild(button);
    button.onclick = () => this.changeShipDirection();
  }
  changeShipDirection() {
    const shipRotation = this.directionShips === "horizontally" ? 1.6 : 0;
    this.ships.forEach((ship) => (ship.rotation.y = shipRotation));
    this.directionShips =
      this.directionShips === "horizontally" ? "vertically" : "horizontally";
  }
  sortSceneModels() {
    const modelsPlayer1 = this.base.scene.children[2].children[0].children;
    const modelsPlayer2 = this.base.scene.children[2].children[1].children;
    const models =
      this.store.initialState.gameState.move === "player1"
        ? modelsPlayer1
        : modelsPlayer2;
    const { shipsConfig } = this.data;
    models.forEach((model) => {
      if (model.name in shipsConfig) {
        model.deck = shipsConfig[model.name].shipDeck;
        this.ships.push(model);
      } else {
        this.plane.push(model);
      }
    });
  }
  addShipOnPlane(x, y) {
    const resultsCheck = checkBattleField(
      x,
      y,
      this.draggableObject.deck,
      this.store.initialState[this.store.initialState.gameState.move].field,
      this.directionShips,
      this.ships
    );
    const move = this.store.initialState.gameState.move;
    if (resultsCheck.checkCell) {
      this.draggableObject.position.ceil();
      if (move === "player1") {
        this.draggableObject.position.x -= 0.5;
        this.draggableObject.position.z -= 0.2;
      }
      if (move === "player2") {
        this.draggableObject.position.x -= 0.2;
        this.draggableObject.position.z -= 0.5;
      }
      this.draggableObject.position.y = 0.5;
      this.store.dispatchActions({
        type: "addShip",
        value: this.draggableObject,
      });
      this.store.dispatchActions({
        type: "addShipCell",
        value: resultsCheck.shipCell,
      });
      this.store.dispatchActions({
        type: "blockCell",
        value: resultsCheck.cell,
      });
      this.ships.forEach((ship, index) =>
        ship.name === this.draggableObject.name
          ? this.ships.splice(index, 1)
          : null
      );
      this.draggableObject = null;
      this.ships.length === 0 ? changeMove.init() : null;
    } else {
      this.draggableObject.position.x = this.startShipPosition.x;
      this.draggableObject.position.y = this.startShipPosition.y;
      this.draggableObject.position.z = this.startShipPosition.z;
      this.draggableObject = null;
    }
  }
  removeAllListener() {
    window.removeEventListener("mousemove", this.mouseMoveListener);
    window.removeEventListener("click", this.listenerOnClick);
  }
  removeButton() {
    const button = document.querySelector(".button");
    button.remove();
  }
}
const ArragementComponent = new Arragement(base, ArragementSceneData, store);

export default ArragementComponent;
