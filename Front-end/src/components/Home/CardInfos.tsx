import React from "react";

interface CardInfoProps {
    title: string;
    text: any;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, text }) => {
    return (
        <div className="col-md-4">
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title text-center">{title}</h5>
                    <p className="card-text">{text}</p>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
