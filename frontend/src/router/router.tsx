import App from "@/App"
import Home from "@/pages/Home"
import LandingPage from "@/pages/Landing"
import Profile from "@/pages/Profile"
import UserGallery from "@/pages/userGallery"
import AdminPage from "@/pages/Admin"
import SignInPage from "@/pages/Sign"

import AdminRoute from "./admin.route"
import IsAuthRoute from "./IsAuth.route"
import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom"
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App></App>} path="/">
            <Route path="" element={<LandingPage></LandingPage>}  index />
            <Route path="/register" element={<SignInPage></SignInPage>} />
            <Route path="/home" element={<Home></Home>} />
            <Route element={<IsAuthRoute></IsAuthRoute>}>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/user/:userId" element={<UserGallery></UserGallery>}></Route>
            </Route>
            <Route element={<AdminRoute></AdminRoute>}>
                <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
            </Route>
        </Route>
    )
)

export default router