const { BRIDGE_MAP } = require('../constants');

class BridgeMap {
  #position;
  #bridge;
  #userBridge;

  #isPassed;
  #bridgeMap;

  constructor({ position, bridge, userBridge }) {
    this.#position = position;
    this.#bridge = bridge;
    this.#userBridge = userBridge;
  }

  makeUserBridge() {
    this.#initBridgeMap();
    this.#checkIfLatestCommandFailed();
    this.#convertBridgeMapToPrint();

    return { isPassed: this.#isPassed, bridgeMap: this.#bridgeMap };
  }

  #initBridgeMap() {
    const directions = [BRIDGE_MAP.up_direction, BRIDGE_MAP.down_direction];
    this.#bridgeMap = directions.reduce((bridgeMap, currDirection) => {
      const currDirectionBridge = this.#bridge
        .splice(0, this.#position)
        .map(space =>
          space === currDirection ? BRIDGE_MAP.success_space : BRIDGE_MAP.empty_space,
        );
      bridgeMap[currDirection] = currDirectionBridge;
      return bridgeMap;
    }, {});
  }

  #checkIfLatestCommandFailed() {
    const latestDirectionIndex = this.#position - 1;
    const latestBridgeDirection = this.#bridge[latestDirectionIndex];
    const latestUserBridgeDirection = this.#userBridge[latestDirectionIndex];

    this.#isPassed = latestBridgeDirection === latestUserBridgeDirection;
    if (this.#isPassed) return;

    this.#bridgeMap[latestBridgeDirection][latestDirectionIndex] = BRIDGE_MAP.empty_space;
    this.#bridgeMap[latestUserBridgeDirection][latestDirectionIndex] = BRIDGE_MAP.empty_space;
  }

  #convertBridgeMapToPrint() {
    const convertedBridgeMap = Object.values(this.#bridgeMap)
      .reduce((convertedBridgeMap, currDirection) => {
        convertedBridgeMap.push(`[${currDirection.join('|')}]`);
        return convertedBridgeMap;
      }, [])
      .join('\n');

    this.#bridgeMap = convertedBridgeMap;
  }
}

module.exports = BridgeMap;
