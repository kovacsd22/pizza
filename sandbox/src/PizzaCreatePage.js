import { useNavigate } from "react-router-dom";

export function PizzaCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="p-5 text-center content bg-whitesmoke">
      <h2>Új pizza</h2>
      <form
        onSubmit={(e) => {
          e.persist();
          e.preventDefault();
          fetch("https://pizza.kando-dev.eu/api/Pizza", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              name: e.target.elements.name.value,
              isGlutenFree: e.target.elements.isGlutenFree.value,
              kepURL: e.target.elements.imageURL.value,
            }),
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Név:</label>
          <div>
            <input type="text" name="name" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Gluténmentes:</label>
          <div>
            <input type="number" name="isGlutenFree" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm3 col-form-label">Kép Url:</label>
          <div>
            <input type="text" name="imageURL" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
