import SideBarButton from "./SideBarButton";
import SearchChat from "./SearchChat";

function SideBarContact() {
    const [users, setUsers] = useState([]);
    const [convs, setConvs] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const loadUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4001/api/user/search',
        );
        return response.data;
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
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    const usersPromise = loadUsers();
    usersPromise.then((usersData) => {
      setUsers(usersData);
    });
    const convsPromise = loadConvs();
    convsPromise.then((convsData) => {
      setConvs(convsData);
    });
    return (
        <SearchChat />
        
        <SideBarButton text="Ajouter Conversation" />
    )
}