export const adjustForWindowEdges = (
	top: number,
	left: number,
	tooltipWidth: number,
	tooltipHeight: number
) => {
	// Check if tooltip is overflowing the right edge of the window
	if (left + tooltipWidth > window.innerWidth) {
		left = window.innerWidth - tooltipWidth - 8; // 8px margin
	}

	// Check if tooltip is overflowing the left edge of the window
	if (left < 0) {
		left = 8; // 8px margin
	}

	// Check if tooltip is overflowing the bottom edge of the window
	if (top + tooltipHeight > window.innerHeight) {
		top = window.innerHeight - tooltipHeight - 8; // 8px margin
	}

	// Check if tooltip is overflowing the top edge of the window
	if (top < 0) {
		top = 8; // 8px margin
	}

	return { top, left };
};
