import AdminPanel from '../components/AdminPanel';

function Admin() {
  return (
    <div style={styles.page}>
      <AdminPanel />
    </div>
  );
}

const styles = {
  page: {
    paddingTop: '80px'
  }
};

export default Admin;