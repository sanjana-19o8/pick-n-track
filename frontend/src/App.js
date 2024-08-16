import Home from './components/home/Home';
import Login from './components/home/Login';
import ScannerPage from './components/pages/ScannerPage';
import Admin from './components/pages/Admin';
import Manufacturer from './components/pages/Manufacturer';
import Supplier from './components/pages/Supplier';
import Retailer from './components/pages/Retailer';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AddAccount from './components/pages/AddAccount';
import ManageAccount from './components/pages/ManageAccount';
import AddProduct from './components/pages/AddProduct';
import Profile from './components/pages/Profile';
import UpdateProduct from './components/pages/UpdateProduct';
import Product from './components/pages/Product';
import AuthenticProduct from './components/pages/AuthenticProduct';
import FakeProduct from './components/pages/FakeProduct';
import UpdateProductDetails from './components/pages/UpdateProductDetails';
import OrderPicking from './components/pages/OrderPicking';
import Picking from './components/pages/Picking';
import Truck from './components/pages/truck';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* Public routes */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/scanner' element={<ScannerPage />} />
        <Route exact path='/product' element={<Product />} />
        <Route exact path='/authentic-product' element={<AuthenticProduct />} />
        <Route exact path='/fake-product' element={<FakeProduct />} />
        <Route exact path='/order-picking' element={<OrderPicking />} />
        <Route exact path='/picking' element={<Picking />} />
        <Route exact path='/truck' element={<Truck />} />

        {/* Private routes */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/add-account' element={<AddAccount />} />
          <Route exact path='/manage-account' element={<ManageAccount />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["manufacturer", "supplier", "retailer"]} />}>
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/update-product' element={<UpdateProduct />} />
          <Route exact path='/update-product-details' element={<UpdateProductDetails />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["supplier", "retailer"]} />}>
          <Route exact path='/update-product' element={<UpdateProduct />} />
          <Route exact path='/update-product-details' element={<UpdateProductDetails />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["manufacturer"]} />}>
          <Route exact path='/manufacturer' element={<Manufacturer />} />
          <Route exact path='/add-product' element={<AddProduct />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["supplier"]} />}>
          <Route exact path='/supplier' element={<Supplier />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["retailer"]} />}>
          <Route exact path='/retailer' element={<Retailer />} />
        </Route>

        {/* Catch-all route (Optional) */}
        {/* <Route path='*' element={<Missing />} /> */}

      </Route>
    </Routes>
  );
}

export default App;