import React from "react";
import "./AboutUsCard.css";

export const AboutUsCard = ({name, last_name, image_url, email, phone_number}) => {
    return (
        <div className="agent-card">
            <img src={image_url} alt={`${name} ${last_name}`} className="agent-image" />
            <div className="agent-info">
                <h3>{name} {last_name}</h3>
                <div className="contact-info">
                    <div className="contact-item">
                        <span className="contact-label">Email:</span>
                        <p className="contact-value">{email}</p>
                    </div>
                    <div className="contact-item">
                        <span className="contact-label">Teléfono:</span>
                        <p className="contact-value">{phone_number}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};