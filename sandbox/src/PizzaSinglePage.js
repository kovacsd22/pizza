import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

export function PizzaSinglePage() {
  const param = useParams();
  const pizzaId = param.Id;

  const [pizza, setPizza] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);

    fetch(`https://pizza.kando-dev.eu/api/Pizza/${pizzaId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPizza(data))
      .catch(console.log)
      .finally(() => {
        setPending(false);
      });
  }, [pizzaId]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !pizza.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <div className="card p-3">
            <div className="card-body">
              <h4>{pizza.name}</h4>
            </div>
            <h5 className="card-title">
              {pizza.isGlutenFree ? "Gluténmentes" : "Nem gluténmentes"}
            </h5>
            <NavLink to={"/"}>
              <img
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
                alt={pizza.name}
                src={
                  pizza.kepURL
                    ? pizza.kepURL
                    : "https://via.placeholder.com/400x800"
                }
              />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
