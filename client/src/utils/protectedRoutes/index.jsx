
const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('Token')) {
    return children;
  }
  return <div>not authorized</div>;
};

export default ProtectedRoutes;
