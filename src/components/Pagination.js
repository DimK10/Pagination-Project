import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Pagination = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);

    const makeArrayOfPages = () => {
        let pages = [];
        for(let i = 1; i<= props.numOfPages; i++){
            pages.push(i);
        };
        return pages;
    }

    useEffect(() => {
        let pages = makeArrayOfPages();
        setPages(pages);
    }, [props.numOfPages]);

    useEffect(() => {
        console.log('props: ', props);
        
        console.log('pages: ', pages);
        
    }, [props.numOfPages]);

    const goToPrevious = () => {
        if(currentPage >= 1){
            setCurrentPage(currentPage - 1);
            props.changeCurrentPage(currentPage);
        };
    };

    const goToNext = () => {
        if(currentPage <= props.numOfPages){
            setCurrentPage(currentPage + 1);
            props.changeCurrentPage(currentPage);
        };
    };

    const updateCurrentNumberPage = (event) => {
        let number = parseInt(event.currentTarget.textContent);
        console.log('number: ', number);
        

        if(number !== currentPage) {
            // Update
            setCurrentPage(number);
            props.changeCurrentPage(number);
        };
    };

    return (
        <nav aria-label="..." style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
            <ul className="pagination">
                {/*<li className="page-item">
                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active">
                    <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                </li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li> */}
                <li className="page-item">
                        <a className="page-link" onClick={goToPrevious} style={{ color: '#2E7BFF', cursor: 'pointer' }}>Previous</a>
                </li>
                {pages.map((page, index) => {
                    
                    
                    return (
                    <li className="page-item" key={index} style={{ cursor: 'pointer' }}>
                        <a  className="page-link" style={{ color: currentPage === parseInt(page) ? 'white' : 'black' , backgroundColor: currentPage === parseInt(page) ? '#2E7BFF' : 'white'}} onClick={updateCurrentNumberPage}>{page}</a>
                    </li>
                )})}
                <li className="page-item">
                    <a className="page-link" onClick={goToNext} style={{ color: '#2E7BFF', cursor: 'pointer' }}>Next</a>
                </li>

            </ul>
        </nav>
    );
};

export default Pagination;