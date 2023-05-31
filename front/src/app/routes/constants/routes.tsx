import { LoginPage } from "../../../pages/LoginPage";
import { TestPage } from "../../../pages/TestPage";
import { RoutePaths } from "./routePaths";
import { IRoute } from "../types";
import { RegistrationPage } from "../../../pages/RegistrationPage";
import { UserPage } from "../../../pages/UserPage";

const publicRoutes: IRoute[] = [
    {path: RoutePaths.LOGIN_PAGE, element: LoginPage},
    {path: RoutePaths.REGISTRATION_PAGE, element: RegistrationPage}
];

const privateRoutes: IRoute[] = [
    {path: RoutePaths.TEST_PAGE, element: TestPage},
    {path: RoutePaths.USER_PAGE_WITH_ID, element: UserPage}
];

export {publicRoutes, privateRoutes}