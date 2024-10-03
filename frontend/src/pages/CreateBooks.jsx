import React, {useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.post(
      baseUrl + 'books', data
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
      <h1 className="text-3xl my-4">Create Book</h1>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBooks