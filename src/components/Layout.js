import React, { useState } from 'react';
import Content from './Content';
import mockData from '../mock';

const Layout = (props) => {

    const [itemsDisplayed, setItemsDisplayed] = useState(1);

    const handleItemsDisplayedChange = (event) => {
        const number = event.target.value;
        setItemsDisplayed(number);
    };

    return (
        <div>
            <div className="row jumbotron">
                <div className= "col">
                    <h2>Pagination Project</h2>
                    <p className="lead">Let's try to paginate!</p>
                </div>
                <div className="col">
                    <h4>Choose any option you want:</h4>
                    <form className="form-inline">
                    <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Number of items Displayed on each page</label>
                    <select className="custom-select my-1 mr-sm-2" onChange={handleItemsDisplayedChange}>
                        {mockData.map((data, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-6">
                    <Content itemsDisplayed={itemsDisplayed} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

export default Layout;