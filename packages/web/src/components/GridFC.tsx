import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import { DefaultState } from '../store';

import Cell from "@minesweeper/core"
import CellFC from "./CellFC";
import "./Grid.css";



const  mapDispatchToProps = (dispatch: Redux.Dispatch<any> ) => {
    return {

    }
}

const mapStateToProps = (state: DefaultState): DefaultState => {
    return {
        Cells: state.Cells,
    }
}

const renderCellFCRow = (rowCells: readonly Cell[]) => {
    const row = rowCells.map( (cell) => {
        return <CellFC coordinate={cell.coordinate} key={cell.coordinate.join()} />
    });
    return <div className="row">{row}</div>;
}

const getChildren = (cells: ReadonlyArray<readonly Cell[]> ) => {
    return cells.map( (rowCells) => {
        return renderCellFCRow(rowCells)
    })
}

const ConnectedGrid: React.FunctionComponent< DefaultState > = ({ Cells, }) => (

        <div className="grid">
            {getChildren(Cells)}
        </div>
)



const GridFC = connect(mapStateToProps, mapDispatchToProps)(ConnectedGrid);

export default GridFC;