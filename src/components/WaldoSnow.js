import '../styles/WaldoSnow.css';
import {app, db} from './../index';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import waldoInSnow from '../images/waldo.jpg';
import waldo from '../images/waldoCharacter.jpg'
import wenda from '../images/wenda.jpg'
import wizard from '../images/wizard.jpg'
import odlaw from '../images/odlaw.jpg'

export default function WaldoSnow() {
    // keep track of which characters have been found
    const [charactersFound, setCharactersFound] = useState(
        {
            Waldo: false,
            Wenda: false,
            Wizard: false,
            Odlaw: false
        }
    );
    // store the point on the image where the user clicked
    let xCoordinate = 0;
    let yCoordinate = 0;

    // create dropdown menu for selecting the character
    const createMenu = (e) => {
        const menuContainer = document.getElementById('menuContainer');
        // check if a menu is currently displayed
        if(menuContainer.children) {
            removeMenu();
        }
        const characterArray = ['Waldo', 'Wenda', 'Wizard', 'Odlaw']
        characterArray.forEach(character => {
            let choice = document.createElement('div');
            choice.textContent = character;
            choice.addEventListener('click', checkChoice);
            menuContainer.appendChild(choice);
        })
        menuContainer.style.left = e.pageX + 'px';
        menuContainer.style.top = e.pageY + 'px';
    }

    // removes the menu
    const removeMenu = () => {
        let menuContainer = document.getElementById('menuContainer');
        while(menuContainer.firstChild) {
            menuContainer.removeChild(menuContainer.firstChild);
        };
    };

    // removes the wrong answer display
    const removeWrongAnswer = () => {
        if(document.getElementById('wrongAnswer')) {
            document.getElementById('wrongAnswer').remove();
        }
    }

    // retrieve coordinates for where the click took place with respect to the image only
    const getCoordinates = (e) => {
         // get the distance from the image's border to the edges of the page
         const imageRect = document.getElementById('waldoImage').getBoundingClientRect();
         const xDistance = imageRect.left - window.scrollX;
         const yDistance = imageRect.top - window.scrollY;

         // find x coordinate of click within image
         const x = e.pageX - xDistance;
         // find y coordinate of click within image
         const y = e.pageY - yDistance;

         // set the x and y coordinate states
         xCoordinate = x;
         yCoordinate = y;
    }   

    // when image is clicked a menu is created, and the coordinates of the click are stored in a state
    const imageClicked = async(e) => {
        // get rid of 'wrong answer div' if present
        removeWrongAnswer();
        getCoordinates(e);
        createMenu(e);
        console.log(xCoordinate)
    }

    // keep user from selecting a character that has already been found
    const checkIfFound = (name) => {
        if(charactersFound[name] === true) {
            return true;
        } else {
            return false;
        }
    }

    // check if x and y of click location in image is indeed within the bounds of the character selected
    // bounds is an object with left, right, top, bottom properties
    const isWithin = (bounds) => {
        console.log(bounds.left);
        console.log(bounds.right);
        console.log(xCoordinate);
        if(bounds.left <= xCoordinate && xCoordinate <= bounds.right && bounds.top <= yCoordinate && yCoordinate <= bounds.bottom) {
            return true;
        } else {
            return false;
        };
    };

    // check if coordinate clicked and character chosen match, listener for menu divs, need to use stop propogation
    const checkChoice = async(e) => {
        e.stopPropagation();
        // get name of character that user selected
        const name = e.target.textContent;
        // check if characer has already been found
        const alreadyFound = checkIfFound(name);
        if(alreadyFound === true) {
            alert(`${name} has already been found`);
            removeMenu();
            return;
        }
        // retrieve coordinate data from firestore
        const docRef = doc(db, "coordinates", "snow");
        const docSnap = await getDoc(docRef);
        const coordinates = docSnap.data();
        // get coordinate data related to selected character
        const characterCoordinates = coordinates[name];
        // see if x coordinate and y coordinate of click are within the bounds of the box formed by 'characterCoordinates'
        const choiceCorrect = isWithin(characterCoordinates)
        // if x and y coordinate are within, then 
        if(choiceCorrect === true) {
            // update charactersFound
            let charactersFoundClone = JSON.parse(JSON.stringify(charactersFound));
            charactersFoundClone[name] = true;
            setCharactersFound(charactersFoundClone);
            
            // modify image of character in header
            const characterImage = document.getElementById(name);
            characterImage.style.opacity = 0.5;
  
        } else {
            // remove menu
            removeMenu();
            // place div at coorindate of click that informs user their selection was wrong
            const wrong = document.createElement('div');
            wrong.id = 'wrongAnswer';
            wrong.textContent = `That is not ${name}`;
            wrong.style.position = 'absolute';
            document.body.appendChild(wrong);

            wrong.style.left = xCoordinate + 'px';
            wrong.style.top = yCoordinate + 'px';
            setTimeout(removeWrongAnswer, 2000);
        }
    }

    // check to see if all characters have been found
    const isGameOver = () => {
        // TODO: check gameProgress object, do all keys have value of true
        for(let key in charactersFound) {
            if(charactersFound[key] === false) {
                return false;
            }
        }
        console.log(true);
        return true;
    };

    useEffect(() => {
        isGameOver();
    }, [charactersFound])

    return (
        <div>
          <header>
              <div><h2>FIND:</h2></div>
              <div><img id="Waldo" src={waldo} alt="waldo"/><div>Waldo</div></div>
              <div><img id="Wenda" src={wenda} alt="wenda"/><div>Wenda</div></div>
              <div><img id="Wizard" src={wizard} alt="wizard"/><div>Wizard</div></div>
              <div><img id="Odlaw" src={odlaw} alt="odlaw"/><div>Odlaw</div></div>
          </header>
          <hr/>
          <img id="waldoImage" onClick={imageClicked} src={waldoInSnow} alt="find waldo in the snow"/>
          <div id="menuContainer"></div>
        </div>
    )
}