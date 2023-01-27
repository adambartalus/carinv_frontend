export const Tile = (props) => {
  
  return (
    <props.component
      to={props.to}
      className='tile'
      style={{
        backgroundColor: props.backgroundColor || '#fff',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        height: '20rem',
        cursor: 'pointer',
        color: props.color || 'black',
        textDecoration: 'none',
        display: 'flex',
        borderRadius: '0.5rem',
      }}
    >
      {props.children}
    </props.component>
  );
}