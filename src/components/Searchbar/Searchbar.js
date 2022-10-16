import { useState } from "react";
import PropTypes from 'prop-types';
import {
  FormBtnStyled,
  FormStyled,
  InputStyled,
  SearchbarBox,
} from './Searchbar.styled';


export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  
  const handleChange = e => {
   setQuery(e.target.value.toLowerCase());
  };
  
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarBox>
          <FormStyled onSubmit={handleSubmit}>
            <FormBtnStyled
              type="submit"
            ></FormBtnStyled>
        <InputStyled
          onChange={handleChange}
          name="query"
          value={query}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </FormStyled>
    </SearchbarBox>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};