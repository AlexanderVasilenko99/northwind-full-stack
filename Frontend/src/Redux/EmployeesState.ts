// class component employeesState -> EmployeeModel[] and export
// Enum for action types and export
// interface for actions and export 
// Switch case for interface -> reducer function
// Store function for reducer

import { createStore } from "redux";
import EmployeeModel from "../Models/EmployeeModel";

export class EmployeesState{
    public employees: EmployeeModel[] = [];
}
export enum EmployeeActionTypes{
    SetEmployees = "SetEmployees",
    AddEmployee = "AddEmployee",
    DeleteEmployee = "DeleteEmployee",
    EditEmployee = "EditEmployee",
    ClearEmployees = "ClearEmployees"
}
export interface EmployeeActions{
    type:EmployeeActionTypes;
    payload?:any;
}
function EmployeeReducer(currentState = new EmployeesState(), action:EmployeeActions):EmployeesState{
    const newState = {...currentState};
    switch (action.type){
        case EmployeeActionTypes.SetEmployees:
            newState.employees = action.payload;
            break;
        case EmployeeActionTypes.AddEmployee:
            newState.employees.push(action.payload);
            break;
        case EmployeeActionTypes.DeleteEmployee:
            const idForDelete = currentState.employees.findIndex(e => e.id === action.payload)
            newState.employees.splice(idForDelete,1);
            break;
        case EmployeeActionTypes.EditEmployee:
            const idForUpdate = currentState.employees.findIndex(e => e.id === action.payload.id)
            newState.employees.splice(idForUpdate,1,action.payload);
            break;
        case EmployeeActionTypes.ClearEmployees:
            newState.employees = [];
            break;
    }
    return newState;
}

export const employeeStore = createStore(EmployeeReducer);