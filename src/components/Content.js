import React, { useState, useEffect } from 'react';
import Card from './Card';
import Pagination from './Pagination'
import mockData from '../mock';

const Content = (props) => {

    const [values, setValues] = useState({
        currentPage: 1,
        start: 0,
        finish: 5,
        itemsDisplayed: props.itemsDisplayed,
        remainingItems: 0
    });


    const changeCurrentPage = (newPage) => {
        setValues({ ...values, currentPage: newPage });
    };

    const [propsForChild, setPropsForChild] = useState({
        changeCurrentPage, 
        numOfPages: 1 // pages are the total number of pages required
    });


    const computeTotalNumOfPages = () => {
        
        let numOfPages = Math.floor(mockData.length / props.itemsDisplayed);
        let remainingItems = mockData.length % props.itemsDisplayed;

        if(remainingItems !== 0) {
            numOfPages += 1;
        };

        setValues({ ...values, remainingItems });
        setPropsForChild({ ...propsForChild, numOfPages });
    };

    useEffect(() => {
        setValues({...values, itemsDisplayed: props.itemsDisplayed});
    }, [props.itemsDisplayed]);



    useEffect(() => {
        computeTotalNumOfPages();
    }, []);

    useEffect(() => {
        computeTotalNumOfPages();
    }, [values.itemsDisplayed]);

    useEffect(() => {
        calculateRangeOfItems();
    }, [values.currentPage, values.itemsDisplayed]);

    const calculateRangeOfItems = () => {
        const finish = (values.currentPage * props.itemsDisplayed) - 1;
        const start = finish - (props.itemsDisplayed - 1);

        setValues({ ...values, start, finish });
    };

    const showItems = (start, finish) => {

        let itemsToShow = mockData.filter((item, index) => {
            if(index >= start && index <= finish) {
                return item;
            };
        });

        return itemsToShow;
    };

    return (
        <div>
            <div className="row">
                {showItems(values.start, values.finish).map((item, index) => (
                    <div className="col-4 mb-3" key={index}>
                        <Card item={item} />
                    </div> 
                ))}
            </div>
            <div className="row"></div>
            <hr style={{ width: '50%' }}/> 
            <Pagination {...propsForChild}/>
        </div>
    );
};

export default Content;