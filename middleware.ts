import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:["/api/task",
        "/api/:task*",
        "/api/task/:authorId*",
        "/api/:authorId*"
    ],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};