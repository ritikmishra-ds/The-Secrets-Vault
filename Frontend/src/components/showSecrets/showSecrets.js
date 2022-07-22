import React from "react";
import './showSecrets.css';
import axios from "axios";


const ShowSecrets = ({allSecrets, setAllSecrets}) => {

    const deleteSecret = (id) => {

        axios.post("http://localhost:3001/delete", {id})
        .then(res => setAllSecrets(res.data));
    };

    return(

        <div className="showSecrets row">
            {
                allSecrets.map(secret => (
                    <div className="secretCard col-md-3" key={secret._id}>
                        <h1 className="title">
                            {secret.title}
                            <i className="deleteIcon fa fa-trash" aria-hidden="true" onClick={() => deleteSecret(secret._id)} ></i> 

                        </h1>

                        <textarea 
                            className="descriptionBox"
                            value={secret.description}
                            readOnly 
                        />
                    </div>
                ))
            }

        </div>
    )
};

export default ShowSecrets