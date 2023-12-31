import { produce } from "immer";
import { ActionTypes } from "./actions";
import { CycleState } from "./reducer";


export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedDate: new Date(),
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: new Date(),
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    }
    default:
      return state;
  }
}
