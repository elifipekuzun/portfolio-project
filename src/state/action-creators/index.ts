import { ActionTypes } from '../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  Direction,
} from '../actions';
import { CellTypes } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: { id, content },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: { id },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: { id, direction },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: { id, type },
  };
};
