import { render, screen } from "@testing-library/react";

import { Widget } from "../../lib/apiConnect";
import WidgetDisplay from "./index";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => (
	<Provider store={store}>{children}</Provider>
);

describe("WidgetDisplay", () => {
	it("displays all widget information", async () => {
		const widget: Widget = {
			description: "German movie star",
			name: "Widget von Hammersmark",
			price: 19.45,
		};

		render(<WidgetDisplay widget={widget} />, { wrapper: Wrapper });

		expect(
			screen.getByText(widget.description, { exact: false }),
		).toBeInTheDocument();
		expect(screen.getByText(widget.name, { exact: false })).toBeInTheDocument();
	});

	it("displays update modal", async () => {
		const widget: Widget = {
			description: "German movie star",
			name: "Widget von Hammersmark",
			price: 19.45,
		};

		render(<WidgetDisplay widget={widget} withButtons />, { wrapper: Wrapper });

		const editButton = await screen.findByTestId("edit-widget-button");

		editButton.click();
		expect(
			await screen.findByText("Updating Widget von Hammersmark"),
		).toBeInTheDocument();
	});

	it("display delete modal", async () => {
		const widget: Widget = {
			description: "German movie star",
			name: "Widget von Hammersmark",
			price: 19.45,
		};

		render(<WidgetDisplay widget={widget} withButtons />, { wrapper: Wrapper });

		const deleteButton = await screen.findByTestId("delete-widget-button");

		deleteButton.click();
		expect(
			await screen.findByText(/Are you sure you want to delete this element/i)).toBeInTheDocument();
	});
});
