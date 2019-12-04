import React, { useState, useEffect } from 'react';
import Card from './Card';
import Pagination from './Pagination'
import mockData from '../mock';

const Content = () => {

    const [values, setValues] = useState({
        currentPage: 1,
        start: 0,
        finish: 5,
        itemsDisplayed: 6,
        numOfPages: 1, // pages are the total number of pages required
        remainingItems: 0
    });


    const changeCurrentPage = (newPage) => {
        setValues({ ...values, currentPage: newPage });
    };

    const [props, setProps] = useState({
        changeCurrentPage, 
        numOfPages: values.numOfPages
    });


    const computeTotalNumOfPages = () => {
        
        let numOfPages = Math.floor(mockData.length / values.itemsDisplayed);
        let remainingItems = mockData.length % values.itemsDisplayed;

        if(remainingItems !== 0) {
            numOfPages += 1;
        };
        // console.log('mockData.length: ', mockData.length);
        
        // console.log('numOfPages: ', numOfPages);
        // console.log('remainingItems: ', remainingItems);
        
        

        setValues({ ...values, numOfPages, remainingItems });
        setProps({ ...props, numOfPages });
    };

    useEffect(() => {
        computeTotalNumOfPages();
    }, []);

    useEffect(() => {
        calculateRangeOfItems();
    }, [values.currentPage]);

    useEffect(() => {
        console.log(values);
        
    }, [values.numOfPages]);

    const calculateRangeOfItems = () => {
        const finish = (values.currentPage * values.itemsDisplayed) - 1;
        const start = finish - (values.itemsDisplayed - 1);

        setValues({ ...values, start, finish });
    };

    const showItems = (start, finish) => {

        let itemsToShow = mockData.filter((item, index) => {
            if(index >= values.start && index <= finish) {
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
            <hr style={{ width: '50%' }}/> 
            <Pagination {...props}/>
        </div>
    );
};

export default Content;