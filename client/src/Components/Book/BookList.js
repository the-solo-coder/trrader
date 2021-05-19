import React from 'react';

const BookList = (props) => {
    return ( 
    <div>
        <ul className="collection with-header">
            <li className="collection-header"><h4>Books</h4></li>
            {props.books.map((item) => (
                <a href="#!" className="collection-item" key={item._id}
            >{item.name} - {item.author}: {item.price}</a>
            ))}
        </ul>
    </div> 
    );
}
 
export default BookList;
