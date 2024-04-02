import { DateTime } from "luxon";
import { User } from "../../reducers/user.reducer";
import { v4 as uuidv4 } from "uuid";

export const handlePaste = (
	event: React.ClipboardEvent,
	socket: any,
	user: User
) => {
	const items = event.clipboardData.items;
	for (let i = 0; i < items.length; i++) {
		if (items[i].type.indexOf("image") !== -1) {
			const blob = items[i].getAsFile();
			const reader = new FileReader();
			reader.onload = function (event) {
				// event.target.result contains the Base64 string of the image
				// Emit the image to the server
				socket?.emit("message", {
					id: uuidv4(),
					user,
					timestamp: DateTime.now().toUTC().toISO(),
					image: event.target?.result,
				});
			};
			if (blob) {
				reader.readAsDataURL(blob);
			}
		}
	}
};

export const extractTimeFrom = (url: string) => {
	try {
		const urlObj = new URL(url);
		const params = new URLSearchParams(urlObj.search);
		return params.get("t");
	} catch (e) {
		console.error("Invalid URL");
		return null;
	}
};
