import axios from 'axios'
import addUser from '../assets/addUser.png'
import '../styles/ContactInv.css'

function ContactInv({userId, fullname, email}) {
    const userInvId = userId
    const createConv = async () => {
        try {
            const conv = await axios.post('http://localhost:4001/api/chat', userInvId, {
                headers : {
                    'Authorization' : `Bearer ${user.token}`,
                    'Content-type' : 'application/json'
                },
            })
            console.log('conversation creer')
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="inv-box">
            <div className='user-desc'>
                <h3>{fullname}</h3>
                <p>{email}</p>
            </div>
            <div className='add-user-btn'>
                <img src={addUser} alt="ajouter conversation" height={25} width={25} onClick={createConv} />
            </div>
        </div>
    )
}
export default ContactInv