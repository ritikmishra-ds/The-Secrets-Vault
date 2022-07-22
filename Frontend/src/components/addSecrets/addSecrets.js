import React from "react";
import { useState } from "react";
import axios from 'axios';
import './addSecrets.css';

const AddSecrets = ({setAllSecrets}) => {

    const [secrets, setSecrets] = useState({
        title: "",
        description: ""
    });

    const handleChange = event =>{
        const {name, value} = event.target;

        setSecrets({
            ...secrets,
            [name]: value
        })
    }


    const addSecret = () => {

        if(secrets.title){


            axios.post("http://localhost:3001/addSecret", secrets)
            .then(res => setAllSecrets(res.data))
    
            setSecrets({
                title: "",
                description: ""
            });
        }

    };



    return (
        <div className="addSecrets">
            <input 
                className="inputBox title"
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Add title"
                value={secrets.title}
                onChange={handleChange}
            />

            <textarea
                className="inputBox description"
                type="text"
                name="description"
                autoComplete="off"
                placeholder="Add description here"
                value={secrets.description}
                onChange={handleChange}
            />

            

            <button className="addButton" onClick={addSecret}>Add</button>
        </div>
    )
}


export default AddSecrets