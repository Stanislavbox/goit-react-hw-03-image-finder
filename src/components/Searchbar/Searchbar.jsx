import { Component } from "react";
import { SearchBar, StyledForm, SearchFormButton, SearchFormButtonLabel, StyledField, SearchIcon } from "./Searchbar.styled";
import { Formik } from 'formik';

class Searchbar extends Component {
  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values.searchInput);
    resetForm();
  };
  render() {
    return (
      <SearchBar>
        <Formik
          initialValues={{ searchInput: '' }}
          onSubmit={this.handleSubmit}
        >
          <StyledForm className="form">
            <SearchFormButton type="submit" className="button">
              <SearchIcon/>
              <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
            </SearchFormButton>

            <StyledField
              className="input"
              type="text"
              name="searchInput"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </StyledForm>
        </Formik>
      </SearchBar>
    );
  }
}

export default Searchbar;
