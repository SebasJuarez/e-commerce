import Header from "../Header";
import './Home.scss'
import Products from '../Producto';

const Home = ({ user }) => {
    return(
    <div className='Homebody'>
        <Header user={user} />
            <Products />
    </div>
    );
};
export default Home