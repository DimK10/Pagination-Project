import React, { useState, useEffect } from 'react';

const Pagination = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [pagesRange, setPagesRange]= useState({
        start: 0,
        end: 9
    });

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

    useEffect(() => {
        setCurrentPage(currentPage);
        props.changeCurrentPage(currentPage);
    }, [currentPage]);



    const goToPrevious = () => {
        if(currentPage > 1){
            if(currentPage === pagesRange.start + 1) {
                setPagesRange({...pagesRange, start: pagesRange.start - 11, end: pagesRange.start - 1});
            };

            setCurrentPage(currentPage - 1);
        };
    };

    const goToNext = () => {
        if(currentPage < props.numOfPages){
            if(currentPage === pagesRange.end + 1) {
                setPagesRange({...pagesRange, start: pagesRange.end + 1, end: pagesRange.end + 11});
            };

            setCurrentPage(currentPage + 1);
            // props.changeCurrentPage(currentPage);
        };
    };

    const updateCurrentNumberPage = (event) => {
        let number = parseInt(event.currentTarget.textContent); 

        if(number !== currentPage) {
            // Update
            setCurrentPage(number);
            props.changeCurrentPage(number);
        };

        if(number === pages.length) {
            // We are in last page, page ranges must be changed accordingly
            setPagesRange({...pagesRange, start: pages.length - 10, end: number});
        };
    };

    const showDotAndLastPage = (pagesRange, pages) => {
        if(pagesRange.start < pages.length - 11) {
            return (
                <ul className="pagination">
                    <li className="page-item" style={{ cursor: 'default' }}>
                        <a  className="page-link btn disabled">...</a>
                    </li>
                    <li className="page-item" style={{ cursor: 'pointer' }}>
                        <button  className="page-link" style={{ color: currentPage === parseInt(pages.length) ? 'white' : 'black' , backgroundColor: currentPage === parseInt(pages.length) ? '#2E7BFF' : 'white'}} onClick={updateCurrentNumberPage}>{pages.length}</button>
                    </li>
                </ul>
            );
        };
    };

    return (
        <nav aria-label="..." style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
            <ul className="pagination">
                <li className="page-item">
                    {currentPage !== 1 && <button className="page-link" onClick={goToPrevious} style={{ color: '#2E7BFF', cursor: 'pointer' }}>Previous</button>}
                </li>
                {pages <= 10 ? (
                    pages.map((page, index) => {
                        return (
                        <li className="page-item" key={index} style={{ cursor: 'pointer' }}>
                            <button  className="page-link" style={{ color: currentPage === parseInt(page) ? 'white' : 'black' , backgroundColor: currentPage === parseInt(page) ? '#2E7BFF' : 'white'}} onClick={updateCurrentNumberPage}>{page}</button>
                        </li>
                    )})
                ) : (
                    pages.map((page, index) => {
                        if((index >= pagesRange.start && index <= pagesRange.end)) {
                            return (
                            <li className="page-item" key={index} style={{ cursor: 'pointer' }}>
                                <button  className="page-link" style={{ color: currentPage === parseInt(page) ? 'white' : 'black' , backgroundColor: currentPage === parseInt(page) ? '#2E7BFF' : 'white'}} onClick={updateCurrentNumberPage}>{page}</button>
                            </li>
                            )
                        }
                    })
                )}
                {showDotAndLastPage(pagesRange, pages)}
                <li className="page-item">
                    {currentPage !== pages.length && <button className="page-link" onClick={goToNext} style={{ color: '#2E7BFF', cursor: 'pointer' }}>Next</button>}
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;