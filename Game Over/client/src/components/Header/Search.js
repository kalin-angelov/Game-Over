import styles from './Search.module.css';

import { AuthContext } from '../../contexts/AuthContext';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const navigate = useNavigate();
    const [searchFor, setSearchFor] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const { gamesList, setSearchResult } = useContext(AuthContext);
   
    const onSearch = (e) => {
        e.preventDefault();
        navigate('/catalog');
        
        let result;
        if (searchFor === '') {
            setSearchResult(null);
        } else {
            switch (searchBy) {
                case 'Help':
                    result = gamesList.filter(item => 
                        item.help.toLowerCase()
                        .includes(searchFor.toLowerCase()));
                    break;
                case 'Platform':
                    result = gamesList.filter(item => 
                        item.platform.toLowerCase()
                        .includes(searchFor.toLowerCase()));
                    break;
                case 'Title':
                    result = gamesList.filter(item => 
                        item.title.toLowerCase()
                        .includes(searchFor.toLowerCase())
                    )
                    break;
                default:
                    result = gamesList.filter(item => 
                        item.title.toLowerCase()
                        .includes(searchFor.toLowerCase())
                    )
                    break;
            };
            setSearchResult(result);
        };
    };

    const onClear = (e) => {
        e.preventDefault();
        navigate('/catalog');

        setSearchFor('');
        setSearchBy('');
        setSearchResult(null);
    };

    return (
        <section className={styles.search}>
            <form className={styles.searchForm} onSubmit={(e) => onSearch(e)}>
                <label htmlFor='serach'></label>
                <input 
                    id='search'
                    type='text' 
                    placeholder='Search'
                    name='searchFor'
                    role='searchbox'
                    value={searchFor}
                    onChange={(e) => {setSearchFor(e.target.value)}}
                />
                <button type='button' onClick={(e) => onClear(e)}><i className='fa-solid fa-xmark'></i></button>
                <select 
                    name='searchBy'
                    value={searchBy}
                    onChange={(e) => {setSearchBy(e.target.value)}}
                >
                    <option value='' disabled hidden>Search By</option>
                    <option>Title</option>
                    <option>Help</option>
                    <option>Platform</option>
                </select>
                <button type='submit'><i className='fa-solid fa-magnifying-glass'></i></button>
            </form>
        </section>
    );
}