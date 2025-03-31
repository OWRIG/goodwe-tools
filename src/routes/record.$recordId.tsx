import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/record/$recordId")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/record/$recordId"!</div>;
}
