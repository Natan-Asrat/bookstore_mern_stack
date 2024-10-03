import React from 'react'
import BookCard from './BookCard';

const BooksCard = ({books}) => {
  return (
    <div className="grid sn:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
            <BookCard key={book._id} book={book} />
        ))}
    </div>
  )
}

export default BooksCard