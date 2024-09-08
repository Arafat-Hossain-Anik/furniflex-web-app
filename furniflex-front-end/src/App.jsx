import { RouterProvider } from "react-router-dom";
import router from './AppRouter'
import { ToastContainer } from "react-toastify";

const App = () => {
  return <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>;
};

export default App;
