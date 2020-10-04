import { CommandsMapper } from "../types";

import common from "./common";
import pomodoro from "./pomodoro";

const allCommands: CommandsMapper = {
    ...common,
    ...pomodoro
}

export default allCommands;