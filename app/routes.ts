import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  route("login", "modules/auth/routes/login.tsx"),
  layout("shared/ui/dashboard-layout.tsx", [
    index("routes/home.tsx"),
    route("customers", "modules/customers/routes/customers.tsx"),
    route("transactions", "modules/transactions/routes/transactions.tsx"),
  ]),
] satisfies RouteConfig;
