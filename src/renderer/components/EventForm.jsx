import '../styles/EventForm.css';

function EventForm() {
  return (
    <div className="form-box">
      <form className="eventForm">
        <div className="inputs">
          <input type="text" placeholder="Titre" name="title" />
        </div>
        <div className="inputs">
          <label for="date_debut">Debut : </label>
          <input type="date" id="date_debut" />
        </div>
        <div className="inputs">
          <label for="date_fin">Fin : </label>
          <input type="date" className="fin" id="date_fin" />
        </div>
        <div class="toggle">
          <input type="checkbox" id="temp" />
          <label for="temp">Journee entiere</label>
        </div>
        <div className="inputs">
          <input type="text" placeholder="Localisation" name="title" />
        </div>
        <div className="inputs">
          <textarea
            name="descr"
            placeholder="Description"
            cols="45"
            rows="10"
          ></textarea>
        </div>
        <input type="button" value="Enregistrer" />
      </form>
    </div>
  );
}
export default EventForm;
