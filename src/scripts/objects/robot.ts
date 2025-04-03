import Toy from "./toy";
import Grid from "./grid";
import { Coordinate, State, DirectionType, RotationType } from "../utils/types";
import { CARDINAL_DIRECTIONS } from "../utils/helpers";

export default class Robot extends Toy {
  constructor() {
    super();
  }

  getState() {
    return { ...this.state };
  }

  setState(newState: State) {
    this.state = newState;
  }

  place(
    position: Coordinate,
    dir: DirectionType
  ): { message: string; robot: Robot } {
    try {
      this.setState({
        ...this.getState(),
        position,
        facing: dir,
      });
      return {
        message: `Placed Robot at x:${position.x}, y:${
          position.y
        }, facing ${dir.toLowerCase()}`,
        robot: this,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  move(): { message: string; robot: Robot } {
    try {
      const currentState = this.getState();
      const newState = currentState;

      switch (currentState.facing) {
        case "NORTH":
          newState.position.y++;
          break;
        case "EAST":
          newState.position.x++;
          break;
        case "SOUTH":
          newState.position.y--;
          break;
        case "WEST":
          newState.position.x--;
          break;
      }

      Grid.validatePosition(newState.position);
      this.setState(newState);
      return {
        message: `Moved ${
          currentState.facing!.toLowerCase() || ""
        }; New position is x:${newState.position.x}, y:${newState.position.y}`,
        robot: this,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }

  rotate(dir: RotationType): { message: string; robot: Robot } {
    try {
      const currentState = this.getState();
      const rotationStep = dir === "RIGHT" ? 1 : -1;
      const newDirectionIndex =
        (CARDINAL_DIRECTIONS.indexOf(currentState.facing || "") +
          rotationStep +
          CARDINAL_DIRECTIONS.length) %
        CARDINAL_DIRECTIONS.length;
      this.setState({
        ...currentState,
        facing: CARDINAL_DIRECTIONS[newDirectionIndex] as DirectionType,
      });
      return {
        message: `Rotated ${dir.toLowerCase()}`,
        robot: this,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
