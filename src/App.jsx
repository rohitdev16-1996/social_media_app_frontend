import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<div><Body/></div>}>
          {/* Children Routes */}
          <Route path="/login" element={<div>Login</div>}/>
          <Route path="/test" element={<div>Test</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

