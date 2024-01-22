import '../styles/SettingsForm.css';

function SettingsForm() {
  return (
    <form className="settings-form">
      <div className="setting-box">
        <label className="option">Thème</label>
        <div className="values">
          <input type="radio" id="default" name="theme" />
          <label for="default">Par défaut</label>
        </div>
        <div className="values">
          <input type="radio" id="light" name="theme" />
          <label for="light">Sombre</label>
        </div>
        <div className="values">
          <input type="radio" id="dark" name="theme" />
          <label for="dark">Claire</label>
        </div>
      </div>
      <div className="setting-box">
        <label className="option">Action pour les notification</label>
        <div className="values">
          <input type="radio" id="archiver" name="notAction" />
          <label for="archiver">Archiver</label>
        </div>
        <div className="values">
          <input type="radio" id="supprimer" name="notAction" />
          <label for="supprimer">Supprimer</label>
        </div>
      </div>
      <div className="setting-box">Gestion des notifications</div>
      <div className="setting-box">
        <label className="option">Densité de la list des conversations</label>
        <div className="values">
          <input type="radio" id="parDef" name="densite" />
          <label for="parDef">Par défaut</label>
        </div>
        <div className="values">
          <input type="radio" id="normal" name="densite" />
          <label for="normal">Compact</label>
        </div>
<div className="values">
          <input type="radio" id="normal" name="densite" />
          <label for="normal">Normal</label>
        </div>
      </div>
      <div className="setting-box">
        <label className="option">Type de réponse au mails/chats</label>
        <div className="values">
          <input type="radio" id="rep" name="reponse" />
          <label for="rep">Répondre à tous</label>
        </div>
        <div className="values">
          <input type="radio" id="repTous" name="reponse" />
          <label for="repTous">Répondre</label>
        </div>
      </div>
      <div className="setting-checkbox">
        <label className="option">Confirmer les actions:</label>
        <div className="values">
          <input type="radio" id="suppression" name="suppression" value="suppression" />
          <label htmlFor="suppression">Confirmer avant suppression</label>
        </div>
        <div className="values">
          <input type="radio" id="archivage" name="archivage" value ="archivage" />
          <label htmlFor="archivage">Confirmer avant archivage</label>
        </div>
        <div className="values">
<<<<<<< HEAD
          <input type="checkbox" id="envoi" name="envoi" />
          <label for="envoi">Confirmer avant l'envoie</label>s
=======
          <input type="radio" id="envoi" name="envoi" value = "envoi"/>
          <label htmlFor="envoi">Confirmer avant l'envoie</label>
>>>>>>> f0041a8df519c5c28d52007d686264332981636c
        </div>
      </div>
      {/* <script>
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      checkboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    });
  });
</script> */}
    </form>
  );
}
export default SettingsForm;
