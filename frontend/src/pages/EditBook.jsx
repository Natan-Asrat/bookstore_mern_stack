import React, {useEffect, useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../config';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(baseUrl + 'books/' + id)
   .then(response => {
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    })
   .catch(error => {
      console.log(error);
      alert('Error while fetching book'); 
      setLoading(false);

    });
  }, []);
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.put(
      baseUrl + 'books/' + id, data
    ).then(response => {
      setLoading(false);
      navigate('/');
    }).catch(error => {
      console.log(error);
      alert('Error while creating book')
      setLoading(false);
    });

  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading?<Spinner />:''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-autow-[600px]">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
          <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          id="title" 
          className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
          <input 
          type="text" 
          name="author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          id="author" 
          className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
          type="number" 
          name="publishYear" 
          value={publishYear} 
          onChange={(e) => setPublishYear(e.target.value)} 
          id="publishYear" 
          className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook