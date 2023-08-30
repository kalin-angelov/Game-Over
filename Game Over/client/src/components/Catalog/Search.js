import styles from './Search.module.css';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

import { useContext } from "react";
import { getAll } from '../../service/gameService';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const navigate = useNavigate();
    const { gamesList, setGameList } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        searchFor: '',
        searchBy: ''
    });

    const onSearch = async (e, body) => {
        e.preventDefault();
        const { searchFor, searchBy } = body;
        const result = await getAll();
        setGameList(result);
        
        if (searchFor === '') {
          navigate('/catalog')
        } else {
            const result = gamesList.filter(item => 
            item[searchBy.toLowerCase()].toLowerCase().includes(searchFor.toLowerCase()));
            setGameList(result);
        }
        console.log(gamesList);
    };

    return (
        <div className={styles.search}>
            <form className={styles.searchBox} onSubmit={(e) => onSearch(e, formValue)}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                    type="text" 
                    placeholder="Search"
                    name="searchFor"
                    value={formValue.search}
                    onChange={onFormValueChange}
                />
                <select 
                    name="searchBy"
                    value={formValue.searchBy}
                    onChange={onFormValueChange}
                >
                    <option value="" disabled hidden>Search By</option>
                    <option>Title</option>
                    <option>Help</option>
                    <option>Platform</option>
                </select>
                <button>Click</button>
            </form>
        </div>
    );
}