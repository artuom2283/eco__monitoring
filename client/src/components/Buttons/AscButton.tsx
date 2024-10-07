import React from "react";
import SortAscImg from "../../assets/arrow-up.png";

interface AscButtonProps {
    param: string,
    sort: (param: string, order: "asc") => Promise<void>,
}

export class AscButton extends React.Component<AscButtonProps> {
    handleSort = async () => {
        const {sort, param } = this.props;
        const order = "asc";
        sort(param, order);
    };

    render() {
        return (
            <button className='sort-button sort-ascending' onClick={this.handleSort}>
                <img src={SortAscImg} alt="Sort Ascending" className="small-img"/>
            </button>
        );
    }
}