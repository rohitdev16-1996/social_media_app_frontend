import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<div><Body /></div>}>
            {/* Children Routes */}
            <Route path="/" element={<div><Feed/></div>}></Route>
            <Route path="/login" element={<div><Login /></div>} />
            <Route path="/test" element={<div>Test</div>} />
            <Route path="/profile" element={<div><Profile/></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

