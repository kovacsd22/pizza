import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export function PizzaDeletePage() {
  const navigate = useNavigate();
  const param = useParams();
  const pizzaId = param.pizzaId;

  const [pizza, setPizza] = useState({});
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);

    (async () => {
      try {
        const res = await fetch(
          `https://pizza.kando-dev.eu/api/Pizza/${pizzaId}`,
          { credentials: "include" },
        );
        const data = await res.json();
        setPizza(data);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    })();
  }, [pizzaId]);

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      await fetch(`https://pizza.kando-dev.eu/api/Pizza/${pizzaId}`, {
        method: "DELETE",
        credentials: "include",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !pizza.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Pizza törlése</h2>
          <div className="card p-3">
            <div className="card-body">
              <h4>{pizza.name}</h4>
              <h5 className="card-title">
                {pizza.isGlutenFree ? "Gluténmentes" : "Nem gluténmentes"}
              </h5>
              <div className="lead">{pizza.price}.- HUF</div>
              <p>Készleten: {pizza.quantity} db</p>
              <img
                className="img-fluid rounded"
                style={{ maxHeight: "500px" }}
                alt={pizza.name}
                src={
                  pizza.kepURL
                    ? pizza.kepURL
                    : "https://via.placeholder.com/400x800"
                }
              />
            </div>
            <form onSubmit={handleDelete}>
              <div>
                <NavLink to={"/"}>
                  <button className="bi bi-backspace btn btn-warning rounded">
                    Mégsem
                  </button>
                </NavLink>
                <button className="bi bi-trash3 btn btn-danger rounded">
                  Törlés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
