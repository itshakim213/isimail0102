function SideBarButton({ text, link }) {
  return (
    <button
      style={{
        padding: '10px 15px',
        margin: '50px 0 0 20px',
        border: 'none',
        borderRadius: '25px',
        color: 'black',
        backgroundColor: '#557CC8',
        fontWeight: 'bold',
      }}
    >
      {text}
      {link}
    </button>
  );
}
export default SideBarButton;
