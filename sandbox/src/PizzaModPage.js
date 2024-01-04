import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function PizzaModPage() {
  const param = useParams();
  const navigate = useNavigate();
  const pizzaId = param.pizzaId;

  const [, setPizza] = useState({});
  const [modName, setModName] = useState("");
  const [modIsGlutenFree, setModIsGlutenFree] = useState(false);
  const [modKepURL, setModKepURL] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://pizza.kando-dev.eu/api/Pizza/${pizzaId}`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();

        setPizza(data);
        setModName(data.name);
        setModIsGlutenFree(data.isGlutenFree);
        setModKepURL(data.kepURL);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [pizzaId]);

  const handleNameChange = (e) => {
    setModName(e.target.value);
  };

  const handleIsGlutenFreeChange = (e) => {
    setModIsGlutenFree(e.target.checked);
  };

  const handleKepURLChange = (e) => {
    setModKepURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://pizza.kando-dev.eu/api/Pizza/${pizzaId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: modName,
        isGlutenFree: modIsGlutenFree,
        kepURL: modKepURL,
      }),
    })
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className="p-5 text-center content bg-lavender">
      <h2>Pizza módosítása</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Név:</label>
          <div>
            <input
              type="text"
              name="name"
              className="form-control"
              value={modName}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Gluténmentes:</label>
          <div>
            <input
              type="checkbox"
              name="isGlutenFree"
              className="form-check-input"
              checked={modIsGlutenFree}
              onChange={handleIsGlutenFreeChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
          <div>
            <input
              type="text"
              name="kepURL"
              className="form-control"
              value={modKepURL}
              onChange={handleKepURLChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
