import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AddTask from "../components/others/AddTask";
import CompletedTask from "../components/others/CompletedTask";
import Mytask from "../components/others/Mytask";
import Main from "../layouts/Main/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import PrivateRoute from "./Private/PrivateRoute";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path='/' element={<Main />}>
            <Route index element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route path="/addtask" element={<AddTask />} />

            <Route path="mytask" element={<PrivateRoute><Mytask /></PrivateRoute>} />
            <Route path="completedtasks" element={<PrivateRoute><CompletedTask /></PrivateRoute>} />



            <Route path="*" element={<NotFound />} />
        </Route>
    </Route>
))