import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ title, image, diets, id }) {
  return (
    <div className="card">
      <div className="card_info">
        <h3>{title}</h3>
      </div>
      <div className="card_info2">
        <h5>Diets: {diets}</h5>
      </div>
      <div className="card_img">
        <img src={image} alt="img not found" width="300px" height="200px" />
      </div>
      <Link to={`/recipes/${id}`}>
        <button className="card_button">Detail</button>
      </Link>
    </div>
  );
}
