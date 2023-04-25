import { LoginPage } from "../../../pages/LoginPage";
import { TestPage } from "../../../pages/TestPage";
import { RoutePaths } from "./routePaths";
import { IRoute } from "../types";

const publicRoutes: IRoute[] = [
    {path: RoutePaths.LOGIN_PAGE, element: LoginPage},
];

const privateRoutes: IRoute[] = [
    {path: RoutePaths.TEST_PAGE, element: TestPage}
];

export {publicRoutes, privateRoutes}