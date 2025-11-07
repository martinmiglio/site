import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function StickyBackButton() {
	const [isSticky, setIsSticky] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting);
			},
			{ threshold: [1] },
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			{/* Sentinel element for detecting sticky state */}
			<div
				ref={sentinelRef}
				className="pointer-events-none absolute top-0 h-px"
			/>

			{/* Sticky Back Button */}
			<div className="sticky top-0 z-10 mb-4 flex w-full justify-end">
				<Button
					asChild
					variant="ghost"
					size="lg"
					className={`
            mr-3
            bg-background/93 hover:bg-background/100
            transition-all duration-300 ease-out
            border-none ring-transparent
            hover:scale-[.97]
            cursor-pointer
            ${isSticky ? "-translate-y-1 scale-[1.02] shadow-lg" : ""}
          `}
				>
					<SheetClose data-umami-event="Back to Home Clicked">
						<ChevronLeft className="h-4 w-4" />
						<span className="font-semibold">Back to Home</span>
					</SheetClose>
				</Button>
			</div>
		</>
	);
}
