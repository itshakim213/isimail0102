import addUser from '../assets/addUser.png'

function ContactInv({fullname, email}) {
    <div className="inv-box">
        <h3>{fullname}</h3>
        <p>{email}</p>
        <div>
            <img src={addUser} alt="ajouter conversation" height={20} width={20} />
        </div>
    </div>
}
export default ContactInv