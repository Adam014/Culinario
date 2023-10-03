import Navbar from "./navbar";
import Main from "./main";
import Sidebar from "./sidebar";

const mainPage = () => {
  return (
    <div className="recipes-page-container">
        <Navbar />
        <Sidebar />
        <Main />
    </div>
  )
}

export default mainPage
