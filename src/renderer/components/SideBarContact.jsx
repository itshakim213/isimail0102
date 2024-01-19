import { useEffect, useState } from "react";
import axios from "axios";
import SideBarButton from "./SideBarButton";
import SearchChat from "./SearchChat";
import ContactInv from "./ContactInv";
import noConvers from '../assets/noConvers.png'
import '../styles/SideBarContact.css'
import Empty from "./Empty";

function SideBarContact() {
    const [users, setUsers] = useState([]);
    const [convs, setConvs] = useState([]); 
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    useEffect(() => {
      const loadUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4001/api/user/search', {
              headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          setUsers(response.data)
        } catch (error) {
          console.log(error);
        }
      };
      const loadConvs = async () => {
        try {
          const response = await axios.get('http://localhost:4001/api/chat', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          });
          setConvs(response.data)
        } catch (error) {
          console.log(error);
        }
      };

      loadUsers()
      loadConvs()
      
    }, [user.token])
    console.log(convs)
    return (
      <div className="side-bar-contact">
        <SearchChat />
        { (users.length === 0 ) ? (
          <Empty
          image={noConvers}
          message="you have no contact"
          width={85}
          height={85}
          />
        ) : (
        <nav className="contact-nav">
        {
          users.map((user) => (
            <ContactInv key={user._id} userId={user._id} fullname={`${user.firstname} ${user.lastname}`} email={`${user.email}`} />
          ))
        }
        </nav>
        ) }
        <SideBarButton text="Ajouter Conversation" />
      </div>
    )
}
export default SideBarContact