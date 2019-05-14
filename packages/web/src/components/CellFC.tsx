import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";

import { Coord } from "@minesweeper/core/src/interfaces";
import { DefaultState } from '../store';

import "./Cell.css";

interface DispatchProps {
    readonly event: () => void;
}

interface OwnProps {
    readonly coordinate: Coord;
    readonly key: string;
}

export type CellFCProps = DispatchProps & OwnProps & DefaultState

const  mapDispatchToProps = (dispatch: Redux.Dispatch<any> ) => {
    return {
        // uncover
        // (un)flag
        // highlight neighbours
    }
}

const mapStateToProps = (state: DefaultState, ownState: OwnProps) => {
    const cellState = state.Cells[ownState.coordinate[0]][ownState.coordinate[1]];
    return {
        isCovered: cellState.covered,
        flagged: cellState.flagged,
    }
}


const ConnectedCell = ({ isCovered, flagged }) => (
    <div
        className={`cell ${isCovered ? "covered" : ""} ${flagged ? "flagged" : ""}`}
    >

    </div>
)

const CellFC = connect(mapStateToProps, mapDispatchToProps)(ConnectedCell);

export default CellFC;