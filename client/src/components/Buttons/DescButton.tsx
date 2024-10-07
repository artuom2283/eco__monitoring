import React from "react";
import SortDescImg from "../../assets/arrow-down.png";

interface DescButtonProps {
    param: string,
    sort: (param: string, order: "desc",) => Promise<void>,
}

export class DescButton extends React.Component<DescButtonProps> {
    handleSort = async () => {
        const {sort, param} = this.props;
        const order = "desc";
        sort(param, order);
    };

    render() {
        return (
            <button className='sort-button sort-descending' onClick={this.handleSort}>
                <img src={SortDescImg} alt="Sort Descending" className="small-img"/>
            </button>
        );
    }
}