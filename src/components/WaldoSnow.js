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
    const [gameProgress, setGameProgress] = useState(
        {
            waldoFound: false,
            wendaFound: false,
            wizardFound: false,
            odlawFound: false
        }
    );
    // store the point on the image where the user clicked
    const [xCoordinate, setXCoordinate] = useState();
    const [yCoordinate, setYCoordinate] = useState();

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
            // TODO: add event listener for click to each

            menuContainer.appendChild(choice)
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

    // retrieve coordinates for where the click took place with respect to the image only
    const getCoordinates = (e) => {
         // get the distance from the image's border to the edges of the page
         const imageRect = document.getElementById('waldoImage').getBoundingClientRect();
         const xDistance = imageRect.left - window.scrollX;
         const yDistance = imageRect.top - window.scrollY;

         // find x coordinate of click within image
         const xCoordinate = e.pageX - xDistance;
         // find y coordinate of click within image
         const yCoordinate = e.pageY - yDistance;

         // set the x and y coordinate states
         setXCoordinate(xCoordinate);
         setYCoordinate(yCoordinate);
    }

    // 


    // when image is clicked a menu is created, and the coordinates of the click are stored in a state
    const imageClicked = (e) => {
        createMenu(e);
        getCoordinates(e);
    }

    // check if coordinate clicked and character chosen match, listener for menu divs, need to use stop propogation
    const checkChoice = (e) => {
        e.stopPropogation();

    }


    // check to see if all characters have been found
    const isGameOver = () => {
        // TODO: check gameProgress object, do all keys have value of true
        for(let key in gameProgress) {
            if(gameProgress[key] === false) {
                return false;
            }
        }
        return true;
    };
  

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