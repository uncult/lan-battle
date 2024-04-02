import { useState, useRef, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { adjustForWindowEdges } from "./Tooltip.utils";
import { TooltipContainer } from "./Tooltip.styled";

interface TooltipProps {
	children: ReactNode;
	text: string;
	position?:
		| "bottom-start"
		| "bottom"
		| "bottom-end"
		| "top-start"
		| "top"
		| "top-end";
}

const Tooltip = ({ children, text, position = "bottom" }: TooltipProps) => {
	const [show, setShow] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
	const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
	const childRef = useRef(null);
	const tooltipRef = useRef(null);

	useEffect(() => {
		if (childRef.current) {
			const rect = (childRef.current as HTMLElement).getBoundingClientRect();
			let top, left;

			switch (position) {
				case "bottom-start":
				case "top-start":
					left = rect.left;
					break;
				case "bottom-end":
				case "top-end":
					left = rect.right;
					break;
				default:
					left = rect.left + rect.width / 2;
					break;
			}

			top = position.startsWith("top") ? rect.top : rect.bottom;

			setTooltipPosition({ top, left });
		}
	}, [childRef, position, show]);

	useEffect(() => {
		if (show && tooltipRef.current) {
			const tooltipRect = (
				tooltipRef.current as HTMLElement
			).getBoundingClientRect();
			setTooltipSize({ width: tooltipRect.width, height: tooltipRect.height });
		}
	}, [show]);

	useEffect(() => {
		if (show && childRef.current && tooltipRef.current) {
			const rect = (childRef.current as HTMLElement).getBoundingClientRect();
			let top, left;

			switch (position) {
				case "bottom-start":
				case "top-start":
					left = rect.left;
					break;
				case "bottom-end":
				case "top-end":
					left = rect.right - tooltipSize.width;
					break;
				default:
					left = rect.left + rect.width / 2 - tooltipSize.width / 2;
					break;
			}

			top = position.startsWith("top")
				? rect.top - tooltipSize.height
				: rect.bottom;

			const adjustedPosition = adjustForWindowEdges(
				top,
				left,
				tooltipSize.width,
				tooltipSize.height
			);

			setTooltipPosition(adjustedPosition);
		}
	}, [show, position, tooltipSize]);

	return (
		<div
			ref={childRef}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
			style={{ position: "relative", display: "inline-block" }}
		>
			{children}
			{show &&
				ReactDOM.createPortal(
					<TooltipContainer ref={tooltipRef} tooltipPosition={tooltipPosition}>
						{text}
					</TooltipContainer>,
					document.body
				)}
		</div>
	);
};

export default Tooltip;
