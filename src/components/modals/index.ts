import { Widget } from "../../lib/apiConnect";

export { UpdateWidgetModal } from "./update-widget-modal";
export { CreateWidgetModal } from "./create-widget-modal";
export { DeleteWidgetModal } from "./delete-widget-modal";

export type CustomModalProps = {
	open: boolean;
	onClose: () => void;
    onSubmit?: (widget?: Widget) => void;
	widget?: Widget;
};