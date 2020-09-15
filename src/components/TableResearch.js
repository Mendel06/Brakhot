import React, { useState,useEffect,useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import unsplash from '../API/unsplash';
import jsonbin from '../API/jsonbin';
import _ from 'lodash';

export const TableResearch = ({setSelectedSuggestion,setImages,setRandomLabel}) => {
    const [research, setResearch] = useState('');
    const [suggestions, setSuggestions] = useState ([]);
    const [table, setTable]= useState ([]);



    useEffect(() => {
    const getDataTable = async () => {
      const { data } = await jsonbin.get("/b/5f3d58e44d93991036184474/5");
      setTable(data);
    };
    getDataTable();
    }, []);

    
    const interval = useRef(null);
    useEffect(() => {
      if (!interval.current  && table.length > 0) {
        interval.current = setInterval(() => {
          const result = _.sample(table);
          setRandomLabel(result.label);
        }, 5000);
      }
    }, [table,setRandomLabel]);

    const onChange = (e, {newValue, m}) => setResearch(newValue);

    
    const onKeyDown= (event) => {
      if (event.key === 'Enter') {
          setSuggestions([research]);
          onSuggestionSelected();
        }
      }

    const getSuggestions = (research, tableList) => {
      const inputValue = research.trim().toLowerCase();
      const inputLength = inputValue.length;
    
      return inputLength === 0 ? [] : tableList.filter(table =>
        table.label.toLowerCase().slice(0, inputLength) === inputValue
      );
    }
       
    const onSuggestionSelected = async (event,{suggestion}) => {
      setSelectedSuggestion(suggestion);
      const suggestionLabelEn= suggestion.labelEn;
      const response = await unsplash.get('/search/photos',{
            params:{
              query: suggestionLabelEn,
            },           
      });


     const image = response.data.results[0].urls.thumb;
      setImages(image);  
    } 

    const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value, table));
    const onSuggestionsClearRequested = () => setSuggestions([]);
    const getSuggestionValue = suggestion => suggestion.label;
    //Rendu Tableau deroulant
    const renderSuggestion = suggestion => (
        <div>
          {suggestion.label}
        </div>
    );
    

    const inputProps = {
        placeholder: 'Rechercher...',
        value: research,
        onChange: onChange,
        onKeyDown: onKeyDown
    };
    
    return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      );
}