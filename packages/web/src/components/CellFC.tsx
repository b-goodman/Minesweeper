import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";

import { Coord } from "@minesweeper/core/src/interfaces";
import { DefaultState } from '../store';

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

    }
}

const mapStateToProps = (state: DefaultState, ownState: OwnProps) => {
    return {
        coordinate: ownState.coordinate,
        key: ownState.key,
    }
}


const ConnectedCell = ({}) => (
    <div>

    </div>
)

const CellFC = connect(mapStateToProps, mapDispatchToProps)(ConnectedCell);

export default CellFC;