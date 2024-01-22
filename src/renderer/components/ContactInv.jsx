import { useMutation } from 'react-query';
import axios from 'axios';
import addUser from '../assets/addUser.png';
import '../styles/ContactInv.css';

function ContactInv({ userId, fullname, email }) {
  const userInvId = userId;
  const user = JSON.parse(sessionStorage.getItem('user'));

    console.log('User Token:', user.token);
  //   console.log('Invited User ID:', userInvId);

  const createConv = async (userInvId) => {
    const response = await axios.post(
      'http://localhost:4001/api/chat',
      { userId: userInvId },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-type': 'application/json',
        },
      },
    );
    return response.data; // retourner les donnée de la création
  };

  // mutate la facon de lutiliser pas comme useQuery
  // tu fait just mutation pour la fonction ni createConv apres le resulta di onSucces
  // plus facile je crois, tt ça pour but de fetch en arriere plan sans reafraichir ngh re rendering ;p
  const { mutate } = useMutation(createConv, {
    // il m affiche les details de la vonc cree, la response obtenu de server
    // on succes aki theqared achu ylaqen ad yedhroun une fois la creatVonc aki th3eda du coup ad afficher les data n response nni
    onSuccess: (data) => {
      console.log('server response --> Conversation created:', data);
    },
    // sinon err
    onError: (error) => {
      console.error('Error creating conversation:', error);
      console.error('Error message:', error.message);
    },
  });

  return (
    <div className="inv-box">
      <div className="user-desc">
        <h3>{fullname}</h3>
        <p>{email}</p>
      </div>
      <div className="add-user-btn">
        <img
          src={addUser}
          alt="ajouter conversation"
          height={25}
          width={25}
          onClick={() => mutate(userInvId)} // faire appel a mutate.creatVonc lors de click avec
          // la recupération de la variable user ID , genre un trigger negh un declencheur mutate aki
          //   onClick={createConv}
        />
      </div>
    </div>
  );
}

export default ContactInv;
