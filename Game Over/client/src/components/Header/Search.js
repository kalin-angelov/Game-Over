import styles from './Search.module.css';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const navigate = useNavigate();
    const { gamesList, setSearchResult } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm({
        searchFor: '',
        searchBy: ''
    });

    const onSearch = (e, body) => {
        e.preventDefault();
        navigate('/catalog');
        
        const { searchFor, searchBy } = body;
        let result;

        if (searchFor === '') {
            setSearchResult(null);
        } else {
            switch (searchBy) {
                case "Help":
                    result = gamesList.filter(item => 
                        item.help.toLowerCase()
                        .includes(searchFor.toLowerCase()));
                    break;
                case "Platform":
                    result = gamesList.filter(item => 
                        item.platform.toLowerCase()
                        .includes(searchFor.toLowerCase()));
                    break;
                case "Title":
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

    return (
        <section className={styles.search}>
            <form className={styles.searchForm} onSubmit={(e) => onSearch(e, formValue)}>
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
            </form>
        </section>
    );
}