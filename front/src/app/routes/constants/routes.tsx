import { LoginPage } from "../../../pages/LoginPage";
import { RoutePaths } from "./routePaths";
import { IRoute } from "../types";
import { RegistrationPage } from "../../../pages/RegistrationPage";
import { UserPage } from "../../../pages/UserPage";
import { SettingPage } from "../../../pages/SettingPage";
import { PostPage } from "../../../pages/PostPage";
import { MessagePage } from "../../../pages/MessagePage";
import { ContactPage } from "../../../pages/ContactPage";

const publicRoutes: IRoute[] = [
    {path: RoutePaths.LOGIN_PAGE, element: LoginPage},
    {path: RoutePaths.REGISTRATION_PAGE, element: RegistrationPage}
];

const privateRoutes: IRoute[] = [
    {path: RoutePaths.USER_PAGE_WITH_ID, element: UserPage},
    {path: RoutePaths.POST_PAGE_WITH_ID, element: PostPage},
    {path: RoutePaths.SETTING_PAGE, element: SettingPage},
    {path: RoutePaths.CONTACT_PAGE, element: ContactPage},
    {path: RoutePaths.MESSAGE_PAGE, element: MessagePage},
    {path: RoutePaths.MESSAGE_PAGE_WITH_ID, element: MessagePage}
];

export {publicRoutes, privateRoutes}