import React, {useState} from 'react';
import './Stylesheet.css';
import logo from '../logo.png';
import { TableResearch } from './TableResearch';


//TODO 
//Que la page ne soit pas scrollable flexible
//Ajouter saut de ligne dans description
//centrer l'image en version mobile 
//delay de loading d'images


const App =() => {
    const [selectedSuggestion, setSelectedSuggestion] = useState (null);
    const [image, setImages] = useState([]);
    const [randomLabel, setRandomLabel] = useState(['Pomme'])
   
    return(
        <div className="container">
        <div className="website-logo item">
          <img className="ui image" src={logo} alt="website logo" />
        </div>
        <div className="ui container">
        <h2 className="header">{randomLabel}...Quelle est la bénédiction ?</h2> 
        </div>
        <div className="ui container">
          <TableResearch
            setSelectedSuggestion={setSelectedSuggestion}
            setImages={setImages}
            setRandomLabel={setRandomLabel}
          />  
          {selectedSuggestion ? (
            <div className="ui segment">
              <div className="ui items">
                <div className="item">
                  <div className="image-logo item">
                    <img className="ui image" alt="" src={image} />
                  </div>
                  <div className="content">
                    <h3 className="header">{selectedSuggestion.label}</h3>
                    <div className="meta">
                      <h4 className="header">
                        Brakha:
                        <span> {selectedSuggestion.value}</span>
                      </h4>
                    </div>
                    <div className="meta">
                      <h4 className="header">
                        Brakha:
                        <span className="span"> {selectedSuggestion.valueFr}</span>
                      </h4>
                    </div>
                    <div className="meta">
                      <h4 className="header">
                        Brakha Aharona:
                        <span> {selectedSuggestion.valueLast}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            <div className="ui segment">
                <div className="description">
                    <h5 className="header">Particularité:</h5>
                      <p className="description"> {selectedSuggestion.description}</p>
                 </div>
            </div>
            </div>          
          ) : null}
        </div>
      </div>
    ); 
};

export default App;