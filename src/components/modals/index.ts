import { Widget } from "../../lib/apiConnect";

export { UpdateWidgetModal } from "./update-widget-modal";
export { CreateWidgetModal } from "./create-widget-modal";
export { DeleteWidgetModal } from "./delete-widget-modal";

export type CustomModalProps = {
	open: boolean;
	onClose: () => void;
	widget?: Widget;
};

export const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: 400,
	minWidth: 200,
	bgcolor: "background.paper",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};